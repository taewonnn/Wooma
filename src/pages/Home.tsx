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
            <p>{diary.title}</p>
            <div>
              <img src="{diary.imageURL}" alt="" />
            </div>
          </div>
        ))}
    </>
  );
}

export default Home;
