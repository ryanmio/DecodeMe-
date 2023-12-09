// app/src/components/ReviewMenu.js
import React from 'react';
import { Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import ChevronDownIcon from '../icons/ChevronDownIcon';

const ReviewMenu = ({ incorrectItem }) => {
  const [selectedOption, setSelectedOption] = React.useState(new Set(["chat"]));

  const descriptionsMap = {
    chat: "Chat with a virtual tutor about the scripts you got wrong.",
    explain: "Get a detailed explanation of the incorrect scripts.",
    play: "Play similar scripts. (This feature will be available in a future release.)",
  };

  const labelsMap = {
    chat: "Chat with Virtual Tutor",
    explain: "Explain this in detail",
    play: "Play similar scripts",
  }

  const selectedOptionValue = Array.from(selectedOption)[0];

  return (
    <ButtonGroup variant="flat" className="review-menu">
      <Button>{labelsMap[selectedOptionValue]}</Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Review options"
          selectedKeys={selectedOption}
          selectionMode="single"
          onSelectionChange={setSelectedOption}
          className="max-w-[300px]"
        >
          <DropdownItem key="chat" description={descriptionsMap["chat"]}>
            {labelsMap["chat"]}
          </DropdownItem>
          <DropdownItem key="explain" description={descriptionsMap["explain"]} disabled>
            {labelsMap["explain"]}
          </DropdownItem>
          <DropdownItem key="play" description={descriptionsMap["play"]} disabled>
            {labelsMap["play"]}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
};

export default ReviewMenu;
