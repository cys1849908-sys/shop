export default function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-400 tracking-widest uppercase mb-1">
        {subtitle}
      </p>
      <h2 className="text-2xl font-medium">{title}</h2>
    </div>
  );
}
