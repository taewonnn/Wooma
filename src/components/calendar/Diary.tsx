import React, { useState } from 'react';

function Diary() {
  /** 이미지 노출 상태 */
  const [image, setImage] = useState('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const img = event.target.files;
    if (!img) return;

    const file = img[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <form>
        <label htmlFor=""></label>
        <input type="text" />

        <label htmlFor=""></label>
        <input type="text" />

        <label htmlFor=""></label>
        <input className="w - 500 h-200" type="textarea" />

        <div className="w-64 h-64 border border-gray-200 flex items-center justify-center">
          {image ? <img src={image} alt="preview" className="max-w-full max-h-full" /> : 'No Image'}
        </div>
        <label htmlFor="fileInput">이미지:</label>
        <input onChange={handleImageChange} id="fileInput" type="file" />

        <hr />
        <button>닫기</button>
      </form>
    </>
  );
}

export default Diary;
