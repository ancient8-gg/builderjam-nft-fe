import { getConfigs } from '../configs';
import { useMetadata } from '../hooks/useMetadata';
import Css from '../styles/Component.module.css';

interface NftViewerProps {
  address?: string;
  tokenId?: string;
  metadataUri?: string;
}

const NftViewer: React.FC<NftViewerProps> = ({ address = '', tokenId = '', metadataUri }) => {
  const isAvailable = !!address && !!tokenId && !!metadataUri;
  const {
    data: { name, image },
  } = useMetadata(metadataUri);

  function openScan() {
    const { scan } = getConfigs();
    if (!isAvailable) return;
    window.open(`${scan}token/${address}/instance/${tokenId}`, '_blank');
  }

  return (
    <div className={Css.nft + ' relative w-80 h-96 bg-transparent rounded-lg overflow-hidden mx-5'}>
      <img src={image} alt='NFT Image' className='w-full h-full object-cover' />
      <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 rounded-b-lg'>
        <h2 className={`text-2xl font-bold ${isAvailable ? 'cursor-pointer' : ''}`} onClick={() => openScan()}>
          {name}
          <p className='text-lime-500'># {tokenId}</p>
        </h2>
      </div>
    </div>
  );
};

export default NftViewer;
