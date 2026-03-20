"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        {/* Icon */}
        <div className="text-red-500 text-5xl mb-4">🚫</div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Không có quyền truy cập
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-6">
          Bạn không có quyền truy cập vào trang này. Vui lòng đăng nhập bằng tài
          khoản phù hợp.
        </p>

        {/* Button */}
        <Button
          className="w-full cursor-pointer"
          variant="destructive"
          onClick={() => signOut()}
        >
          Đăng xuất
        </Button>
      </div>
    </div>
  );
};

export default Page;
