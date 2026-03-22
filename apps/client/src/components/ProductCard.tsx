"use client";

import useCartStore from "@/store/cartStore";
import { ProductType } from "@repo/types";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const { addToCart } = useCartStore();

  const [productType, setProductType] = useState({
    size:
      product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined,
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

  const handleAddToCart = () => {
    if (product.inventory === 0) {
      toast.error("Sản phẩm đã hết hàng!");
      return;
    }

    addToCart({
      ...product,
      quantity: 1,
      selectedSize: productType.size as string,
      selectedColor: productType.color as string,
    });

    toast.success("Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-black text-white">
      {/* Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[2/3]">
          <Image
            src={
              (product.images as Record<string, string>)?.[productType.color] ||
              ""
            }
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {product.inventory === 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
              Hết hàng
            </div>
          )}
        </div>
      </Link>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-3">
        {/* Name */}
        <h2 className="text-sm font-medium line-clamp-2">{product.name}</h2>

        {/* Price */}
        <p className="text-sm font-semibold opacity-90">
          {product.price.toLocaleString("vi-VN")}đ
        </p>

        {/* Colors */}
        <div className="flex gap-2">
          {product.colors.map((color) => (
            <div
              key={color}
              onClick={() => handleProductType({ type: "color", value: color })}
              className={`w-4 h-4 rounded-full border cursor-pointer ${
                productType.color === color
                  ? "border-white scale-110"
                  : "border-gray-400"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Action */}
        <div className="flex items-center justify-between mt-2">
          {/* Size */}
          {product.sizes && (
            <select
              value={productType.size}
              onChange={(e) =>
                handleProductType({ type: "size", value: e.target.value })
              }
              className="text-xs bg-white/10 border border-white/20 rounded-md px-2 py-1 backdrop-blur-sm"
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          )}

          {/* Add */}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
            disabled={product.inventory === 0}
            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-white text-black hover:bg-gray-200 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
