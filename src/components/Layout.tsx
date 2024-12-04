import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import clsx from 'clsx';

import { Toast } from './Toast';

import Css from '../styles/Component.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='h-screen text-white flex flex-col'>
      <header className='bg-black py-4 w-full sticky top-0 z-40'>
        <div className='container mx-auto flex justify-between items-center'>
          <img src='/images/logo-ancient8.png' />
          <ConnectButton />
        </div>
      </header>
      <main
        className={clsx(
          Css.layout,
          'container flex-1 flex-wrap overflow-y-auto mx-auto py-8 flex items-center justify-center'
        )}
      >
        {children}
      </main>
      <Toast />
    </div>
  );
};

export default Layout;
