'use client'

import React, { useState } from 'react';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';
import MnemonicContainer from './MnemonicContainer';
import { hdkey } from 'ethereumjs-wallet';
import { Stepper, Button, Group, Box, Text } from '@mantine/core';

export const Dashboard = () => {
  const [mnemonic, setMnemonic] = useState(generateMnemonic().split(' '));
  const [solanaWallets, setSolanaWallets] = useState<string[]>([]);
  const [ethereumWallets, setEthereumWallets] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  const derivationPath = {
    solana: "m/44'/501'/x'/0'",
    eth: "m/44'/60'/x'/0'"
  };

  type WalletType = 'solana' | 'eth';

  const generateWallets = (type: WalletType) => {
    const generatedSeed = mnemonicToSeedSync(mnemonic.join(' '));
    const newWallets = [];

    for (let i = 0; i < (type === "solana" ? solanaWallets.length + 1 : ethereumWallets.length + 1); i++) {
      const path = derivationPath[type].replace('x', i.toString());
      const derivedSeed = derivePath(path, generatedSeed.toString('hex')).key;
      if (type === 'solana') {
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        newWallets.push(Keypair.fromSecretKey(secret).publicKey.toBase58());
      } else if (type === "eth") {
        const ethInstance = hdkey.fromMasterSeed(generatedSeed).derivePath(path).getWallet();
        newWallets.push(ethInstance.getAddressString());
      }
    }

    if (type === 'solana') {
      setSolanaWallets(newWallets);
    } else if (type === 'eth') {
      setEthereumWallets(newWallets);
    }
  };

  const resetMnemonic = () => {
    const newMnemonic = generateMnemonic().split(' ');
    setMnemonic(newMnemonic);
    setSolanaWallets([]);
    setEthereumWallets([]);
    setActiveStep(0);
  };

  const steps = ['View Mnemonic', 'Add and View Wallets'];

  const handleNext = () => {
    setActiveStep((current) => current + 1);
  };

  const handleBack = () => {
    setActiveStep((current) => current - 1);
  };

  return (

    // TODO: Add table for a better ui
    // Make the app efficient
    <Box>
      <Stepper active={activeStep} onStepClick={setActiveStep}>
        <Stepper.Step label="First step" description="View your mnemonic">
          <MnemonicContainer mnemonicList={mnemonic} />
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Add and view wallets">
          <div className='flex flex-col gap-4 min-w-[600px]'>
            <Button onClick={() => generateWallets('solana')}>
              Add Solana Wallet
            </Button>
            <Button onClick={() => generateWallets('eth')}>
              Add Ethereum Wallet
            </Button>
            <Box>
              <Text >Solana Wallets</Text>
              {solanaWallets.map((wallet, index) => (
                <Text key={index}>Wallet {index + 1}: {wallet}</Text>
              ))}
            </Box>
            <Box>
              <Text >Ethereum Wallets</Text>
              {ethereumWallets.map((wallet, index) => (
                <Text key={index}>Wallet {index + 1}: {wallet}</Text>
              ))}
            </Box>
          </div>
        </Stepper.Step>
      </Stepper>

      <Group align='center' mt="xl">
        <Button variant="light" color='blue' onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>
        <Button variant="light" color='green' onClick={handleNext} disabled={activeStep === steps.length - 1}>
          Next
        </Button>
        {activeStep === steps.length - 1 && (
          <Button variant='light' color="red" onClick={resetMnemonic}>
            Reset Mnemonic
          </Button>
        )}
      </Group>
    </Box>
  );
};

export default Dashboard;