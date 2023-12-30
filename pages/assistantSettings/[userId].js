// pages/assistantSettings/[userId].js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getFirebaseFirestore, getFirebaseAuth } from '../../app/src/firebase'; // Updated import
import RootLayout from '../../components/layout';
import { Button, Textarea } from '@nextui-org/react';
import { db as dbServer } from '../../firebaseAdmin'; // Server-side db
import { doc, updateDoc } from 'firebase/firestore';

const AssistantSettingsPage = ({ userData }) => {
  const router = useRouter();
  const [customInstructions, setCustomInstructions] = useState({
    codeGen: userData?.customInstructions?.codeGen || '',
    chatbot: userData?.customInstructions?.chatbot || '',
    endGame: userData?.customInstructions?.endGame || '',
  });

  const handleInputChange = (aspect, event) => {
    const value = event.target.value;
    setCustomInstructions(prevInstructions => ({
      ...prevInstructions,
      [aspect]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submit initiated'); // Log when form submission starts
    try {
      console.log('Attempting to update document in Firestore'); // Before Firestore operation
      const dbClient = getFirebaseFirestore(); // Updated Firestore instance
      const authClient = getFirebaseAuth(); // Get the Firebase Authentication instance

      authClient.onAuthStateChanged(async (user) => {
        if (user) {
          console.log('User ID:', userData.id); // Log the user ID
          console.log('Authenticated user ID:', user.uid); // Log the authenticated user's ID
          const userDocRef = doc(dbClient, 'users', userData.id);
          await updateDoc(userDocRef, { customInstructions });
          console.log('Document successfully updated'); // After successful Firestore operation
          console.log('Attempting to redirect to user page'); // Before redirecting
          router.push(`/user/${userData.id}`);
          console.log('Redirecting to user page'); // After initiating the redirect
        } else {
          console.log('No authenticated user'); // Log a message if there is no authenticated user
        }
      });
    } catch (error) {
      console.error('Error updating document:', error); // Log any errors that occur
      // Log additional error details if available
      if (error.code) console.error('Error code:', error.code);
      if (error.message) console.error('Error message:', error.message);
      if (error.stack) console.error('Error stack:', error.stack);
    }
  };

  return (
    <RootLayout>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <h1 className="text-2xl font-bold text-gray-900">Assistant Settings</h1>
            <p className="mt-2 text-gray-600">Customize the instructions for each aspect of the assistant</p>
            <form onSubmit={handleFormSubmit} style={{ maxWidth: '500px', margin: '0 auto', marginTop: '30px' }}>
              <div className="input-group" style={{ marginBottom: '15px' }}>
                <Textarea
                  id="codeGen"
                  label="Code Generation Instructions:"
                  variant="bordered"
                  placeholder="Enter your code generation instructions"
                  value={customInstructions.codeGen}
                  onValueChange={(value) => handleInputChange('codeGen', { target: { value } })}
                  disableAnimation
                  disableAutosize
                  fullWidth
                  classNames={{
                    base: "w-full",
                    input: "resize-y min-h-[40px]",
                  }}
                  maxLength={280}
                  helperText={customInstructions.codeGen.length > 280 ? "Maximum character limit of 280 exceeded." : ""}
                  helperColor={customInstructions.codeGen.length > 280 ? "error" : "default"}
                />
              </div>
              <div className="input-group" style={{ marginBottom: '15px' }}>
                <Textarea
                  id="chatbot"
                  label="Chatbot Instructions:"
                  variant="bordered"
                  placeholder="Enter your chatbot instructions"
                  value={customInstructions.chatbot}
                  onValueChange={(value) => handleInputChange('chatbot', { target: { value } })}
                  disableAnimation
                  disableAutosize
                  fullWidth
                  classNames={{
                    base: "w-full",
                    input: "resize-y min-h-[40px]",
                  }}
                  maxLength={280}
                  helperText={customInstructions.chatbot.length > 280 ? "Maximum character limit of 280 exceeded." : ""}
                  helperColor={customInstructions.chatbot.length > 280 ? "error" : "default"}
                />
              </div>
              <div className="input-group" style={{ marginBottom: '20px' }}>
                <Textarea
                  id="endGame"
                  label="End Game Message Instructions:"
                  variant="bordered"
                  placeholder="Enter your end game message instructions"
                  value={customInstructions.endGame}
                  onValueChange={(value) => handleInputChange('endGame', { target: { value } })}
                  disableAnimation
                  disableAutosize
                  fullWidth
                  classNames={{
                    base: "w-full",
                    input: "resize-y min-h-[40px]",
                  }}
                  maxLength={280}
                  helperText={customInstructions.endGame.length > 280 ? "Maximum character limit of 280 exceeded." : ""}
                  helperColor={customInstructions.endGame.length > 280 ? "error" : "default"}
                />
              </div>
              <div style={{ textAlign: 'right', marginTop: '20px' }}>
                <Button color="primary" auto ghost variant="ghost" type="submit">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    const { userId } = params;

    let userData = null;

    if (userId) {
      const userDocRef = dbServer.collection('users').doc(userId);
      const userDocSnap = await userDocRef.get();

      if (userDocSnap.exists) {
        userData = {
          id: userDocSnap.id,
          ...userDocSnap.data(),
        };
      }
    }

    return {
      props: {
        userData: userData ? JSON.parse(JSON.stringify(userData)) : null,
      },
    };
  } catch (error) {
    console.error('Error fetching data in getServerSideProps:', error);
    return {
      notFound: true,
    };
  }
};

export default AssistantSettingsPage;