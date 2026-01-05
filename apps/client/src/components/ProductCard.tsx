"use client";

import { ProductType } from "@repo/types";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productType, setProductType] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductType((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {/* Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-2/3 hover:scale-105 transition-all duration-300">
          <Image
            src={product.images[productType.color]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      {/* Product details */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>
        {/* Product types */}
        <div className="flex items-center gap-4 text-xs">
          {/* Sizes */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Kích cỡ</span>
            <select
              name="size"
              id="size"
              onChange={(e) =>
                handleProductType({ type: "size", value: e.target.value })
              }
              className="ring ring-gray-300 rounded-md px-2 py-1 "
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          {/* Colors */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Màu sắc</span>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <div
                  className={`cursor-pointer border rounded-full p-[1.2px] ${
                    productType.color === color
                      ? "border-gray-400"
                      : "border-gray-200"
                  }`}
                  key={color}
                  onClick={() =>
                    handleProductType({ type: "color", value: color })
                  }
                >
                  <div
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price and add to cart */}
        <div className="flex items-center justify-between">
          <p className="font-bold">
            {product.price.toLocaleString("vi-VN")}
            <span className="text-sm underline align-baseline ml-0.5">đ</span>
          </p>
          <button className="ring-1 ring-gray-200 shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white hover:bg-black transition-all duration-300 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
