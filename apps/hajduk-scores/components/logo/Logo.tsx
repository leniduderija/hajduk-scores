import * as React from 'react';
import { Box, Flex, chakra } from '@chakra-ui/react';

const LogoContainer = chakra(Flex, {
  baseStyle: {
    width: 100,
    height: 100,
    background: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    border: '1px solid #CAA661',
    color: '#CAA661',
    '& h2': {
      fontSize: '28px',
      lineHeight: '28px',
      margin: 0,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    '& h6': {
      fontSize: '10px',
      lineHeight: '16px',
      margin: 0,
    },
  },
});

export function Logo() {
  return (
    <LogoContainer>
      <h2>
        <Box color="red">H</Box>
        <Box color="blue">S</Box>
      </h2>
      <h6>Hajduk Scores</h6>
    </LogoContainer>
  );
}

export default Logo;
