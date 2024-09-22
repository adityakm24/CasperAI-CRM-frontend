import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

const FullPageSpinner = (props) => {
  return (
    <Flex h="100vh" w="100vw" justify="center" align="center" bg="black">
      <Spinner color="brand.600" thickness="4px" size="xl" />
    </Flex>
  );
};

export default FullPageSpinner;
