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

  console.log(orders);

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        Không tìm thấy đơn hàng nào 🧾
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Đơn hàng của tôi</h1>

      {/* ===== Desktop ===== */}
      <div className="hidden md:block overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">ID</th>
              <th className="text-left px-4 py-3">Sản phẩm</th>
              <th className="text-right px-4 py-3">Tổng tiền</th>
              <th className="text-center px-4 py-3">Trạng thái</th>
              <th className="text-center px-4 py-3">Ngày</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{order._id}</td>

                <td className="px-4 py-3">
                  {order.products?.map((p) => p.name).join(", ") || "-"}
                </td>

                <td className="px-4 py-3 text-right font-medium">
                  {order.amount.toLocaleString("vi-VN")}đ
                </td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                      ${
                        order.status === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {order.status === "success" ? "Thành công" : "Thất bại"}
                  </span>
                </td>

                <td className="px-4 py-3 text-center text-gray-500">
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
          <div key={order._id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="font-medium">{order._id}</p>
              </div>

              <span
                className={`px-2 py-1 rounded-full text-xs font-medium
                  ${
                    order.status === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
              >
                {order.status === "success" ? "Thành công" : "Thất bại"}
              </span>
            </div>

            <div className="mb-2">
              <p className="text-xs text-gray-500">Sản phẩm</p>
              <p className="text-sm">
                {order.products?.map((p) => p.name).join(", ") || "-"}
              </p>
            </div>

            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-500 text-xs">Tổng tiền</p>
                <p className="font-medium">
                  {order.amount.toLocaleString("vi-VN")}đ
                </p>
              </div>

              <div className="text-right">
                <p className="text-gray-500 text-xs">Ngày</p>
                <p>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("vi-VN")
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
