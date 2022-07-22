import * as React from 'react';
import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import Header from '../header/Header';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <Box display="flex" flexDirection="column" height="100%" minHeight="100vh">
      <Header />
      <main className={className}>{children}</main>
    </Box>
  );
}

export default Layout;
