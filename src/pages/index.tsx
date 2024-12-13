import { useState } from 'react';
import type { NextPage } from 'next';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { Address } from 'viem';

import Layout from '../components/Layout';
import NftViewer from '../components/NftViewer';
import Minter from '../components/Minter';
import { useToast } from '../components/Toast';

import { BUILDER_JAM_NFT_ABI } from '../abi/builder-jam-nft.abi';

const Home: NextPage = () => {
  const { toast } = useToast();
  const { isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const [tokenIds, setTokenIds] = useState<string[]>([]);

  const { data: tokenURI } = useReadContract({
    address: process.env.NEXT_PUBLIC_COLLECTION_ADDRESS as Address,
    abi: BUILDER_JAM_NFT_ABI,
    functionName: 'tokenURI',
    args: [0],
  });

  const handleMint = async () => {
    toast('Start minting...');
    try {
      await writeContractAsync({
        abi: BUILDER_JAM_NFT_ABI,
        address: process.env.NEXT_PUBLIC_COLLECTION_ADDRESS as Address,
        functionName: 'mint',
      });
    } catch (err) {
      toast(String(err), 'error');
    }
  };

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
      <Minter onMint={() => handleMint()} disabled={!isConnected} />
    </Layout>
  );
};

export default Home;
