import Css from '../styles/Component.module.css';

interface MinterProps {
  onMint: () => void;
}

const Minter: React.FC<MinterProps> = ({ onMint }) => {
  return (
    <div
      className={
        Css.nft +
        ' w-80 h-96 bg-transparent rounded-lg overflow-hidden mx-5 flex flex-col items-center justify-center hover:bg-indigo-950 cursor-pointer'
      }
    >
      <h1 className='text-9xl text-center mx-2'>?</h1>
      <p>
        <i className={Css.blinkingText}>Click to mint...</i>
      </p>
    </div>
  );
};

export default Minter;
