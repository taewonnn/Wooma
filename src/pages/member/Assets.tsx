import AssetCard from '../../components/member/asset/AssetCard';

function Assets() {
  const assets = [
    { title: '예금', value: '50,000', icon: '' },
    { title: '적금', value: '10,000', icon: '' },
    { title: '펀드', value: '100,000,000', icon: '' },
    { title: '투자', value: '9,555,000', icon: '' },
    { title: '기타', value: '999,999,999,999', icon: '' },
  ];

  return (
    <>
      <AssetCard title="우리 계좌" value="10000" />

      <div className="mb-20"></div>

      {assets.map((asset, index) => {
        return <AssetCard title={asset.title} value={asset.value} key={index} />;
      })}
    </>
  );
}

export default Assets;
