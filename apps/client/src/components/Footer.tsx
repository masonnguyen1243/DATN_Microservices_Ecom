import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <Image
        src={"/footer-featured.jpeg"}
        alt="Featured Product"
        width={1152}
        height={768}
        className="mt-16 rounded-lg"
      />
      <div className="mt-16 flex flex-col items-center gap-8 md:gap-0 md:flex-row md:items-start md:justify-between bg-gray-800 p-8 rounded-lg">
        <div className="flex flex-col gap-4 items-center md:items-start">
          <Link href={"/"} className="">
            <Image src="/footerlogo.png" alt="logo" width={150} height={45} />
          </Link>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Atino.
          </p>
          <p className="text-sm text-gray-400">All rights reserved.</p>
        </div>

        <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
          <p className="text-sm text-amber-50">Hỗ trợ khách hàng</p>
          <Link href={"/"}>Hướng dẫn mua hàng</Link>
          <Link href={"/"}>Hướng dẫn chọn size</Link>
          <Link href={"/"}>Phương thức thanh toán</Link>
          <Link href={"/"}>Chính sách vận chuyển</Link>
          <Link href={"/"}>Quy định đổi trả</Link>
          <Link href={"/"}>Chính sách xử lý khiếu nại</Link>
        </div>

        <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
          <p className="text-sm text-amber-50">Về chúng tôi</p>
          <Link href={"/"}>
            <span className="font-bold">HỘ KINH DOANH ATINO</span>
          </Link>
          <Link href={"/"} className="w-60.75 text-wrap">
            <span className="font-bold">Địa Chỉ</span>: Số 110 Phố Nhổn, Phường
            Tây Tựu, Quận Bắc Từ Liêm, Tp. Hà Nội
          </Link>
          <Link href={"/"}>
            <span className="font-bold">Mã Số Doanh Nghiệp</span>: 01D-8004624
          </Link>
          <Link href={"/"}>
            <span className="font-bold">Email</span> : cntt@atino.vn
          </Link>
        </div>

        <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
          <p className="text-sm text-amber-50">Hệ thống cửa hàng</p>
          <Link href={"/"} className="font-medium flex items-center gap-2">
            <Home className="h-4 w-4" />
            110 Phố Nhổn
          </Link>
          <Link href={"/"} className="font-medium flex items-center gap-2">
            <Home className="h-4 w-4" />
            1221 Giải Phóng
          </Link>
          <Link href={"/"} className="font-medium flex items-center gap-2">
            <Home className="h-4 w-4" />
            154 Quang Trung, Hà Đông
          </Link>
          <Link href={"/"} className="font-medium flex items-center gap-2">
            <Home className="h-4 w-4" />
            34 Trần Phú, Hà Đông
          </Link>
          <Link href={"/"} className="font-medium flex items-center gap-2">
            <Home className="h-4 w-4" />
            208 Bạch Mai
          </Link>
          <Link href={"/"} className="font-medium flex items-center gap-2">
            <Home className="h-4 w-4" />
            175 Chùa Bộc
          </Link>
          <Link href={"/"} className="font-medium flex items-center gap-2">
            <Home className="h-4 w-4" />
            116 Cầu Giấy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
