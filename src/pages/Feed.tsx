import FeedCard from '../components/feed/FeedCard';
import { useDiary } from '../hooks/DiaryQuery';

function Feed() {
  const { isLoading, data: diaryList } = useDiary();
  // console.log('diary data:', diaryList);

  return (
    <>
      <div className="pb-20">
        <p>diary</p>
        <FeedCard isLoading={isLoading} diaryList={diaryList} />
      </div>
    </>
  );
}

export default Feed;
