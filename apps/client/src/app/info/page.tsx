import Link from "next/link";

const news = [
  {
    id: 1,
    title: "TẦM NHÌN - SỨ MỆNH ATINO",
    description: "Thông tin về tầm nhìn và sứ mệnh của thương hiệu",
  },
  {
    id: 2,
    title: "Hệ Thống Cửa Hàng",
    description: "Danh sách các cửa hàng trên toàn quốc",
  },
  {
    id: 3,
    title: "Chính sách bảo mật thông tin",
    description: "Cam kết bảo vệ dữ liệu khách hàng",
  },
  {
    id: 4,
    title: "Hướng dẫn mua hàng",
    description: "Cách đặt hàng nhanh chóng và dễ dàng",
  },
  {
    id: 5,
    title: "Chính sách đổi hàng",
    description: "Quy định đổi trả sản phẩm",
  },
  {
    id: 6,
    title: "Chính sách vận chuyển",
    description: "Thông tin giao hàng và phí ship",
  },
];

export default function NewsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">Tin Tức</h1>

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/">Trang chủ</Link> / Tin tức
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-5 hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg mb-2">{item.title}</h2>

            <p className="text-gray-500 text-sm mb-4">{item.description}</p>

            <Link
              href={`/info/${item.id}`}
              className="text-black font-medium hover:underline"
            >
              Xem thêm →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
