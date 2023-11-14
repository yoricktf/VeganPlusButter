import Image from 'next/image';

const Loading = () => {
  return (
    <span className='loading'>
      <Image
        src='./logo.svg'
        alt='Vegan Plus Butter Logo'
        width={100}
        height={100}
      ></Image>
    </span>
  );
};

export default Loading;
