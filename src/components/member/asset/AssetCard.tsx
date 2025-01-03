interface IAssetCard {
  title: string;
  value: string;
  icon?: React.ReactNode;
}

function AssetCard({ title, value, icon }: IAssetCard) {
  return (
    <div className="mb-3 flex items-center justify-between rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
      <div className="mr-4 text-xl text-blue-500">{icon}</div>
      <div className="flex-grow">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-gray-800 text-end text-lg font-bold">{value}원</p>
      </div>
    </div>
  );
}

export default AssetCard;
