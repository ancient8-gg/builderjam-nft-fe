import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='h-screen text-white flex flex-col'>
      <header className='bg-black py-4 w-full sticky top-0 z-1000'>
        <div className='container mx-auto flex justify-between items-center'>
          <img src='/images/logo-ancient8.png' />
          <ConnectButton />
        </div>
      </header>
      <main className='container flex-1 overflow-y-auto mx-auto py-8 flex items-center justify-center'>{children}</main>
    </div>
  );
};

export default Layout;
