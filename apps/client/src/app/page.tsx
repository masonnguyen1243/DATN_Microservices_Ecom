import ProductList from "@/components/ProductList";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) {
  const category = (await searchParams).category || "";

  return (
    <div className="">
      <div className="relative aspect-3/2 mb-12">
        <Image
          src={"/featured.jpeg"}
          alt="Featured Product"
          width={1152}
          height={768}
        />
      </div>
      <h2 className="text-black font-bold text-3xl uppercase mt-16">
        Sản phẩm mới
      </h2>
      <ProductList category={category} params="homepage" />

      <h2 className="text-black font-bold text-3xl uppercase mt-16">Quần</h2>
      <ProductList category={"jeans"} params="homepage" />

      <h2 className="text-black font-bold text-3xl uppercase mt-16">Áo</h2>
      <ProductList category={"t-shirts"} params="homepage" />

      <h2 className="text-black font-bold text-3xl uppercase mt-16">
        Áo khoác
      </h2>
      <ProductList category={"jacket"} params="homepage" />

      <h2 className="text-black font-bold text-3xl uppercase mt-16">
        Giày dép
      </h2>
      <ProductList category={"shoes"} params="homepage" />

      <h2 className="text-black font-bold text-3xl uppercase mt-16">
        Balo / Túi xách
      </h2>
      <ProductList category={"bags"} params="homepage" />
    </div>
  );
}
