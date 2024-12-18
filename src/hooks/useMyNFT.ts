import { useQuery } from '@tanstack/react-query';
import { getConfigs } from '../configs';
import { Metadata } from '../types/metadata';

type Item = {
  id: string;
  image_url: string;
  is_unique: null;
  metadata: Metadata;
  token: {
    address: string;
  };
};

export const useMyNFT = (address?: string) => {
  const { indexer } = getConfigs();
  return useQuery({
    queryKey: ['my-nft', address],
    queryFn: async () => {
      const res = await fetch(`${indexer}/addresses/${address}/nft?type=ERC-721`);
      return (await res.json()).items as Item[];
    },
    initialData: [],
    enabled: !!address,
  });
};
