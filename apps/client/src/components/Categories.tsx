"use client";

import {
  Briefcase,
  Footprints,
  Glasses,
  HatGlasses,
  Shirt,
  ShoppingBasket,
  Snowflake,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaHatCowboy } from "react-icons/fa";
import { GiJackPlug } from "react-icons/gi";
import { HiAtSymbol } from "react-icons/hi";
import { PiPants } from "react-icons/pi";
import { TbJacket } from "react-icons/tb";

const categories = [
  {
    name: "Tất cả",
    icon: <ShoppingBasket className="w-4 h-4" />,
    slug: "all",
  },
  {
    name: "Quần",
    icon: <PiPants className="w-4 h-4" />,
    slug: "pants",
  },
  {
    name: "Áo",
    icon: <Shirt className="w-4 h-4" />,
    slug: "t-shirts",
  },
  {
    name: "Giày",
    icon: <Footprints className="w-4 h-4" />,
    slug: "shoes",
  },
  {
    name: "Phụ kiện",
    icon: <Glasses className="w-4 h-4" />,
    slug: "accessories",
  },
  {
    name: "Túi",
    icon: <Briefcase className="w-4 h-4" />,
    slug: "bags",
  },
  {
    name: "Áo khoác",
    icon: <TbJacket className="w-4 h-4" />,
    slug: "jackets",
  },
  {
    name: "Mũ",
    icon: <FaHatCowboy className="w-4 h-4" />,
    slug: "hat",
  },
];

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category");

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", value || "all");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 bg-gray-100 p-2 rounded-lg mb-4 text-sm">
      {categories.map((categories) => (
        <div
          className={`flex items-center justify-center gap-2 cursor-pointer px-2 py-1 rounded-md ${
            categories.slug === selectedCategory ? "bg-white" : "text-gray-500"
          }`}
          key={categories.name}
          onClick={() => handleChange(categories.slug)}
        >
          {categories.icon}
          {categories.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
