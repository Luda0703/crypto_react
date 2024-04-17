import React from 'react';
import AppLayout from './components/layout/AppLayout';
import { CryptoContextProvider } from './context/crypto-context';

function App() {
  return (
    <CryptoContextProvider>
      <AppLayout/>
    </CryptoContextProvider>
  )
}

export default App
