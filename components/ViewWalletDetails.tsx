import React, { useEffect, useState } from 'react';
import { Modal, Text, Card, LoadingOverlay } from '@mantine/core';
import axios from 'axios';
import { ETHEREUM_ENDPOINT, SOLANA_ENDPOINT } from '@/lib/constants';
import { ViewWalletDetailsProps } from '@/lib/utils';

const ViewWalletDetails = ({
  opened,
  onClose,
  publicKey,
  walletType,
}: ViewWalletDetailsProps) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWalletBalance = async () => {
    setLoading(true);
    setError(null);
    const url = walletType === 'solana' ? SOLANA_ENDPOINT : ETHEREUM_ENDPOINT;
    const config = walletType === 'solana'
      ? {
          jsonrpc: '2.0',
          id: 1,
          method: 'getBalance',
          params: [publicKey],
        }
      : {
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_getBalance',
          params: [publicKey, 'latest'],
        };

    try {
      const response = await axios.post(url, config);
      const balanceData = walletType === 'solana'
        ? response.data.result.value / 1000000000 // Convert lamports to SOL
        : parseInt(response.data.result, 16) / Math.pow(10, 18); // Convert Wei to ETH
      setBalance(balanceData);
      console.log(response.data.result.value)
    } catch (error) {
      setError('An error occurred while fetching the balance.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (opened) fetchWalletBalance();
  }, [publicKey, opened]);

  return (
    <Modal opened={opened} onClose={onClose} title="Wallet Details">
      <LoadingOverlay visible={loading} opacity={0.5} />
      {error ? (
        <Text color="red">{error}</Text>
      ) : (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="lg" >Wallet Type: {walletType}</Text>
          <Text size="lg" >
            Balance: {balance !== null ? `${balance.toFixed(4)} ${walletType === 'solana' ? 'SOL' : 'ETH'}` : 'Fetching...'}
          </Text>
        </Card>
      )}
    </Modal>
  );
};

export default ViewWalletDetails;