import FeedCard from '../components/feed/FeedCard';
import { useDiary } from '../hooks/DiaryQuery';
import { IDiaryData } from '../types/diary';

function Feed() {
  const { isLoading, data: diaryList } = useDiary();
  // console.log('diary data:', diaryList);

  return (
    <>
      <div className="pb-20">
        <p>diary</p>

        <FeedCard diaryList={diaryList} />

        {!isLoading &&
          diaryList &&
          diaryList.map((diary: IDiaryData) => (
            <div key={diary.id}>
              <h3>{diary.title}</h3>
              <div>
                {diary.imageURL && (
                  <img src={diary.imageURL} alt="" className="w-[100px] h-[100px]" />
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Feed;
