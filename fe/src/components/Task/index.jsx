// src/components/Task.jsx
import React from 'react';
import { Box, Text, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Task = ({ task, columnId, deleteTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, columnId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <MotionBox
      ref={drag}
      bg="gray.700"
      p={4}
      borderRadius="lg"
      boxShadow="md"
      opacity={isDragging ? 0.5 : 1}
      cursor="move"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      _hover={{ bg: 'gray.600', transform: 'translateY(-3px)' }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text color="white" fontSize="md" fontWeight="medium">{task.content}</Text>
        <IconButton
          icon={<DeleteIcon />}
          onClick={() => deleteTask(columnId, task.id)}
          size="sm"
          colorScheme="red"
          variant="ghost"
          _hover={{ bg: 'red.700' }}
        />
      </Box>
    </MotionBox>
  );
};

export default Task;