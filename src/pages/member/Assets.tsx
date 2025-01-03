import { ApexOptions } from 'apexcharts';
import AssetCard from '../../components/member/asset/AssetCard';
import ReactApexChart from 'react-apexcharts';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const assets = [
  { title: '예금', value: '50,000', icon: '' },
  { title: '적금', value: '10,000', icon: '' },
  { title: '펀드', value: '100,000,000', icon: '' },
  { title: '투자', value: '9,555,000', icon: '' },
  { title: '기타', value: '999,999,999,999', icon: '' },
];

// 차트의 옵션을 설정하는 객체 - ApexOptions interface를 할당
const options: ApexOptions = {
  theme: {
    monochrome: { color: 'red' },
  },
  title: { text: '내 자산', align: 'center', style: { fontSize: '20' } },
  chart: {
    type: 'donut',
    height: 350,
  },
};

const series = [44, 55, 41, 17, 15];

function Assets() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <div className="flex justify-center">
        <ReactApexChart
          type="donut"
          options={options}
          series={series}
          width={isMobile ? 400 : 700}
        />
      </div>

      <div className="mb-20"></div>

      {assets.map((asset, index) => {
        return <AssetCard title={asset.title} value={asset.value} key={index} />;
      })}
    </>
  );
}

export default Assets;
