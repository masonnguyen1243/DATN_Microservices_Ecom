import Link from "next/link";

export default function NewsDetail() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/">Trang chủ</Link> /<Link href="/info"> Tin tức</Link> /
        <span className="text-black"> Tầm nhìn - Sứ mệnh</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">TẦM NHÌN - SỨ MỆNH ATINO</h1>

      {/* Banner Image */}
      <img
        src="https://b-f9-zpcloud.zdn.vn/5157800729041894885/322c6fe716dbca8593ca.jpg"
        alt="banner"
        className="w-full rounded-md mb-8"
      />

      {/* Content */}
      <div className="space-y-8 leading-7 text-gray-700">
        {/* Niềm tin */}
        <section>
          <h2 className="text-xl font-semibold mb-3">NIỀM TIN CỦA ATINO</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Khách hàng là trung tâm</li>
            <li>Luôn cải tiến trải nghiệm</li>
            <li>Đội ngũ nỗ lực hết sức</li>
          </ul>
        </section>

        {/* Sứ mệnh */}
        <section>
          <h2 className="text-xl font-semibold mb-3">SỨ MỆNH CỦA ATINO</h2>
          <p>
            Mang sản phẩm chất lượng nhất với giá tốt nhất đến khách hàng trên
            toàn quốc.
          </p>
        </section>

        {/* Giá trị cốt lõi */}
        <section>
          <h2 className="text-xl font-semibold mb-3">GIÁ TRỊ CỐT LÕI</h2>
          <ul className="list-decimal pl-5 space-y-2">
            <li>Đam mê phục vụ khách hàng</li>
            <li>Trung thực, trách nhiệm</li>
            <li>Chủ động, sáng tạo</li>
            <li>Yêu thương đồng đội</li>
          </ul>
        </section>

        {/* Image giữa */}
        <img
          src="https://b-f10-zpcloud.zdn.vn/8734364986202116265/f8aa9f61e65d3a03634c.jpg"
          alt="content"
          className="w-full rounded-md"
        />

        {/* Tầm nhìn */}
        <section>
          <h2 className="text-xl font-semibold mb-3">TẦM NHÌN</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Mỗi tỉnh thành đều có cửa hàng</li>
            <li>Dịch vụ vượt mong đợi</li>
            <li>Nhân viên hạnh phúc</li>
          </ul>
        </section>
      </div>

      {/* Related */}
      <div className="mt-12">
        <h3 className="font-semibold mb-4">Bài viết liên quan</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="border p-4 rounded hover:cursor-pointer hover:shadow">
            Hệ Thống Cửa Hàng
          </div>
          <div className="border p-4 rounded hover:cursor-pointer hover:shadow">
            Chính sách bảo mật
          </div>
        </div>
      </div>
    </div>
  );
}
