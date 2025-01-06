import { useState } from 'react';

interface IAssetCard {
  title: string; // 타입
  value: string; // 금액
  icon?: string; // 아이콘 색상
}

function AssetCard({ title, value, icon }: IAssetCard) {
  // 넓이 확장
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCard = () => {
    setIsExpanded(prev => !prev); // 클릭 시 상태 토글
  };

  return (
    <div
      className="mb-3 flex items-center justify-between rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
      onClick={toggleCard}
    >
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

      {/* 확장된 내용 */}
      {isExpanded && (
        <div className="text-gray-600 mt-4 text-sm">
          <p>여기에 추가적으로 보여질 내용을 넣을 수 있습니다.</p>
        </div>
      )}
    </div>
  );
}

export default AssetCard;
