// components/EndGameModal.js
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

export default function EndGameModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>End Game</ModalHeader>
        <ModalBody>Are you sure you want to end the current game?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onClose}>Cancel</Button>
          <Button color="danger" onClick={onConfirm}>End Game</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}