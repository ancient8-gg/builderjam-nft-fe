import clsx from 'clsx';

import Css from '../styles/Component.module.css';

interface MinterProps {
  onMint: () => void;
  disabled?: boolean;
}

const Minter: React.FC<MinterProps> = ({ onMint, disabled = false }) => {
  return (
    <div
      className={clsx(
        Css.nft,
        'w-80 h-96 bg-transparent rounded-lg overflow-hidden mx-5 flex flex-col items-center justify-center hover:bg-indigo-950',
        !disabled && 'cursor-pointer'
      )}
      onClick={() => onMint()}
    >
      <h1 className='text-9xl text-center mx-2'>?</h1>
      <p>
        <i className={Css.blinkingText}>Click to mint...</i>
      </p>
    </div>
  );
};

export default Minter;
