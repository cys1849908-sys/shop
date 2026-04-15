export default function SizeContent({ productId }: { productId: string }) {
  return (
    <div className="px-16 py-10">
      <table className="w-full border-collapse border border-gray-200 text-sm text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="border p-2">사이즈 (cm)</th>
            <th className="border p-2">총장</th>
            <th className="border p-2">어깨</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2 font-medium text-black">S</td>
            <td className="border p-2 text-gray-600">68</td>
            <td className="border p-2 text-gray-600">45</td>
          </tr>
          <tr>
            <td className="border p-2 font-medium text-black">M</td>
            <td className="border p-2 text-gray-600">70</td>
            <td className="border p-2 text-gray-600">47</td>
          </tr>
          <tr>
            <td className="border p-2 font-medium text-black">M</td>
            <td className="border p-2 text-gray-600">70</td>
            <td className="border p-2 text-gray-600">47</td>
          </tr>
          <tr>
            <td className="border p-2 font-medium text-black">M</td>
            <td className="border p-2 text-gray-600">70</td>
            <td className="border p-2 text-gray-600">47</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
