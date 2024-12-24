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
  return (
    <img
      src={src}
      alt={alt}
      className={`${className}`}
      width={width}
      height={height}
      loading={loading}
      style={style}
    />
  );
}
