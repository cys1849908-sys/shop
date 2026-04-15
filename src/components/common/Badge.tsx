export default function Badge({ label }: { label: string }) {
  const getBadgeStyle = (label: string) => {
    switch (label) {
      case "BEST":
      case "인기":
        return "bg-red-100 text-red-600";
      case "NEW":
      case "최신":
        return "bg-blue-100 text-blue-600";
      case "품절":
        return "bg-gray-500 text-white";
      case "품절임박":
        return "bg-orange-100 text-orange-600";
      case "할인":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <span
      className={`px-1.5 py-0.5 text-[10px] font-bold rounded-sm ${getBadgeStyle(label)}`}
    >
      {label}
    </span>
  );
}
