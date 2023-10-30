import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { IoOptions } from "react-icons/io5";

const OptionsMenu = () => {
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
        <DropdownItem key="settings" shortcut="⌘S">Settings</DropdownItem>
        <DropdownItem key="profile" shortcut="⌘P">Profile</DropdownItem>
        <DropdownItem key="help" shortcut="⌘H">Help</DropdownItem>
        <DropdownItem key="logout" shortcut="⌘L" className="text-danger" color="danger">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default OptionsMenu;
