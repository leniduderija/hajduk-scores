import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Flex,
  Box,
  Center,
  Hide,
  Show,
  Text,
  chakra,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  useDisclosure,
  useTheme,
  Stack,
  useMediaQuery,
  Image,
  Link,
} from '@chakra-ui/react';

const NavigationItem = chakra(Text, {
  baseStyle: {
    fontWeight: 'bold',
    margin: { base: 0, md: '0 24px' },
    cursor: 'pointer',
  },
});

export function Navigation() {
  const theme = useTheme();
  // const [isSmallScreen] = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      w="100%"
      p={{ base: '12px 16px', md: '20px 32px' }}
      // background={theme.colors.palette.white.primary}
      // color={theme.colors.palette.blue.dark}
      fontSize={14}
      boxShadow="'0px 10px 25px rgba(0, 0, 0, 0.05)'"
      transition="top 0.3s"
    >
      {/*<Flex*/}
      {/*  flexDirection="row"*/}
      {/*  justifyContent={{ base: 'center', md: 'space-between' }}*/}
      {/*  alignItems="center"*/}
      {/*>*/}
      {/*  <Link href="/" passHref>*/}
      {/*    <a>*/}
      {/*      <Image*/}
      {/*        src="/images/Logo.png"*/}
      {/*        alt="Sail Week Logo"*/}
      {/*        width={187}*/}
      {/*        height={23}*/}
      {/*      />*/}
      {/*    </a>*/}
      {/*  </Link>*/}

      {/*  <Hide below="md">*/}
      {/*    <Center display="flex" flexDirection="row">*/}
      {/*      <Link href="/destinations" passHref>*/}
      {/*        <NavigationItem>Destinations</NavigationItem>*/}
      {/*      </Link>*/}
      {/*      <Link href="/about" passHref>*/}
      {/*        <NavigationItem>About Us</NavigationItem>*/}
      {/*      </Link>*/}
      {/*      <Link href="/faq" passHref>*/}
      {/*        <NavigationItem>FAQ</NavigationItem>*/}
      {/*      </Link>*/}
      {/*      <Link href="/contact" passHref>*/}
      {/*        <NavigationItem>Contact</NavigationItem>*/}
      {/*      </Link>*/}
      {/*    </Center>*/}
      {/*    <Link href="/enquiry" passHref>*/}
      {/*      <NavigationItem color={theme.colors.palette.blue.primary}>*/}
      {/*        Enquiry*/}
      {/*      </NavigationItem>*/}
      {/*    </Link>*/}
      {/*  </Hide>*/}
      {/*  <Show below="md">*/}
      {/*    <IconButton*/}
      {/*      sx={{*/}
      {/*        position: 'absolute',*/}
      {/*        right: '16px',*/}
      {/*      }}*/}
      {/*      icon={*/}
      {/*        <HamburgerIcon*/}
      {/*          color={theme.colors.palette.black.primary}*/}
      {/*          boxSize="21px"*/}
      {/*        />*/}
      {/*      }*/}
      {/*      aria-label="Open mobile menu"*/}
      {/*      variant="unstyled"*/}
      {/*      onClick={onOpen}*/}
      {/*    />*/}
      {/*    <Drawer*/}
      {/*      placement="right"*/}
      {/*      onClose={onClose}*/}
      {/*      isOpen={isOpen}*/}
      {/*      size="full"*/}
      {/*    >*/}
      {/*      <DrawerOverlay />*/}
      {/*      <DrawerContent>*/}
      {/*        <DrawerHeader borderBottomWidth="1px" padding="23px">*/}
      {/*          <DrawerCloseButton />*/}
      {/*        </DrawerHeader>*/}
      {/*        <DrawerBody>*/}
      {/*          <Stack*/}
      {/*            spacing={6}*/}
      {/*            alignItems="center"*/}
      {/*            justifyContent="center"*/}
      {/*            paddingTop="20px"*/}
      {/*          >*/}
      {/*            <Link href="/destinations" passHref>*/}
      {/*              <NavigationItem>Destinations</NavigationItem>*/}
      {/*            </Link>*/}
      {/*            <Link href="/about" passHref>*/}
      {/*              <NavigationItem>About Us</NavigationItem>*/}
      {/*            </Link>*/}
      {/*            <Link href="/faq" passHref>*/}
      {/*              <NavigationItem>FAQ</NavigationItem>*/}
      {/*            </Link>*/}
      {/*            <Link href="/enquiry" passHref>*/}
      {/*              <NavigationItem>Enquiry</NavigationItem>*/}
      {/*            </Link>*/}
      {/*          </Stack>*/}
      {/*        </DrawerBody>*/}
      {/*      </DrawerContent>*/}
      {/*    </Drawer>*/}
      {/*  </Show>*/}
      {/*</Flex>*/}
    </Box>
  );
}

export default Navigation;
