import ShirtList from "@/components/ProductList";
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
          src={"/featured.png"}
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
      <ProductList category={category} params="homepage" />

      <h2 className="text-black font-bold text-3xl uppercase mt-16">Áo</h2>
      <ShirtList category={"t-shirts"} params="homepage" />
    </div>
  );
}
