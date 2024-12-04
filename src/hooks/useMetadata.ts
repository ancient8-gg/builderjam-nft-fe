import { useQuery } from '@tanstack/react-query';

import { Metadata } from '../types/metadata';

const DEFAULT: Metadata = {
  name: 'Ancient8 BuilderJam Participant',
  description:
    "This NFT certifies your participation in the Ancient8 BuilderJam hackathon. It's a token of your dedication to Web3 innovation and your contribution to the future of gaming.",
  image: '/images/ancient8-demon.png',
  attributes: [
    {
      trait_type: 'Hackathon',
      value: 'Ancient8 BuilderJam',
    },
    {
      trait_type: 'Participation',
      value: 'Builder',
    },
  ],
};

function ipfsResolver(uri?: string): string {
  if (!uri) throw new Error('URI is empty');
  if (uri.startsWith('ipfs://')) {
    return uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  return uri;
}

/**
 * @dev This hook fetches the NFT metadata by URI. Supports both HTTP and IPFS.
 * @param uri The metadata URI to fetch.
 * @returns Object, the NFT metadata.
 */
export const useMetadata = (uri?: string) => {
  return useQuery<Metadata>({
    queryKey: [`metadata:${uri}`],
    enabled: !!uri,
    queryFn: async () => {
      /// Fetch the metadata, resolves IPFS to HTTP if needed.
      const res = await fetch(ipfsResolver(uri));
      const data: Metadata = await res.json();
      /// Resolve IPFS to HTTP if needed.
      data.image = ipfsResolver(data.image);
      return data;
    },
    initialData: DEFAULT,
  });
};
