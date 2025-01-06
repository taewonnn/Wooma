import { IDiaryData } from '../../../types/diary';

function FeedCard({ isLoading, diaryList }: any) {
  // console.log('props data : ', diaryList);

  return (
    <>
      {!isLoading &&
        diaryList &&
        diaryList.map((diary: IDiaryData) => (
          <div
            className="card mx-auto mb-8 w-full overflow-hidden rounded-lg bg-white shadow-lg"
            key={diary.id}
          >
            <div className="flex items-center space-x-4 p-4">
              <p>{diary.title}</p>
            </div>

            <div className="flex items-center space-x-4 p-4">
              <img
                src="/path/to/userImage.jpg"
                alt="User"
                className="h-12 w-12 rounded-full object-cover"
              />

              {diary.imageURL && (
                <img src={diary.imageURL} alt="" className="h-[300px] w-[300px]" />
              )}
            </div>

            <div className="flex items-center justify-start space-x-4 px-4 py-2">
              <button className="text-lg focus:outline-none">👍</button>
            </div>

            <p className="px-4 pb-2">{diary.content}</p>
          </div>
        ))}
    </>
  );
}
export default FeedCard;
