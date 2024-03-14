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
        <input type="textarea" />

        <label htmlFor=""></label>
        <div className="display-none">이미지 영역</div>

        <label htmlFor=""></label>
        <input type="file" />

        <button>입력</button>

        <hr />
        <button>닫기</button>
      </form>
    </>
  );
}

export default Diary;
