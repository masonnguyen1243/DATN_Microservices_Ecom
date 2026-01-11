"use client";

import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import { CartItemsType } from "@repo/types";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const steps = [
  {
    id: 1,
    title: "Giỏ hàng",
  },
  {
    id: 2,
    title: "Thông tin thanh toán",
  },
  {
    id: 3,
    title: "Phương thức thanh toán",
  },
];

//Mock data
const cartItems: CartItemsType = [
  {
    id: 1,
    name: "Quần Jeans Straight 30.1.1365",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 399000,
    sizes: ["s", "m", "l", "xl", "xxl"],
    colors: ["gray", "purple", "green"],
    images: {
      gray: "https://pos.nvncdn.com/f4d87e-8901/ps/Quan-Jeans-Straight-30-1-1365-2.jpg?v=1767808367",
      purple:
        "https://pos.nvncdn.com/f4d87e-8901/ps/Quan-Jeans-Straight-30-1-1365-2.jpg?v=1767808367",
      green:
        "https://pos.nvncdn.com/f4d87e-8901/ps/Quan-Jeans-Straight-30-1-1365-2.jpg?v=1767808367",
    },
    quantity: 1,
    selectedSize: "m",
    selectedColor: "gray",
  },
  {
    id: 2,
    name: "Quần Jeans Straight 30.1.1365",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 599000,
    sizes: ["s", "m", "l", "xl"],
    colors: ["gray", "green"],
    images: {
      gray: "https://pos.nvncdn.com/f4d87e-8901/ps/Quan-Jeans-Straight-30-1-1365-2.jpg?v=1767808367",
      green:
        "https://pos.nvncdn.com/f4d87e-8901/ps/Quan-Jeans-Straight-30-1-1365-2.jpg?v=1767808367",
    },
    quantity: 1,
    selectedSize: "l",
    selectedColor: "gray",
  },
  {
    id: 3,
    name: "Quần Jeans Straight 30.1.1365",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 699000,
    sizes: ["s", "m", "l"],
    colors: ["green", "blue", "black"],
    images: {
      green:
        "https://pos.nvncdn.com/f4d87e-8901/ps/Quan-Jeans-Straight-30-1-1365-2.jpg?v=1767808367",
      blue: "https://pos.nvncdn.com/f4d87e-8901/ps/Quan-Jeans-Straight-30-1-1365-2.jpg?v=1767808367",
      black:
        "https://pos.nvncdn.com/f4d87e-8901/ps/Quan-Jeans-Straight-30-1-1365-2.jpg?v=1767808367",
    },
    quantity: 1,
    selectedSize: "l",
    selectedColor: "black",
  },
];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState(null);

  const activeStep = parseInt(searchParams.get("step") || "1");

  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      {/* Title */}
      <h1 className="text-2xl font-medium">Giỏ hàng của bạn</h1>

      {/* Steps */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center gap-2 border-b-2 pb-4 ${
              step.id === activeStep ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full text-white p-4 flex items-center justify-center ${
                step.id === activeStep ? "bg-gray-800" : "bg-gray-200"
              }`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${
                step.id === activeStep ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>

      {/* Steps and details */}
      <div className="flex flex-col lg:flex-row gap-16 w-full">
        {/* Steps */}
        <div className="w-full lg:w-7/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          {activeStep === 1 ? (
            cartItems.map((item) => (
              // Single cart item
              <div key={item.id} className="flex items-center justify-between">
                {/* Image and details */}
                <div className="flex gap-8">
                  {/* image */}
                  <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={item.images[item.selectedColor]}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* details */}
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Số lượng: {item.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        Kích cỡ: {item.selectedSize}
                      </p>
                      <p className="text-xs text-gray-500">
                        Màu sắc: {item.selectedColor}
                      </p>
                    </div>
                    <p className="font-medium">
                      {item.price.toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                </div>
                {/* Delete button */}
                <button className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 flex items-center justify-center cursor-pointer">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeStep === 3 && shippingForm ? (
            <PaymentForm />
          ) : (
            <p className="text-sm text-gray-500">
              Please fill in shipping form to continue
            </p>
          )}
        </div>

        {/* Details */}
        <div className="w-full lg:w-5/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">
          <h2 className="font-semibold">Chi tiết</h2>
          <div className="flex flex-col gap-4">
            {/* Subtotal */}
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Tổng</p>
              <p className="font-medium">
                {cartItems
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toLocaleString("vi-VN")}
                đ
              </p>
            </div>

            {/* Shipping fee */}
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Phí giao hàng</p>
              <p className="font-medium">30.000đ</p>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Total number */}
          <div className="flex justify-between">
            <p className="text-gray-500">Số lượng</p>
            <p className="font-medium">
              {cartItems
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toLocaleString("vi-VN")}
              đ
            </p>
          </div>

          {activeStep === 1 && (
            <button
              onClick={() => router.push("/cart?step=2", { scroll: false })}
              className="w-full bg-gray-800 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-900 transition-all duration-300"
            >
              Tiếp tục
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
