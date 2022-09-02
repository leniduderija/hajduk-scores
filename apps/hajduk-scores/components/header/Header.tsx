import { Container, Box, chakra, useMediaQuery } from '@chakra-ui/react';
import Logo from '../logo/Logo';
import theme from '../../common/theme';
import { Leaderboard } from '../leaderboard/Leaderboard';
import { useContextState } from '../../common/context/state-context';

const HeaderContainer = chakra(Box, {
  baseStyle: {
    padding: '20px',
    background: 'url(/images/top-bg.gif) center',
    position: 'relative',
    boxShadow: '0 0 4px 2px rgb(80 80 80 / 30%)',
  },
});

const MobileLeaderboard = chakra(Box, {
  baseStyle: {
    position: 'fixed',
    top: 0,
    right: 0,
    fontSize: 10,
    textAlign: 'right',
    color: '#fff',
  },
});

export function Header() {
  const [isSmallScreen] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const { leaderBoard } = useContextState();
  return (
    <HeaderContainer>
      <Container>
        <Logo />
        {isSmallScreen && (
          <MobileLeaderboard>
            <Leaderboard hideTitle={true} leaderboard={leaderBoard} />
          </MobileLeaderboard>
        )}
      </Container>
    </HeaderContainer>
  );
}

export default Header;
