import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { IoOptions } from "react-icons/io5";
import { getFirebaseAuth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useHotkeys } from 'react-hotkeys-hook';

const OptionsMenu = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const handleLogout = async () => {
    console.log('handleLogout called');
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
    </>
  );
};

export default OptionsMenu;
