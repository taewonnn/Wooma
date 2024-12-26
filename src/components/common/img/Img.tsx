import React from 'react';

interface IImg {
  src: string;
  alt?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  loading?: 'lazy' | 'eager';
  style?: React.CSSProperties;
}

export default function Img({
  src,
  alt = 'Image',
  className = '',
  width,
  height,
  loading = 'lazy',
  style,
}: IImg) {
  const basePath = '/src/assets'; // 기본 경로 설정

  return (
    <img
      src={`${basePath}/${src}`}
      alt={alt}
      className={`${className}`}
      width={width}
      height={height}
      loading={loading}
      style={style}
    />
  );
}
