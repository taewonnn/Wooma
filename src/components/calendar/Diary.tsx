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
    <div className="pb-20">
      <form>
        <label htmlFor="title">타이틀 : </label>
        <input type="text" id="title" />

        <label htmlFor="content">내용: </label>
        <input className="w-full h-64 border border-gray-200" type="textarea" id="content" />

        <div className="w-full h-64 border border-gray-200 flex items-center justify-center">
          {image ? <img src={image} alt="preview" className="max-w-full max-h-full" /> : ''}
        </div>
        <label htmlFor="fileInput">이미지:</label>
        <input onChange={handleImageChange} id="fileInput" type="file" />

        <hr />
        <button>닫기</button>
      </form>
    </div>
  );
}

export default Diary;
