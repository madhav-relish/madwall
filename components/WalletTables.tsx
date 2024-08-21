import React from "react";
import { Table, Box, Text } from "@mantine/core";
import { walletProps } from "@/lib/utils";

const WalletTable = ({
  title,
  wallets,
  walletType,
  handleSelectWallet,
}: walletProps) => {
    const type = walletType === "solana" ? "Solana" : "Ethereum"
  return (
    <Box>
      <Text>{title}</Text>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Wallet Type</Table.Th>
            <Table.Th>Wallet No.</Table.Th>
            <Table.Th>Key</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {wallets.length === 0 ? (
            <Table.Tr>
              <Table.Td></Table.Td>
              <Table.Td>Please add a {type} wallet</Table.Td>
              <Table.Td></Table.Td>
            </Table.Tr>
          ) : (
            wallets.map((wallet, index) => (
              <Table.Tr
                key={`${walletType}-${index}`}
                onClick={() => handleSelectWallet(wallet, walletType)}
                className="cursor-pointer"
              >
                <Table.Td>
                  {walletType === "solana"
                    ? "Solana"
                    : walletType === "eth"
                    ? "Ethereum"
                    : ""}
                </Table.Td>
                <Table.Td>Wallet {index + 1}</Table.Td>
                <Table.Td>{wallet}</Table.Td>
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default WalletTable;
