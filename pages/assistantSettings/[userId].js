// pages/assistantSettings/[userId].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getFirebaseFirestore } from '../../app/src/firebase';
import RootLayout from '../../components/layout';
import NavigationButtons from '../../components/NavigationButtons';
import { Button, Textarea } from '@nextui-org/react';
import { db as dbServer } from '../../firebaseAdmin'; // Server-side db
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext'; // New import
import { toast } from 'react-hot-toast';

// This constant defines the maximum character limit for the textareas
const MAX_CHAR_LIMIT = 90;

const AssistantSettingsPage = ({ userData }) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  const resetGame = () => {
    router.push('/');
  };

  const [customInstructions, setCustomInstructions] = useState({
    codeGen: userData?.customInstructions?.codeGen || '',
    chatbot: userData?.customInstructions?.chatbot || '',
    endGame: userData?.customInstructions?.endGame || '',
    feedback: userData?.customInstructions?.feedback || '',
  });

  useEffect(() => {
    setCustomInstructions(prevInstructions => ({
      ...prevInstructions,
      feedback: userData?.customInstructions?.feedback || '',
    }));
  }, [userData?.customInstructions?.feedback]);

  useEffect(() => {
    if (customInstructions.feedback) {
      toast(customInstructions.feedback, {
        icon: <span style={{ fontSize: '2em' }}>🦺</span>,
      });

      // Clear the feedback after the toast duration
      const toastDuration = 4000; // Default duration for 'blank' toast type
      setTimeout(async () => {
        setCustomInstructions(prevInstructions => ({
          ...prevInstructions,
          feedback: '',
        }));

        // Clear the feedback field in Firestore
        if (user) {
          const dbClient = getFirebaseFirestore();
          const userDocRef = doc(dbClient, 'users', userData.id);
          await updateDoc(userDocRef, { 'customInstructions.feedback': '' });
        }
      }, toastDuration);
    }
  }, [customInstructions.feedback]);

  const handleInputChange = (aspect, event) => {
    const value = event.target.value;
    setCustomInstructions(prevInstructions => ({
      ...prevInstructions,
      [aspect]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const dbClient = getFirebaseFirestore();

      if (user) {
        const userDocRef = doc(dbClient, 'users', userData.id);
        await updateDoc(userDocRef, { customInstructions });
        toast.success('Settings saved successfully!');
      }
    } catch (error) {
      console.error('Error updating document:', error);
      toast.error('Failed to save settings.');
    }
  };

  return (
    <RootLayout>
      <div className="min-h-screen bg-custom-gradient py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <NavigationButtons resetGame={resetGame} question={{}} />
            <h1 className="text-2xl font-bold text-gray-900 mt-6 sm:mt-0">Assistant Settings</h1>
            <p className="mt-2 text-gray-600">Customize the instructions for each aspect of the assistant</p>
            <form onSubmit={handleFormSubmit} style={{ maxWidth: '500px', margin: '0 auto', marginTop: '30px' }}>
              <div className="input-group" style={{ marginBottom: '15px' }}>
                <Textarea
                  id="codeGen"
                  label="Gameplay:"
                  variant="bordered"
                  placeholder="Example: I like short scripts"
                  value={customInstructions.codeGen}
                  onValueChange={(value) => handleInputChange('codeGen', { target: { value } })}
                  disableAnimation
                  disableAutosize
                  fullWidth
                  classNames={{
                    base: "w-full",
                    input: "resize-y min-h-[40px]",
                  }}
                  maxLength={MAX_CHAR_LIMIT}
                  helperText={customInstructions.codeGen.length > MAX_CHAR_LIMIT ? "Maximum character limit of " + MAX_CHAR_LIMIT + " exceeded." : ""}
                  helperColor={customInstructions.codeGen.length > MAX_CHAR_LIMIT ? "error" : "default"}
                />
              </div>
              <div className="input-group" style={{ marginBottom: '15px' }}>
                <Textarea
                  id="chatbot"
                  label="Assistant Behavior:"
                  variant="bordered"
                  placeholder="Example: I like direct responses"
                  value={customInstructions.chatbot}
                  onValueChange={(value) => handleInputChange('chatbot', { target: { value } })}
                  disableAnimation
                  disableAutosize
                  fullWidth
                  classNames={{
                    base: "w-full",
                    input: "resize-y min-h-[40px]",
                  }}
                  maxLength={MAX_CHAR_LIMIT}
                  helperText={customInstructions.chatbot.length > MAX_CHAR_LIMIT ? "Maximum character limit of " + MAX_CHAR_LIMIT + " exceeded." : ""}
                  helperColor={customInstructions.chatbot.length > MAX_CHAR_LIMIT ? "error" : "default"}
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
