import { Container, Box, chakra } from '@chakra-ui/react';
import bgImg from '../../assets/top-bg.gif';
import Logo from "../logo/Logo";

const HeaderContainer = chakra(Box, {
  baseStyle: {
    padding: '20px',
    background: `url(${bgImg}) center`,
    position: 'relative',
    boxShadow: '0 0 4px 2px rgb(80 80 80 / 30%)',
  },
});

export function Header() {
  return (
    <HeaderContainer>
      <Container
        pt={{ base: '60px', lg: '64px' }}
        px={{ base: '24px', md: '24px', lg: 0 }}
      >
        <Logo />
      </Container>
    </HeaderContainer>
  );
}

export default Header;
