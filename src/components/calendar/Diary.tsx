import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Diary({ closeModal }: { closeModal: () => void }) {
  /** 이미지 노출 상태 */
  const [image, setImage] = useState('');

  /** 이미지 보여주기 함수 */
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const img = event.target.files;
    if (!img) return;

    const file = img[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const url = reader.result as string;
      setImage(url);
      setValue('imageURL', url);
    };

    reader.readAsDataURL(file);
  };

  /** useForm */
  const { register, watch, setValue, handleSubmit } = useForm();

  /** validation 완료 이후 */
  const onValid = () => { };
  
  /** @todo modal 변경 */

  console.log(watch());
  return (
    <div className="pb-20">
      <form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="title">타이틀 : </label>
        <input {...register('title')} type="text" id="title" />

        <label htmlFor="content">내용: </label>
        <input
          {...register('content')}
          className="w-full h-64 border border-gray-200"
          type="textarea"
          id="content"
        />

        <label htmlFor="imageURL">이미지:</label>
        <div className="w-full h-64 border border-gray-200 flex items-center justify-center">
          {image ? <img src={image} alt="preview" className="max-w-full max-h-full" /> : ''}
        </div>
        <input {...register('imageURL')} onChange={handleImageChange} id="imageURL" type="file" />

        <hr />
        <button onClick={closeModal}>닫기</button>
      </form>
    </div>
  );
}

export default Diary;
