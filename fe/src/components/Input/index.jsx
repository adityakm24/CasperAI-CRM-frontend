import { Input, InputGroup } from '@chakra-ui/react';
import React from 'react';

const InputComponent = ({ type, placeholder, ...props }) => (
  <InputGroup size="lg" w="100%">
    <Input
      type={type}
      placeholder={placeholder}
      focusBorderColor="brandBlue"
      background="rgba(255, 255, 255, 0.02)"
      border="1px solid rgba(255, 255, 255, 0.1)"
      color="white"
      borderRadius="md"
      height="60px"
      fontSize="lg"
      _placeholder={{ color: 'gray.500' }}
      _focus={{
        borderColor: 'brandBlue',
        boxShadow: '0 0 0 1px rgba(28, 176, 246, 0.6)',
      }}
      _hover={{ borderColor: 'gray.600' }}
      transition="all 0.3s"
      {...props}
    />
  </InputGroup>
);

export default InputComponent;