import { useState } from 'react';
import type { NextPage } from 'next';
import { useAccount, useReadContract, useWatchContractEvent, useWriteContract } from 'wagmi';
import { Address, zeroAddress } from 'viem';

import Layout from '../components/Layout';
import NftViewer from '../components/NftViewer';
import Minter from '../components/Minter';
import { useToast } from '../components/Toast';

import { useMyNFT } from '../hooks/useMyNFT';

import { BUILDER_JAM_NFT_ABI } from '../abi/builder-jam-nft.abi';

const Home: NextPage = () => {
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const { data: myNFTs, refetch: refetchMyNFTs } = useMyNFT(address);

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

  useWatchContractEvent({
    address: process.env.NEXT_PUBLIC_COLLECTION_ADDRESS as Address,
    abi: BUILDER_JAM_NFT_ABI,
    eventName: 'Transfer',
    args: {
      from: zeroAddress,
      to: address,
    },
    onLogs() {
      refetchMyNFTs();
    },
  });

  return (
    <Layout>
      {myNFTs.map(({ id, metadata, token: { address } }) => (
        <NftViewer key={address + id} address={address} tokenId={id} metadata={metadata} />
      ))}
      <Minter onMint={() => handleMint()} disabled={!isConnected} />
    </Layout>
  );
};

export default Home;
