import { useDiary } from '../components/hooks/DiaryQuery';

function Home() {
  const { isLoading, data } = useDiary();
  return (
    <>
      <p>Home Page</p>
    </>
  );
}

export default Home;
