import { auth } from "@clerk/nextjs/server";
import { OrderType } from "@repo/types";

const fetchOrders = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/user-orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.json() as Promise<OrderType[]>;
};

const OrdersPage = async () => {
  const orders = await fetchOrders();

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500">
        <p className="text-lg font-medium">Bạn chưa có đơn hàng nào</p>
        <p className="text-sm mt-2">Hãy mua sắm để tạo đơn hàng mới 🛍️</p>
      </div>
    );
  }

  console.log(orders);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Đơn hàng của tôi</h1>

      {/* ===== Desktop ===== */}
      <div className="hidden md:block overflow-hidden rounded-2xl shadow-sm border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-6 py-4">Sản phẩm</th>
              <th className="text-right px-6 py-4">Tổng tiền</th>
              <th className="text-center px-6 py-4">Trạng thái</th>
              <th className="text-center px-6 py-4">Ngày đặt</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {order.products?.map((p) => p.name).join(", ") || "-"}
                </td>

                <td className="px-6 py-4 text-right font-semibold text-gray-900">
                  {order.amount.toLocaleString("vi-VN")}đ
                </td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        order.status === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {order.status === "success"
                      ? "Thanh toán thành công"
                      : "Thanh toán thất bại"}
                  </span>
                </td>

                <td className="px-6 py-4 text-center text-gray-500">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("vi-VN")
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile ===== */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border rounded-2xl p-5 shadow-sm space-y-4"
          >
            <div className="flex justify-between items-center">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    order.status === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
              >
                {order.status === "success"
                  ? "Thanh toán thành công"
                  : "Thanh toán thất bại"}
              </span>

              <span className="text-xs text-gray-400">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("vi-VN")
                  : "-"}
              </span>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Sản phẩm</p>
              <p className="font-medium text-gray-800">
                {order.products?.map((p) => p.name).join(", ") || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Tổng tiền</p>
              <p className="text-lg font-bold text-gray-900">
                {order.amount.toLocaleString("vi-VN")}đ
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
