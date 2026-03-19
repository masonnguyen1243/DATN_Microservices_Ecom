import Link from "next/link";
import ClearCartOnSuccess from "@/components/ClearCartOnSuccess";

const ReturnPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }> | undefined;
}) => {
  const session_id = (await searchParams)?.session_id;

  if (!session_id) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Không tìm thấy session thanh toán!
      </div>
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/${session_id}`,
    { cache: "no-store" },
  );

  const data = await res.json();

  const isSuccess = data.status === "complete" || data.paymentStatus === "paid";

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50">
      <ClearCartOnSuccess isSuccess={isSuccess} />

      <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl border p-8 text-center space-y-6">
        {/* Icon */}
        <div
          className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full animate-scaleIn
            ${
              isSuccess
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
        >
          {isSuccess ? (
            <svg
              className="h-10 w-10"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg
              className="h-10 w-10"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold">
          {isSuccess ? "Thanh toán thành công" : "Thanh toán thất bại"}
        </h1>

        {/* Description */}
        <p className="text-gray-600">
          {isSuccess
            ? "Đơn hàng của bạn đã được ghi nhận và đang được xử lý."
            : "Thanh toán chưa hoàn tất. Bạn có thể thử lại hoặc kiểm tra đơn hàng."}
        </p>

        {/* Info Box */}
        <div className="bg-gray-50 rounded-xl p-5 text-sm space-y-3 text-left">
          <div className="flex justify-between">
            <span className="text-gray-500">Trạng thái đơn hàng</span>
            <span className="font-medium">
              {data.status === "complete" ? "Hoàn tất" : "Chưa hoàn tất"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Thanh toán</span>
            <span
              className={`font-semibold ${
                isSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {data.paymentStatus === "paid"
                ? "Đã thanh toán"
                : "Chưa thanh toán"}
            </span>
          </div>

          {data.amount_total && (
            <div className="flex justify-between">
              <span className="text-gray-500">Số tiền</span>
              <span className="font-bold">
                {(data.amount_total / 100).toLocaleString("vi-VN")}đ
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/orders"
            className="w-full rounded-xl bg-black py-3 text-white font-medium hover:bg-gray-800 transition"
          >
            Xem đơn hàng
          </Link>

          {!isSuccess && (
            <Link
              href="/cart"
              className="w-full rounded-xl border py-3 font-medium hover:bg-gray-100 transition"
            >
              Thử lại thanh toán
            </Link>
          )}

          <Link
            href="/"
            className="w-full text-sm text-gray-500 hover:underline"
          >
            ← Về trang chủ
          </Link>
        </div>
      </div>

      {/* Animation style */}
      <style>
        {`
          .animate-scaleIn {
            animation: scaleIn 0.4s ease;
          }

          @keyframes scaleIn {
            0% { transform: scale(0.7); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default ReturnPage;
