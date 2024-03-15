import { useDiary } from '../components/hooks/DiaryQuery';

function Home() {
  const { isLoading, data } = useDiary();
  console.log(data);
  return (
    <>
      <p>Home Page</p>
    </>
  );
}

export default Home;
