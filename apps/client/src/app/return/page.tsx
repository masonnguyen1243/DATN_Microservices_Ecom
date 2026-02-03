import Link from "next/link";

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
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-xl border bg-white p-6 shadow-lg text-center">
        {/* Icon */}
        <div
          className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full
            ${
              isSuccess
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
        >
          {isSuccess ? (
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2">
          {isSuccess ? "Thanh toán thành công 🎉" : "Thanh toán thất bại"}
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          {isSuccess
            ? "Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được ghi nhận."
            : "Thanh toán chưa hoàn tất. Bạn có thể thử lại hoặc kiểm tra đơn hàng."}
        </p>

        {/* Info */}
        <div className="rounded-lg bg-gray-50 p-4 text-left text-sm mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Trạng thái đơn hàng</span>
            <span className="font-medium">{data.status}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Trạng thái thanh toán</span>
            <span
              className={`font-medium ${
                isSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {data.paymentStatus}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/orders"
            className="w-full rounded-lg bg-black py-3 text-white font-medium hover:bg-gray-800 transition"
          >
            Xem đơn hàng của tôi
          </Link>

          <Link
            href="/"
            className="w-full rounded-lg border py-3 font-medium hover:bg-gray-50 transition"
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReturnPage;
