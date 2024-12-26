import Img from '../img/Img';

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Img src="spinners_30.svg" alt="loading" />
        <div className="text-lg font-medium">잠시만 기다려주세요...</div>
      </div>
    </div>
  );
}
