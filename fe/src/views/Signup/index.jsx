// src/views/Signup.jsx
import React from 'react';
import { VStack, Center } from '@chakra-ui/react';
import AuthForm from '../../components/AuthForm';
import Logo from '../../components/Logo';

const Signup = () => {
  const handleSignupSubmit = (formData) => {
    console.log('Signing up:', formData);
  };

  return (
    <Center h="100vh">
      <VStack spacing={12}>
        <Logo />
        <AuthForm isLogin={false} onSubmit={handleSignupSubmit} />
      </VStack>
    </Center>
  );
};

export default Signup;
