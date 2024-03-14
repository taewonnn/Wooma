function Diary() {
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
