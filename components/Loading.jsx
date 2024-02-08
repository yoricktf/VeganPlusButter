import Image from 'next/image';
import logo from '../public/logo.svg';

const Loading = () => {
  return (
    <span className='loading'>
      <Image
        src={logo}
        alt='Vegan Plus Butter Logo'
        width={100}
        height={100}
      ></Image>
    </span>
  );
};

export default Loading;
