import clsx from 'clsx';
import { createContext, useContext, useState, useEffect } from 'react';

type ToastData = {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
};

type ToastContext = {
  toastState: ToastData | undefined;
  toast: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
};

const Context = createContext<ToastContext>({
  toastState: undefined,
  toast: () => {},
});

export const useToast = () => useContext(Context);

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastData | undefined>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setToast(undefined);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [toast]);

  return (
    <Context.Provider
      value={{
        toastState: toast,
        toast: (toastMessage, type = 'success') => setToast({ message: toastMessage, type }),
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const Toast: React.FC = () => {
  const { toastState } = useToast();

  return (
    <div
      className={clsx('absolute top-20 end-10 z-50', {
        hidden: !toastState,
      })}
    >
      <div
        className={clsx('max-w-3xl text-sm text-white shadow-lg dark:bg-neutral-900', {
          'bg-teal-500': toastState?.type === 'success' || toastState?.type === 'info',
          'bg-red-500': toastState?.type === 'error',
          'bg-yellow-500': toastState?.type === 'warning',
        })}
        role='alert'
        tabIndex={-1}
        aria-labelledby='hs-toast-solid-color-dark-label'
      >
        <div id='hs-toast-solid-color-dark-label' className='flex p-4'>
          {toastState?.message}
        </div>
      </div>
    </div>
  );
};
