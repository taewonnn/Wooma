import { useDiary } from '../components/hooks/DiaryQuery';
import { IDiaryData } from '../types/diary';

function Home() {
  const { isLoading, data: diaryList } = useDiary();
  console.log(diaryList);
  return (
    <div className="pb-20">
      <p>Home Page - diary</p>

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
  );
}

export default Home;
