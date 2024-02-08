import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const ImageUpload = ({
  onImageSubmit,
  onImageChange,
  imageSrc,
  uploadData,
  images,
}) => {
  return (
    <fieldset>
      <legend>Image Uploader</legend>
      <p>Select the images you want to upload</p>
      <form method='post' onChange={onImageChange} onSubmit={onImageSubmit}>
        <p>
          <input type='file' name='file' multiple />
        </p>
        {imageSrc.map((link, index) => (
          <Image
            key={index}
            alt={`image to upload number ${index}`}
            src={link}
            width='150'
            height='150'
          />
        ))}
        {imageSrc.length > 0 && !uploadData && (
          <>
            <p>
              🚨🚨 Please make sure to upload the images IF YOU HAVE MADE
              CHANGES 🚨🚨
            </p>
            <button className='button upload'>UPLOAD IMAGES</button>
          </>
        )}
        {uploadData && (
          <p>🎉🎉🎉 Your Image has been Successfully uploaded 🎉🎉🎉</p>
        )}
      </form>
    </fieldset>
  );
};

export default ImageUpload;
