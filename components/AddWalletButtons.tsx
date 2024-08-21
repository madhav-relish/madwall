'use client'

import React from 'react';
import { Button, Box } from '@mantine/core';
import { addWalletProps } from '@/lib/utils';


const WalletButtons = ({ generateWallets }: addWalletProps) => {
  return (
    <div className="flex flex-col gap-4 min-w-[600px]">
      <Button onClick={() => generateWallets('solana')}>
        Add Solana Wallet
      </Button>
      <Button onClick={() => generateWallets('eth')}>
        Add Ethereum Wallet
      </Button>
    </div>
  );
};

export default WalletButtons;