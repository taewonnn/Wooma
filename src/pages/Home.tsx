import { useDiary } from '../components/hooks/DiaryQuery';

function Home() {
  const { isLoading, data: diaryList } = useDiary();
  console.log(diaryList);
  return (
    <>
      <p>Home Page</p>
      <h1>diary</h1>
      <p>
        {diaryList &&
          diaryList.map((diary: any) => (
            <>
              <p>{diary.title}</p>
            </>
          ))}
      </p>
    </>
  );
}

export default Home;
