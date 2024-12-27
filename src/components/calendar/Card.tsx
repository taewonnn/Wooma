function Card() {
  return (
    <div className="card mx-auto mb-8 w-full overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="flex items-center space-x-3 p-3">
        <label className="w-1/3">이번 달 목표: </label>
        <input className="border-gray-300 mt-1 w-full rounded-md border px-3 py-2 shadow-sm" />
      </div>

      <div className="flex items-center space-x-3 p-3">
        <label className="w-1/3">사용금액: </label>
        <input className="border-gray-300 mt-1 w-full rounded-md border px-3 py-2 shadow-sm" />
      </div>

      <div className="flex items-center space-x-3 p-3">
        <label className="w-1/3">남은금액: </label>
        <input className="border-gray-300 mt-1 w-full rounded-md border px-3 py-2 shadow-sm" />
      </div>
    </div>
  );
}

export default Card;
