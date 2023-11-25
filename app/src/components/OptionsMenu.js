// app/src/components/OptionsMenu.js

import React, { useState } from "react";
import { useRouter } from 'next/router';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { IoOptions } from "react-icons/io5";
import { getFirebaseAuth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useHotkeys } from 'react-hotkeys-hook';
import Auth from './Auth';

const OptionsMenu = ({ onSkipSubmit, isCodeSnippetDisplayed }) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();
  const auth = getFirebaseAuth();

  const handleLogout = async () => {
    onOpen();
  };

  const confirmLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleHistory = () => {
    const user = auth.currentUser;
    if (user) {
      if (!user.isAnonymous) {
        router.push(`/history/${user.uid}`);
      } else {
        setShowAuthModal(true);
      }
    } else {
      setShowAuthModal(true);
    }
  };

  const handleLeaderboard = () => {
    router.push('/leaderboard');
  };

  const handleUserAuth = (user) => {
    setShowAuthModal(false);
  };

  useHotkeys('shift+l', handleLogout);
  useHotkeys('shift+h', handleHistory);
  useHotkeys('shift+b', handleLeaderboard);
  useHotkeys('shift+s', () => {
    console.log('Skip hotkey pressed');
    onSkipSubmit();
  });

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
          <DropdownItem key="history" shortcut="⇧H" onClick={handleHistory}>Game History</DropdownItem>
          <DropdownItem key="leaderboard" shortcut="⇧B" onClick={handleLeaderboard}>Leaderboard</DropdownItem>
          {isCodeSnippetDisplayed && <DropdownItem key="skip" shortcut="⇧S" onClick={() => {
            console.log('Skip button clicked');
            onSkipSubmit();
          }}>Skip</DropdownItem>}
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
