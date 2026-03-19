"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-between my-6">
      {/* Title + icon */}
      <div className="flex items-center gap-2 text-gray-700 font-medium">
        <SlidersHorizontal className="w-4 h-4" />
        <span>Lọc & Sắp xếp</span>
      </div>

      {/* Select */}
      <div className="relative">
        <select
          name="sort"
          id="sort"
          defaultValue={searchParams.get("sort") || "newest"}
          onChange={(e) => handleFilter(e.target.value)}
          className="
            appearance-none
            bg-white
            border border-gray-200
            rounded-full
            px-4 py-2 pr-10
            text-sm
            shadow-sm
            cursor-pointer
            transition
            hover:border-gray-300
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
          <option value="asc">Giá: Thấp → Cao</option>
          <option value="desc">Giá: Cao → Thấp</option>
        </select>

        {/* Custom arrow */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          ▼
        </span>
      </div>
    </div>
  );
};

export default Filter;
