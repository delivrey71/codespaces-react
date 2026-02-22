import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      toastOptions={{
        style: {
          borderRadius: '10px',
          fontSize: '14px',
        },
      }}
    />
  );
}
