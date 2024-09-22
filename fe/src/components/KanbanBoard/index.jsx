import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Flex, Button, useDisclosure, Heading, Input } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import KanbanColumn from '../KanbanColumn';
import AddColumnModal from '../AddColumnModal';
import { v4 as uuidv4 } from 'uuid';

const MotionFlex = motion(Flex);

const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);
  const [boardTitle, setBoardTitle] = useState('Lead Categorizer');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Load columns and title from localStorage on mount
  useEffect(() => {
    const storedColumns = localStorage.getItem('kanbanColumns');
    const storedTitle = localStorage.getItem('kanbanTitle');
    if (storedColumns) {
      setColumns(JSON.parse(storedColumns));
    }
    if (storedTitle) {
      setBoardTitle(storedTitle);
    }
  }, []);

  // Save columns and title to localStorage
  useEffect(() => {
    localStorage.setItem('kanbanColumns', JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    localStorage.setItem('kanbanTitle', boardTitle);
  }, [boardTitle]);

  const addColumn = (title) => {
    const newColumn = {
      id: uuidv4(),
      title,
      tasks: [],
    };
    setColumns([...columns, newColumn]);
  };

  const addTask = (columnId, taskContent) => {
    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: [...column.tasks, { id: uuidv4(), content: taskContent }],
        };
      }
      return column;
    });
    setColumns(updatedColumns);
  };

  const moveTask = (taskId, sourceColumnId, destinationColumnId) => {
    const updatedColumns = columns.map((column) => {
      if (column.id === sourceColumnId) {
        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== taskId),
        };
      }
      if (column.id === destinationColumnId) {
        const taskToMove = columns
          .find((col) => col.id === sourceColumnId)
          .tasks.find((task) => task.id === taskId);
        return {
          ...column,
          tasks: [...column.tasks, taskToMove],
        };
      }
      return column;
    });
    setColumns(updatedColumns);
  };

  const deleteTask = (columnId, taskId) => {
    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== taskId),
        };
      }
      return column;
    });
    setColumns(updatedColumns);
  };

  const deleteColumn = (columnId) => {
    setColumns(columns.filter((column) => column.id !== columnId));
  };

  // Handle board title editing
  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    setBoardTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditingTitle(false);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box p={8} bg="gray.900" minH="100vh">
        {isEditingTitle ? (
          <Input
            value={boardTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            fontSize="2xl"
            fontWeight="bold"
            mb={8}
            color="white"
            borderColor="gray.600"
            borderWidth="0.2px"
            autoFocus
          />
        ) : (
          <Heading
            size="2xl"
            color="white"
            mb={8}
            fontWeight="bold"
            onClick={handleTitleClick}
            cursor="pointer"
          >
            {boardTitle}
          </Heading>
        )}
        <MotionFlex
          overflowX="auto"
          pb={8}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          minH="calc(100vh - 150px)"
        >
          <AnimatePresence>
            {columns.map((column, index) => (
              <MotionFlex
                key={column.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <KanbanColumn
                  key={column.id}
                  column={column}
                  addTask={addTask}
                  moveTask={moveTask}
                  deleteTask={deleteTask}
                  deleteColumn={deleteColumn}
                />
              </MotionFlex>
            ))}
          </AnimatePresence>
          <Button
            onClick={onOpen}
            colorScheme="blue"
            size="sm"
            minW="300px"
            h="50px"
            borderRadius="xl"
            fontWeight="bold"
            fontSize="xl"
            _hover={{ bg: 'blue.500', transform: 'translateY(-5px)' }}
            transition="all 0.3s"
            boxShadow="lg"
            ml={4}
          >
            + Add Column
          </Button>
        </MotionFlex>
      </Box>
      <AddColumnModal isOpen={isOpen} onClose={onClose} addColumn={addColumn} />
    </DndProvider>
  );
};

export default KanbanBoard;