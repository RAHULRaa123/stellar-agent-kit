declare global {
  interface Window {
    freighter?: {
      isConnected: () => Promise<boolean>
      getPublicKey: () => Promise<string>
      getNetwork: () => Promise<string>
      signTransaction: (transaction: string, network?: string) => Promise<string>
      signAuthEntry: (
        entryXdr: string,
        accountToSign?: string
      ) => Promise<string>
    }
  }
}

export {}