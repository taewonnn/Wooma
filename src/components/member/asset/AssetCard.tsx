interface IAssetCard {
  title: string;
  value: string;
  icon?: string; // string 타입으로 수정 (색상 코드 전달)
}

function AssetCard({ title, value, icon }: IAssetCard) {
  return (
    <div className="mb-3 flex items-center justify-between rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
      {/* 아이콘 */}
      <div className="mr-4 flex items-center">
        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: icon || '#ddd' }}></div>
      </div>

      <div className="flex w-full items-center justify-between">
        {/* 타이틀 */}
        <p className="text-gray-500 text-sm">{title}</p>

        {/* 금액 */}
        <p className="text-gray-800 text-lg font-bold">{value}원</p>
      </div>
    </div>
  );
}

export default AssetCard;
