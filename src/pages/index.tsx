import { useState } from 'react';
import type { NextPage } from 'next';
import { useAccount, useReadContract } from 'wagmi';
import { Address } from 'viem';

import Layout from '../components/Layout';
import NftViewer from '../components/NftViewer';
import Minter from '../components/Minter';

import { BUILDER_JAM_NFT_ABI } from '../abi/builder-jam-nft.abi';

const Home: NextPage = () => {
  const { isConnected } = useAccount();

  const [tokenIds, setTokenIds] = useState<string[]>(['1']);

  const { data: tokenURI } = useReadContract({
    address: process.env.NEXT_PUBLIC_COLLECTION_ADDRESS as Address,
    abi: BUILDER_JAM_NFT_ABI,
    functionName: 'tokenURI',
    args: [0],
  });

  return (
    <Layout>
      {tokenIds.map((tokenId) => (
        <NftViewer
          key={tokenId}
          address={process.env.NEXT_PUBLIC_COLLECTION_ADDRESS}
          tokenId={tokenId}
          metadataUri={tokenURI as string}
        />
      ))}
      <Minter onMint={() => {}} disabled={!isConnected} />
    </Layout>
  );
};

export default Home;
