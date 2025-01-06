import { ApexOptions } from 'apexcharts';
import AssetCard from '../../components/member/asset/AssetCard';
import ReactApexChart from 'react-apexcharts';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { assetTypes } from '../../constants';
import { formatNumber } from '../../constants/common';

// @todo mock
const assets = [
  { title: '예금', value: '50000', icon: '' },
  { title: '적금', value: '10000', icon: '' },
  { title: '펀드', value: '100000000', icon: '' },
  { title: '투자', value: '9555000', icon: '' },
  { title: '기타', value: '999999999', icon: '' },
];

// 차트의 옵션을 설정하는 객체
const options: ApexOptions = {
  title: { text: '내 자산', align: 'center', style: { fontSize: '20' } },
  chart: {
    type: 'donut',
    height: 350,
  },
  series: [999999999, 100000000, 9555000, 50000, 10000], // 실 데이터
  labels: assetTypes,
  dataLabels: {
    enabled: true,
    formatter: val => {
      return val + '%';
    },
  },
};

function Assets() {
  return (
    <>
      <div className="flex justify-center">
        <ReactApexChart type="donut" options={options} series={options.series} width={400} />
      </div>

      <div className="mb-20"></div>

      {assets.map((asset, index) => {
        return <AssetCard title={asset.title} value={formatNumber(asset.value)} key={index} />;
      })}
    </>
  );
}

export default Assets;
