import { useDiary } from '../components/hooks/DiaryQuery';

function Home() {
  const { isLoading, data: diaryList } = useDiary();
  console.log(diaryList);
  return (
    <>
      <p>Home Page - diary</p>

      {diaryList &&
        diaryList.map((diary: any) => (
          <div key={diary.id}>
            <h3>{diary.title}</h3>
            <div>
              {diary.imageURL && (
                <img src={diary.imageURL} alt="" className="w-[100px] h-[100px]" />
              )}
            </div>
          </div>
        ))}
    </>
  );
}

export default Home;
