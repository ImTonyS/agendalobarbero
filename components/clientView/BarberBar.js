import Link from "next/link";

export default function BarberBar({ name, slug, barberId }) {
  return (
    <div className="px-6">
      <Link
        href={`/${slug}/${barberId}`}
        className="flex items-center gap-x-3 max-w-xl rounded-xl bg-white px-4 py-3 shadow-sm hover:shadow-lg ring-1 ring-gray-900/10"
      >
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="font-semibold">{name}</div>
      </Link>
    </div>
  );
}
