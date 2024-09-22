// src/views/Login.jsx
import React from 'react';
import { VStack, Center } from '@chakra-ui/react';
import AuthForm from '../../components/AuthForm';
import Logo from '../../components/Logo';

const Login = () => {
  const handleLoginSubmit = (formData) => {
    console.log('Logging in:', formData);
  };
  

  return (
    <Center h="100vh">
      <VStack spacing={12}>
        <Logo />
        <AuthForm isLogin={true} onSubmit={handleLoginSubmit} />
      </VStack>
    </Center>
  );
};

export default Login;