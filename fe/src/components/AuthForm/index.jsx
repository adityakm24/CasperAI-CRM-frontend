// src/components/AuthForm.jsx
import React, { useState } from 'react';
import { VStack, Button, Heading, Text, Box } from '@chakra-ui/react';
import InputComponent from '../Input';

const AuthForm = ({ isLogin = true, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    ...(isLogin ? {} : { confirmPassword: '' }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      as="form"
      w="100%"
      maxW="500px"
      p={12}
      borderRadius="xl"
      bg="rgba(255, 255, 255, 0.03)"
      backdropFilter="blur(20px)"
      onSubmit={handleSubmit}
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
    >
      <VStack spacing={12} align="stretch">
        <Heading
          color="white"
          fontSize="4xl"
          fontWeight="light"
          letterSpacing="wider"
          textAlign="center"
        >
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </Heading>

        <VStack spacing={8}>
          <InputComponent
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputComponent
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {!isLogin && (
            <InputComponent
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          )}
        </VStack>

        <Button
          type="submit"
          w="100%"
          bg="brandBlue"
          color="white"
          size="lg"
          height="60px"
          fontSize="xl"
          fontWeight="medium"
          _hover={{ bg: 'blue.500' }}
          _active={{ bg: 'blue.600' }}
          transition="all 0.3s"
        >
          {isLogin ? 'Sign In' : 'Sign Up'}
        </Button>

        <Text fontSize="md" color="gray.400" textAlign="center">
          {isLogin
            ? "Don't have an account? Sign up here."
            : 'Already have an account? Sign in here.'}
        </Text>
      </VStack>
    </Box>
  );
};

export default AuthForm;