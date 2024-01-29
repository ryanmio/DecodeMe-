// components/OptionsMenu.js
import React, { useState } from "react";
import { useRouter } from 'next/router';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { FiMenu } from "react-icons/fi";
import { signOut } from 'firebase/auth';
import { useHotkeys } from 'react-hotkeys-hook';
import Auth from '../components/Auth';
import { useAuth } from '../contexts/AuthContext';
import { useSoundContext } from '../contexts/SoundContext';

const OptionsMenu = ({ onSkipSubmit, gameMode, isGameOver, disabled, promptEndGame }) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const router = useRouter();
  const { user, loading, auth } = useAuth();
  const { isMuted, setIsMuted } = useSoundContext();

  // Toggle mute function
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleLogout = () => {
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
    if (gameMode && !isGameOver) {
      promptEndGame(`/history/${user.uid}`);
    } else if (user) {
      router.push(`/history/${user.uid}`);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleLeaderboard = () => {
    if (gameMode && !isGameOver) {
      promptEndGame('/leaderboard');
    } else {
      router.push('/leaderboard');
    }
  };

  const handleScorecard = () => {
    if (gameMode && !isGameOver) {
      promptEndGame(`/user/${user.uid}`);
    } else if (user) {
      router.push(`/user/${user.uid}`);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAssistantSettings = () => {
    if (gameMode && !isGameOver) {
      promptEndGame(`/assistantSettings/${user.uid}`);
    } else if (user) {
      router.push(`/assistantSettings/${user.uid}`);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleUserAuth = (user) => {
    setShowAuthModal(false);
  };

  useHotkeys('shift+l', handleLogout);
  useHotkeys('shift+h', handleHistory);
  useHotkeys('shift+b', handleLeaderboard);
  useHotkeys('shift+c', handleScorecard);
  useHotkeys('shift+a', handleAssistantSettings);
  useHotkeys('shift+m', toggleMute);
  useHotkeys('shift+s', () => {
    onSkipSubmit();
  });

  const isLoggedIn = user !== null;

  if (loading) {
    // Render a disabled or loading state for the OptionsMenu
    return (
      <Button
        variant="flat"
        auto
        disabled
        className="custom-button"
        style={{ background: 'transparent' }}
      >
        <FiMenu size={24} color="#22D3EE" />
      </Button>
    );
  }

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="flat"
            auto
            className="custom-button"
            style={{ background: 'transparent' }}
            aria-label="Toggle ptions menu"
          >
            <FiMenu size={24} color="#22D3EE" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="shadow" aria-label="Options menu">
          {isLoggedIn && <DropdownItem key="scorecard" shortcut="⇧C" onClick={handleScorecard}>Scorecard</DropdownItem>}
          <DropdownItem key="leaderboard" shortcut="⇧B" onClick={handleLeaderboard}>Leaderboard</DropdownItem>
          {isLoggedIn && <DropdownItem key="history" shortcut="⇧H" onClick={handleHistory}>Game History</DropdownItem>}
          {isLoggedIn && <DropdownItem key="assistantSettings" shortcut="⇧A" onClick={handleAssistantSettings}>Assistant Settings</DropdownItem>}
          {gameMode && !isGameOver && <DropdownItem key="skip" shortcut="⇧S" onClick={onSkipSubmit}>Skip</DropdownItem>}
          <DropdownItem key="mute" onClick={toggleMute} shortcut="⇧M">
            {isMuted ? 'Unmute' : 'Mute'}
          </DropdownItem>
          {isLoggedIn && <DropdownItem key="logout" shortcut="⇧L" onClick={handleLogout}>Logout</DropdownItem>}
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
          <Auth onUserAuth={handleUserAuth} onLeaderboardNameSet={handleLeaderboardNameSet} setIsAuthLoading={setIsAuthLoading} />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default OptionsMenu;
