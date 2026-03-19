"use client";

import {
  Briefcase,
  Footprints,
  Glasses,
  Shirt,
  ShoppingBasket,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaHatCowboy } from "react-icons/fa";
import { PiPants } from "react-icons/pi";
import { TbJacket } from "react-icons/tb";

const categories = [
  { name: "Tất cả", icon: <ShoppingBasket className="w-4 h-4" />, slug: "" },
  { name: "Quần", icon: <PiPants className="w-4 h-4" />, slug: "jeans" },
  { name: "Áo", icon: <Shirt className="w-4 h-4" />, slug: "t-shirts" },
  { name: "Giày", icon: <Footprints className="w-4 h-4" />, slug: "shoes" },
  {
    name: "Phụ kiện",
    icon: <Glasses className="w-4 h-4" />,
    slug: "accessories",
  },
  { name: "Túi", icon: <Briefcase className="w-4 h-4" />, slug: "bags" },
  { name: "Áo khoác", icon: <TbJacket className="w-4 h-4" />, slug: "jacket" },
  { name: "Mũ", icon: <FaHatCowboy className="w-4 h-4" />, slug: "hat" },
];

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category") || "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((item) => {
          const isActive = item.slug === selectedCategory;

          return (
            <button
              key={item.name}
              onClick={() => handleChange(item.slug)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-full text-sm
                transition-all duration-200
                border
                hover:cursor-pointer
                ${
                  isActive
                    ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                }
              `}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
