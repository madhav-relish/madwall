"use client";

import React, { useState } from "react";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import MnemonicContainer from "./MnemonicContainer";
import { hdkey } from "ethereumjs-wallet";
import { Stepper, Box } from "@mantine/core";
import WalletTable from "./WalletTables";
import WalletButtons from "./AddWalletButtons";
import StepNavigationButtons from "./StepNavigationButtons";
import { derivationPath, WalletType } from "@/lib/utils";
import ViewWalletDetails from "./ViewWalletDetails";

export const Dashboard = () => {
  const [mnemonic, setMnemonic] = useState(generateMnemonic().split(" "));
  const [solanaWallets, setSolanaWallets] = useState<string[]>([]);
  const [ethereumWallets, setEthereumWallets] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedWallet, setSelectedWallet] = useState({
    wallateType: "",
    publicKey: ""
  })
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleModalClose = () =>{
    setIsModalOpen(false)
  }

  const generateWallets = (type: WalletType) => {
    const generatedSeed = mnemonicToSeedSync(mnemonic.join(" "));
    const newWallets = [];

    for (
      let i = 0;
      i <
      (type === "solana"
        ? solanaWallets.length + 1
        : ethereumWallets.length + 1);
      i++
    ) {
      const path = derivationPath[type].replace("x", i.toString());
      const derivedSeed = derivePath(path, generatedSeed.toString("hex")).key;
      if (type === "solana") {
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        newWallets.push(Keypair.fromSecretKey(secret).publicKey.toBase58());
      } else if (type === "eth") {
        const ethInstance = hdkey
          .fromMasterSeed(generatedSeed)
          .derivePath(path)
          .getWallet();
        newWallets.push(ethInstance.getAddressString());
      }
    }

    if (type === "solana") {
      setSolanaWallets(newWallets);
    } else if (type === "eth") {
      setEthereumWallets(newWallets);
    }
  };

  const resetMnemonic = () => {
    const newMnemonic = generateMnemonic().split(" ");
    setMnemonic(newMnemonic);
    setSolanaWallets([]);
    setEthereumWallets([]);
    setActiveStep(0);
  };

  const steps = ["View Mnemonic", "Add and View Wallets"];

  const handleNext = () => {
    setActiveStep((current) => current + 1);
  };

  const handleBack = () => {
    setActiveStep((current) => current - 1);
  };

  const handleSelectWallet = (walletAddress: string, walletType: string) => {
    setSelectedWallet({wallateType: walletType, publicKey:walletAddress});
    setIsModalOpen(true)
  }

  return (
    <Box>
      <Stepper active={activeStep} onStepClick={setActiveStep}>
        <Stepper.Step label="First step" description="View your mnemonic">
          <MnemonicContainer mnemonicList={mnemonic} />
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Add and view wallets">
          <div className="flex flex-col gap-4 min-w-[600px]">
            <WalletButtons generateWallets={generateWallets} />
            <Box>
              <WalletTable
                title="Solana Wallets"
                wallets={solanaWallets}
                walletType="solana"
                handleSelectWallet={handleSelectWallet}
              />
            </Box>
            <Box>
              <WalletTable
                title="Ethereum Wallets"
                wallets={ethereumWallets}
                walletType="eth"
                handleSelectWallet={handleSelectWallet}
              />
            </Box>
          </div>
          <div className="my-4 text-sm text-gray-400"><span className="text-red-500 pb-2">*</span>Select a wallet to view your balance</div>
        </Stepper.Step>
      </Stepper>
      <StepNavigationButtons
        activeStep={activeStep}
        handleBack={handleBack}
        handleNext={handleNext}
        resetMnemonic={resetMnemonic}
        steps={steps}
      />
     <ViewWalletDetails opened={isModalOpen} onClose={handleModalClose} publicKey={selectedWallet.publicKey} walletType={selectedWallet.wallateType}/>
    </Box>
  );
};

export default Dashboard;
