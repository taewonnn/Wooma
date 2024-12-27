function Header() {
  return (
    <div className="flex items-center justify-between bg-main p-4 text-white md:p-6">
      {/* 로고 */}
      <div className="text-lg font-bold md:text-2xl">Wooma</div>

      {/* 검색창 (모바일 숨김) */}
      <div className="hidden md:flex">
        <input type="text" placeholder="Search..." className="rounded-md p-2 text-black" />
      </div>
    </div>
  );
}

export default Header;
