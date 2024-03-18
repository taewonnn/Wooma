import { IDiaryData } from '../../types/diary';

function FeedCard({ isLoading, diaryList }: any) {
  console.log('props data : ', diaryList);
  return (
    <>
      {!isLoading &&
        diaryList &&
        diaryList.map((diary: IDiaryData) => (
          <div className="card bg-white shadow-lg rounded-lg overflow-hidden w-full mx-auto mb-8">
            <div className="flex items-center space-x-4 p-4">
              <img
                src="/path/to/userImage.jpg"
                alt="User"
                className="w-12 h-12 object-cover rounded-full"
              />
              <p className="font-bold">{diary.memberId}</p>

              <img
                src="https://images.unsplash.com/photo-1710595638861-a6f9680649b6?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-full"
              />
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
