const TestnetConfig = {
  scan: 'https://scanv2-testnet.ancient8.gg/',
};

const MainnetConfig = {
  scan: 'https://scan.ancient8.gg/',
};

export const getConfigs = () => {
  return process.env.NEXT_PUBLIC_NETWORK === 'testnet' ? TestnetConfig : MainnetConfig;
};
