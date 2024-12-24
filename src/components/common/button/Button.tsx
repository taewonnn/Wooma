interface IButton {
  title?: string; // 버튼명
  className?: string; // 스타일
  type?: 'button' | 'submit' | 'reset'; // 버튼 타입
  children?: React.ReactNode; // 버튼 안에 추가 요소
  disabled?: boolean; // 활성화 여부
  style?: React.CSSProperties; // 인라인 스타일
  onClick?: () => void; // 클릭 함수
}

export default function Button({
  title,
  className,
  type = 'button',
  children,
  disabled = false,
  style,
  onClick,
}: IButton) {
  return (
    <button
      className={`${className} ${disabled ? 'bg-gray' : ''}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={style}
    >
      {title}
      {children}
    </button>
  );
}
