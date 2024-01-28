// components/ReviewMenu.js
import React from 'react';
import { Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import ChevronDownIcon from '../app/src/icons/ChevronDownIcon';

const ReviewMenu = ({ selectedScript, onChatWithTutor, onPlaySimilar }) => {
  const [selectedOption, setSelectedOption] = React.useState(new Set(["chat"]));

  const descriptionsMap = {
    chat: "Chat with a virtual tutor about this code snippet.",
    annotate: "Annotate the script with inline code comments that describe each line. (future release)",
    play: "Start a new game with similar code snippets of increasing difficulty.",
  };

  const labelsMap = {
    chat: "Chat with Virtual Tutor",
    annotate: "Annotate Lines",
    play: "Play similar scripts",
  };

  // Define a map of functions for each option
  const actionsMap = {
    chat: onChatWithTutor,
    annotate: () => {}, // No-op function
    play: () => { 
      localStorage.setItem('resetGameOnLoad', 'true');
      onPlaySimilar(selectedScript);
    },
  };

  const selectedOptionValue = Array.from(selectedOption)[0];

  return (
    <ButtonGroup variant="flat" className="review-menu">
      <Button onClick={() => {
        actionsMap[selectedOptionValue](selectedScript);
      }}>{labelsMap[selectedOptionValue]}</Button>
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
          disabledKeys={['annotate']}
        >
          <DropdownItem key="chat" description={descriptionsMap["chat"]}>
            {labelsMap["chat"]}
          </DropdownItem>
          <DropdownItem key="play" description={descriptionsMap["play"]} >
            {labelsMap["play"]}
          </DropdownItem>
          <DropdownItem key="annotate" description={descriptionsMap["annotate"]} className="disabledDropdownItem">
            {labelsMap["annotate"]}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
};

export default ReviewMenu;
