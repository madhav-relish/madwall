export const derivationPath = {
    solana: "m/44'/501'/x'/0'",
    eth: "m/44'/60'/x'/0'",
};

export type WalletType = "solana" | "eth";

export type navigationButtonProps = {
    activeStep: number,
    steps: string[],
    handleBack: () => void,
    handleNext: () => void,
    resetMnemonic: () => void

}

export type addWalletProps = {
    generateWallets: (args: 'eth' | 'solana') => void
}

export type walletProps = {
    title: string
    wallets: string[]
    walletType: string,
    handleSelectWallet: (walletAddress: string, walletType: string)=>void
}

export type mnemonicProps = {
    mnemonicList: string[];
};

export type ViewWalletDetailsProps = {
    opened: boolean;
    onClose: () => void;
    publicKey: string;
    walletType: string;
  };


