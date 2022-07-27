import { Container, Box, chakra } from '@chakra-ui/react';
import Logo from '../logo/Logo';

const HeaderContainer = chakra(Box, {
  baseStyle: {
    padding: '20px',
    background: 'url(/images/top-bg.gif) center',
    position: 'relative',
    boxShadow: '0 0 4px 2px rgb(80 80 80 / 30%)',
  },
});

export function Header() {
  return (
    <HeaderContainer>
      <Container>
        <Logo />
      </Container>
    </HeaderContainer>
  );
}

export default Header;
