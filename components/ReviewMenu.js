// components/ReviewMenu.js
import React from 'react';
import { Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import ChevronDownIcon from '../app/src/icons/ChevronDownIcon';

// Add the onPlaySimilar prop
const ReviewMenu = ({ selectedScript, onChatWithTutor, onPlaySimilar }) => {
  const [selectedOption, setSelectedOption] = React.useState(new Set(["chat"]));

  const descriptionsMap = {
    chat: "Chat with a virtual tutor about the scripts you got wrong.",
    annotate: "Click to annotate the script with inline code comments that describe each line.", // Updated description
    play: "Play similar scripts. (This feature will be available in a future release.)",
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
    play: onPlaySimilar, // Use the onPlaySimilar prop
  };

  const selectedOptionValue = Array.from(selectedOption)[0];

  return (
    <ButtonGroup variant="flat" className="review-menu">
      <Button onClick={() => {
        console.log('ReviewMenu - Play similar clicked for script:', selectedScript);
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
          // Remove 'play' from disabledKeys to enable the option
          disabledKeys={['annotate']}
        >
          <DropdownItem key="chat" description={descriptionsMap["chat"]}>
            {labelsMap["chat"]}
          </DropdownItem>
          <DropdownItem key="annotate" description={descriptionsMap["annotate"]} className="disabledDropdownItem">
            {labelsMap["annotate"]}
          </DropdownItem>
          <DropdownItem key="play" description={descriptionsMap["play"]} >
            {labelsMap["play"]}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
};

export default ReviewMenu;
