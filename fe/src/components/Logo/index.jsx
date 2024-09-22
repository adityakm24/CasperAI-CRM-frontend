// src/components/Logo.jsx
import React from 'react';
import { HStack, Text, Box } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

const Logo = ({ justifyContent = 'start' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <HStack
      justifyContent={justifyContent}
      cursor="pointer"
      spacing={4}
      onClick={() => {
        if (location.pathname !== '/') navigate('/');
      }}
    >
      <Box
        w="40px"
        h="40px"
        borderRadius="md"
        bg="brandBlue"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="2xl" fontWeight="bold" color="white">
          C
        </Text>
      </Box>
      <Text fontSize="2xl" fontWeight="light" letterSpacing="wider" color="white">
        CASPER AI
      </Text>
    </HStack>
  );
};

export default Logo;