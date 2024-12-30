import { useEffect, useRef } from 'react';
import { KAKAO_APP_KEY } from '../../../constants/envConfig';

function KakaoMap() {
  // ref
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 카카오맵 스크립트 동적 추가
    const mapScript = document.createElement('script');
    mapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
    mapScript.async = true;

    mapScript.onload = () => {
      // 스크립트 로드 후
      const kakao = (window as any).kakao;

      kakao.maps.load(() => {
        if (!mapRef.current) return; // DOM이 없으면 초기화 중지

        const container = mapRef.current;
        const options = {
          center: new kakao.maps.LatLng(37.50963893461533, 127.05797153552354),
          level: 4,
        };

        const map = new kakao.maps.Map(container, options);

        // 마커 생성
        const markerPosition = new kakao.maps.LatLng(37.50963893461533, 127.05797153552354);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커 지도 표시
        marker.setMap(map);
      });
    };

    document.head.appendChild(mapScript);

    return () => {
      // 언마운트 시 스크립트 삭제
      document.head.removeChild(mapScript);
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="h-[400px] w-full sm:h-[300px] md:h-[400px]" // 반응형 높이 설정
      style={{
        minHeight: '300px', // 모바일 최소 높이
        maxWidth: '100%', // 가로 꽉 채움
      }}
    ></div>
  );
}

export default KakaoMap;
