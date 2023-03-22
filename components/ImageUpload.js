import { useState } from 'react';
import Head from 'next/head'

const ImageUpload = ({ onImageSubmit, onImageChange, imageSrc, uploadData }) => {

  return (
    <div >
      <Head>
        <title>Image Uploader</title>
        <meta name="description" content="Upload your image to Cloudinary!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <h1 >
          Image Uploader
        </h1>

        <p>
          Upload your image to Cloudinary!
        </p>

        <form method="post" onChange={onImageChange} onSubmit={onImageSubmit}>
          <p>
            <input type="file" name="file" multiple />
          </p>

          <img src={imageSrc} width='200px' height='auto' />

          {imageSrc && !uploadData && (
            <p>
              <button>Upload Files</button>
            </p>
          )}

          {uploadData && (
            <p>Your Image has been uploaded</p>
          )}
        </form>
      </main>
    </div>
  )
}

export default ImageUpload
