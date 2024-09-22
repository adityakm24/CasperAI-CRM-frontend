// src/components/AddColumnModal.jsx
import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from '@chakra-ui/react';

const AddColumnModal = ({ isOpen, onClose, addColumn }) => {
  const [columnTitle, setColumnTitle] = useState('');

  const handleSubmit = () => {
    if (columnTitle.trim()) {
      addColumn(columnTitle.trim());
      setColumnTitle('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent bg="gray.800" color="white" borderRadius="xl">
        <ModalHeader fontSize="2xl" fontWeight="bold">Add New Column</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            placeholder="Enter column title"
            size="lg"
            fontSize="xl"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit} size="lg" fontSize="lg">
            Add Column
          </Button>
          <Button variant="ghost" onClick={onClose} size="lg" fontSize="lg">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddColumnModal;