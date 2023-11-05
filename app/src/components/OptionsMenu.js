import React, { useEffect } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { IoOptions } from "react-icons/io5";
import { getFirebaseAuth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useHotkeys } from 'react-hotkeys-hook';

const OptionsMenu = () => {
  const handleLogout = async () => {
    console.log('handleLogout called');
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      const auth = getFirebaseAuth();
      try {
        await signOut(auth);
        window.location.href = '/';
      } catch (error) {
        console.error('Failed to log out:', error);
      }
    }
  };

  useHotkeys('shift+l', handleLogout);

  // add other hotkeys here
  // useHotkeys('command+s', handleSkip);
  // useHotkeys('command+h', handleHistory);
  // useHotkeys('command+t', handleTextSize);

  return (
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
        {/* <DropdownItem key="hint" shortcut="⌘H">Hint</DropdownItem> */}
        <DropdownItem key="logout" shortcut="⇧L" onClick={handleLogout}>Logout</DropdownItem>
        {/* <DropdownItem key="skip" shortcut="⌘S">Skip/Refresh</DropdownItem> */}
        {/* <DropdownItem key="history" shortcut="⌘H">Past Questions</DropdownItem> */}
        {/* <DropdownItem key="textSize" shortcut="⌘T">Text Size</DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
};

export default OptionsMenu;