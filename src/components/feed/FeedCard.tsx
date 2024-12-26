import { IDiaryData } from '../../types/diary';

function FeedCard({ isLoading, diaryList }: any) {
  // console.log('props data : ', diaryList);

  return (
    <>
      {!isLoading &&
        diaryList &&
        diaryList.map((diary: IDiaryData) => (
          <div className="card bg-white shadow-lg rounded-lg overflow-hidden w-full mx-auto mb-8" key={diary.id}>
            <div className="flex items-center space-x-4 p-4">
              <p>{diary.title}</p>
            </div>

            <div className="flex items-center space-x-4 p-4">
              <img
                src="/path/to/userImage.jpg"
                alt="User"
                className="w-12 h-12 object-cover rounded-full"
              />

              {diary.imageURL && (
                <img src={diary.imageURL} alt="" className="w-[300px] h-[300px]" />
              )}
            </div>

            <div className="flex items-center justify-start px-4 py-2 space-x-4">
              <button className="text-lg focus:outline-none">👍</button>
            </div>

            <p className="px-4 pb-2">{diary.content}</p>
          </div>
        ))}
    </>
  );
}
export default FeedCard;
