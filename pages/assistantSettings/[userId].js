// pages/assistantSettings.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import dbClient from '../../app/src/utils/firebaseAdmin'; // Client-side db
import RootLayout from '../../components/layout';
import { Button, Input } from '@nextui-org/react';
import { db as dbServer } from '../../firebaseAdmin'; // Server-side db

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
    const userDocRef = dbClient.collection('users').doc(userData.id);
    await userDocRef.update({ customInstructions });
    router.push(`/user/${userData.id}`);
  };

  return (
    <RootLayout>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <h1 className="text-2xl font-bold text-gray-900">Assistant Settings</h1>
            <form onSubmit={handleFormSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
              <div className="input-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="codeGen">Code Generation Instructions:</label>
                <Input
                  id="codeGen"
                  value={customInstructions.codeGen}
                  onChange={(e) => handleInputChange('codeGen', e)}
                  placeholder="Enter your code generation instructions"
                  fullWidth
                />
              </div>
              <div className="input-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="chatbot">Chatbot Instructions:</label>
                <Input
                  id="chatbot"
                  value={customInstructions.chatbot}
                  onChange={(e) => handleInputChange('chatbot', e)}
                  placeholder="Enter your chatbot instructions"
                  fullWidth
                />
              </div>
              <div className="input-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="endGame">End Game Message Instructions:</label>
                <Input
                  id="endGame"
                  value={customInstructions.endGame}
                  onChange={(e) => handleInputChange('endGame', e)}
                  placeholder="Enter your end game message instructions"
                  fullWidth
                />
              </div>
              <div style={{ textAlign: 'right', marginTop: '20px' }}>
                <Button color="primary" auto type="submit">
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