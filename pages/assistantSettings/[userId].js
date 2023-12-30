// pages/assistantSettings.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import dbClient from '../../app/src/utils/firebaseAdmin'; // Client-side db
import RootLayout from '../../components/layout';
import { Button, Input } from '@nextui-org/react';
import { db as dbServer } from '../../firebaseAdmin'; // Server-side db

const AssistantSettingsPage = ({ userData }) => {
  const router = useRouter();
  const [customInstructions, setCustomInstructions] = useState(userData?.customInstructions || '');

  const handleInputChange = (event) => {
    setCustomInstructions(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Update the customInstructions field in Firestore
    const userDocRef = dbClient.collection('users').doc(userData.id);
    await userDocRef.update({ customInstructions });
    // Redirect to the user stats page
    router.push(`/user/${userData.id}`);
  };

  return (
    <RootLayout>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <h1 className="text-2xl font-bold text-gray-900">Assistant Settings</h1>
            <form onSubmit={handleFormSubmit}>
              <Input
                value={customInstructions}
                onChange={handleInputChange}
                placeholder="Enter your custom instructions"
              />
              <Button color="primary" auto style={{ backgroundColor: '#007BFF', color: 'white' }} type="submit">
                Save
              </Button>
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