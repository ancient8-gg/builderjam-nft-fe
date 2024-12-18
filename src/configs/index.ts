const TestnetConfig = {
  scan: 'https://scanv2-testnet.ancient8.gg/',
  indexer: 'https://scanv2-testnet.ancient8.gg/api/v2',
};

const MainnetConfig = {
  scan: 'https://scan.ancient8.gg/',
  indexer: 'https://scan.ancient8.gg/api/v2',
};

export const getConfigs = () => {
  return process.env.NEXT_PUBLIC_NETWORK === 'testnet' ? TestnetConfig : MainnetConfig;
};
