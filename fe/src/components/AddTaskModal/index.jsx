// src/components/AddTaskModal.jsx
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
  Textarea,
} from '@chakra-ui/react';

const AddTaskModal = ({ isOpen, onClose, addTask }) => {
  const [taskContent, setTaskContent] = useState('');

  const handleSubmit = () => {
    if (taskContent.trim()) {
      addTask(taskContent.trim());
      setTaskContent('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent bg="gray.800" color="white" borderRadius="xl">
        <ModalHeader fontSize="2xl" fontWeight="bold">Add New Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
            placeholder="Enter task content"
            size="lg"
            fontSize="xl"
            minH="150px"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit} size="lg" fontSize="lg">
            Add Task
          </Button>
          <Button colorScheme="red" variant="ghost" onClick={onClose} size="lg" fontSize="lg">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default AddTaskModal;