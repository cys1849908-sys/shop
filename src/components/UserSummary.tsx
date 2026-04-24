export default function UserSummary({
  mileage = 0,
  points = 0,
  coupons = 0,
}: {
  userName: string;
  mileage: number;
  points: number;
  coupons: number;
}) {
  return (
    <div className="bg-black text-white p-6 flex justify-around items-center rounded-sm">
      <div className="text-center">
        <p className="text-xl font-bold">{mileage.toLocaleString()}</p>
        <p className="text-xs text-gray-400">마일리지</p>
      </div>
      <div className="text-center">
        <p className="text-xl font-bold">{points}</p>
        <p className="text-xs text-gray-400">포인트</p>
      </div>
      <div className="text-center">
        <p className="text-xl font-bold">{coupons}</p>
        <p className="text-xs text-gray-400">쿠폰</p>
      </div>
    </div>
  );
}
