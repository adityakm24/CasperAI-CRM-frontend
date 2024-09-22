// src/components/KanbanColumn.jsx
import React from 'react';
import { Box, VStack, Heading, IconButton, useDisclosure, Text } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { useDrop } from 'react-dnd';
import Task from '../Task';
import AddTaskModal from '../AddTaskModal';

const KanbanColumn = ({ column, addTask, moveTask, deleteTask, deleteColumn }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, item.columnId, column.id),
  });

  return (
    <Box
      ref={drop}
      bg="gray.800"
      p={6}
      borderRadius="xl"
      minW="350px"
      maxW="350px"
      mr={6}
      boxShadow="xl"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)' }}
    >
      <VStack align="stretch" spacing={6}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading size="lg" color="white" fontWeight="bold">
            {column.title}
          </Heading>
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => deleteColumn(column.id)}
            size="md"
            colorScheme="red"
            variant="ghost"
            _hover={{ bg: 'red.700' }}
          />
        </Box>
        {column.tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            columnId={column.id}
            deleteTask={deleteTask}
          />
        ))}
        <IconButton
          icon={<AddIcon />}
          onClick={onOpen}
          colorScheme="blue"
          size="md"
          w="100%"
          h="40px"
          _hover={{ bg: 'blue.500' }}
        >
          <Text ml={2} fontSize="lg" fontWeight="bold">Add Task</Text>
        </IconButton>
      </VStack>
      <AddTaskModal
        isOpen={isOpen}
        onClose={onClose}
        addTask={(taskContent) => addTask(column.id, taskContent)}
      />
    </Box>
  );
};

export default KanbanColumn;