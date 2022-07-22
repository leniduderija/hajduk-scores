import { extendTheme } from '@chakra-ui/react';

const colors = {
  palette: {
    background: {
      primary: '#FCFCFC',
      secondary: '#F5F5F6',
    },
    blue: {
      primary: '#2962D0',
      dark: '#0F2F50',
    },
    gray: {
      light: '#979797',
      lightest: '#F5F5F6',
      gray1: '#4A4E4C',
      gray2: '#656565',
      gray3: '#F5F5F6',
      gray4: '#E5E5E5',
      background: '#FDFCFC',
    },
    green: {
      green1: '#14B579',
      green2: '#08AA6E',
    },
    white: {
      primary: '#FFF',
    },
    black: {
      primary: '#000',
    },
  },
};

const fonts = {
  default: `'Inter', sans-serif`,
  footer: `'Open Sans', sans-serif`,
};

const globalStyles = {
  global: {
    body: {
      fontFamily: fonts.default,
      minHeight: '100vh',
      backgroundColor: colors.palette.background.primary,
      fontSize: [16, 18],
    },
    a: {
      cursor: 'pointer',
    },
    button: {
      _focus: {
        boxShadow: 'none',
      },
    },
  },
};

const Container = {
  sizes: {
    myCustomSize: {
      maxW: 1180,
    },
  },
  defaultProps: {
    size: 'myCustomSize',
  },
};

const Button = {
  baseStyle: {
    fontFamily: fonts.default,
    fontSize: '15px',
    lineHeight: '18px',
    fontWeight: '600',
    minW: 'auto',
    minWidth: 'auto',
    _focus: {
      boxShadow: 'none',
    },
    _hover: {
      background: 'transparent',
    },
  },
};

const components = {
  Container,
  Button,
  CloseButton: Button,
};

const theme = extendTheme({
  styles: globalStyles,
  fonts,
  colors,
  components,
});

export default theme;
