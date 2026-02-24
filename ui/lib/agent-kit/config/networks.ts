export const mainnet = {
  horizonUrl: "https://horizon.stellar.org",
  sorobanRpcUrl: "https://soroban-rpc.mainnet.stellar.gateway.fm",
} as const;

export const testnet = {
  horizonUrl: "https://horizon-testnet.stellar.org",
  sorobanRpcUrl: "https://soroban-testnet.stellar.org",
} as const;

export type NetworkConfig = typeof mainnet;

const configs: Record<string, NetworkConfig> = {
  mainnet,
  testnet,
};

export function getNetworkConfig(name?: string): NetworkConfig {
  const key = (name ?? "mainnet").toLowerCase()
  return configs[key] ?? mainnet;
}
