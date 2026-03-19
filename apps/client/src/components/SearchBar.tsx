"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = (value: string) => {
    if (!value.trim()) return; // tránh search rỗng
    const params = new URLSearchParams(searchParams);
    params.set("search", value);
    router.push(`/products?${params.toString()}`, { scroll: false });
    setValue("");
  };

  return (
    <div className="hidden sm:flex items-center w-full max-w-md">
      <div className="flex items-center w-full bg-white border border-gray-200 rounded-full px-3 py-2 shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 hover:shadow-md">
        {/* Icon search */}
        <Search className="w-4 h-4 text-gray-400 mr-2" />

        {/* Input */}
        <input
          id="search"
          placeholder="Tìm sản phẩm..."
          type="text"
          value={value}
          className="flex-1 text-sm bg-transparent outline-none placeholder:text-gray-400"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(value);
            }
          }}
        />

        {/* Clear button */}
        {value && (
          <button
            onClick={() => setValue("")}
            className="p-1 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
