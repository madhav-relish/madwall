'use client'

import React from 'react';
import { Button, Box } from '@mantine/core';
import { addWalletProps } from '@/lib/utils';


const WalletButtons = ({ generateWallets }: addWalletProps) => {
  return (
    <div className="flex flex-col justify-center items-center  gap-4 ">
      <Button w={180} onClick={() => generateWallets('solana')}>
        Add Solana Wallet
      </Button>
      <Button w={180}  onClick={() => generateWallets('eth')}>
        Add Ethereum Wallet
      </Button>
    </div>
  );
};

export default WalletButtons;