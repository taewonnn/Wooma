import { useState } from 'react';

interface IAssetCard {
  title: string; // 타입
  value: string; // 금액
  icon?: string; // 아이콘 색상
}

function AssetCard({ title, value, icon }: IAssetCard) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCard = () => {
    console.log('!!', isExpanded);
    setIsExpanded(prev => !prev);
  };

  return (
    <div
      className={`mb-3 overflow-hidden rounded-lg bg-white p-4 shadow-md transition-all duration-300 ${
        isExpanded ? 'max-h-40' : 'max-h-20'
      }`}
      onClick={toggleCard}
    >
      <div className="flex items-center justify-between">
        <div className="mr-4 flex items-center">
          {/** 아이콘 */}
          <div
            className="mr-2 h-4 w-4 rounded-full"
            style={{ backgroundColor: icon || '#ddd' }}
          ></div>

          {/** 타이틀 */}
          <p className="text-gray-500 text-sm">{title}</p>
        </div>

        {/** 금액 */}
        <p className="text-gray-800 text-lg font-bold">{value}원</p>
      </div>

      {/** 확장 ui */}
      <div
        className={`mt-4 text-right text-sm transition-opacity duration-300 ${
          isExpanded ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={e => e.stopPropagation()} // 이벤트 전파 차단
      >
        <label htmlFor="amount" className="hidden">
          금액
        </label>
        <input
          id="amount"
          type="number"
          placeholder="금액을 입력해주세요."
          className="border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>
    </div>
  );
}

export default AssetCard;
