import React, { useState } from "react";
import { useRouter } from 'next/router';
import { getAuth, isSignInWithEmailLink } from 'firebase/auth';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { IoOptions } from "react-icons/io5";
import { getFirebaseAuth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useHotkeys } from 'react-hotkeys-hook';
import Auth from './Auth';

const OptionsMenu = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();
  const auth = getFirebaseAuth();

  const handleLogout = async () => {
    onOpen();
  };

  const confirmLogout = async () => {
    const auth = getFirebaseAuth();
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleHistory = () => {
    console.log('handleHistory called');
    const user = auth.currentUser;
    console.log('Current user:', user);
    if (user) {
      if (!user.isAnonymous) {
        // User is signed in with email and password
        console.log('Navigating to history page');
        router.push(`/history/${user.uid}`);
      } else {
        // User is signed in anonymously
        // Prompt them to create an account
        console.log('Showing Auth modal');
        setShowAuthModal(true);
      }
    } else {
      // User is not signed in
      // Prompt them to sign in or create an account
      console.log('Showing Auth modal');
      setShowAuthModal(true);
    }
  };

  const handleUserAuth = (user) => {
    // Update user state here
    // Close the Auth modal
    setShowAuthModal(false);
  };

  useHotkeys('shift+l', handleLogout);

  // add other hotkeys here
  // useHotkeys('command+s', handleSkip);
  // useHotkeys('command+h', handleHistory);

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="flat"
            auto
            className="custom-button"
            style={{ background: 'transparent' }}
          >
            <IoOptions size={24} color="#22D3EE" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="shadow" aria-label="Options menu">
          <DropdownItem key="logout" shortcut="⇧L" onClick={handleLogout}>Logout</DropdownItem>
          <DropdownItem key="history" onClick={handleHistory}>Game History</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirm Logout</ModalHeader>
              <ModalBody>
                <p> 
                  Are you sure you want to log out?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={confirmLogout}>
                  Logout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {showAuthModal && (
        <Modal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)}>
          <ModalContent>
            <Auth onUserAuth={handleUserAuth} />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default OptionsMenu;
