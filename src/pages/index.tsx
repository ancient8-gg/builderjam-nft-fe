import { useState } from 'react';
import type { NextPage } from 'next';

import Layout from '../components/Layout';
import NftViewer from '../components/NftViewer';
import Minter from '../components/Minter';

const Home: NextPage = () => {
  const [tokenIds, setTokenIds] = useState<string[]>([]); /* Push your tokenIds here */
  const metadataUri = undefined; /* Mock, push your metadataUri here */

  return (
    <Layout>
      {tokenIds.map((tokenId) => (
        <NftViewer
          key={tokenId}
          address={process.env.NEXT_PUBLIC_COLLECTION_ADDRESS}
          tokenId={tokenId}
          metadataUri={metadataUri}
        />
      ))}
      <Minter onMint={() => {} /*Fill your mint func here*/} />
    </Layout>
  );
};

export default Home;
