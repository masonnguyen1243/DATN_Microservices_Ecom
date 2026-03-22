"use client";

import useCartStore from "@/store/cartStore";
import { ProductType } from "@repo/types";
import { Minus, Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductInteraction = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: ProductType;
  selectedSize: string;
  selectedColor: string;
}) => {
  const { addToCart } = useCartStore();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      if (quantity >= product.inventory) {
        toast.error("Đã đạt số lượng tối đa trong kho!");
        return;
      }
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    if (quantity > product.inventory) {
      toast.error("Số lượng vượt quá tồn kho!");
      return;
    }

    if (product.inventory === 0) {
      toast.error("Sản phẩm đã hết hàng!");
      return;
    }

    addToCart({
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    });

    toast.success("Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* SIZE */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Kích thước</span>
          <span className="text-xs text-gray-500 underline cursor-pointer hover:text-black">
            Hướng dẫn chọn size
          </span>
        </div>

        <div className="flex gap-2">
          {product.sizes.map((size) => {
            const active = selectedSize === size;

            return (
              <button
                key={size}
                onClick={() => handleTypeChange("size", size)}
                className={`
                  w-9 h-9 text-sm rounded-md border transition
                  flex items-center justify-center hover:cursor-pointer
                  ${
                    active
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:border-black"
                  }
                `}
              >
                {size.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* COLOR */}
      <div>
        <span className="text-sm font-medium mb-2 block">Màu sắc</span>

        <div className="flex gap-3">
          {product.colors.map((color) => {
            const active = selectedColor === color;

            return (
              <button
                key={color}
                onClick={() => handleTypeChange("color", color)}
                className={`
                  w-7 h-7 rounded-full border-2 transition
                  flex items-center justify-center hover:cursor-pointer
                  ${
                    active
                      ? "border-black scale-110"
                      : "border-gray-200 hover:border-black"
                  }
                `}
                style={{ backgroundColor: color }}
              />
            );
          })}
        </div>
      </div>

      {/* QUANTITY */}
      <div>
        <span className="text-sm font-medium mb-2 block">Số lượng</span>

        <div className="flex items-center w-fit border border-gray-200 rounded-full overflow-hidden">
          <button
            onClick={() => handleQuantityChange("decrement")}
            className="px-3 py-1 hover:bg-gray-100 transition hover:cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>

          <span className="px-4 text-sm">{quantity}</span>

          <button
            onClick={() => handleQuantityChange("increment")}
            className="px-3 py-1 hover:bg-gray-100 transition hover:cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Hiển thị tồn kho */}
        <span className="text-xs text-gray-500 mt-1 block">
          Còn lại: {product.inventory}
        </span>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleAddToCart}
        disabled={product.inventory === 0}
        className="w-full py-3 rounded-xl hover:cursor-pointer bg-black text-white font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <Plus className="w-4 h-4" />
        Thêm vào giỏ
      </button>
    </div>
  );
};

export default ProductInteraction;
