import ProductInteraction from "@/components/ProductInteraction";
import RelatedProducts from "@/components/RelatedProducts";
import { ProductType } from "@repo/types";
import Image from "next/image";

const fetchProduct = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/${id}`,
    { cache: "no-store" },
  );

  const data: ProductType = await res.json();
  return data;
};

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color?: string; size?: string }>;
}) => {
  const { id } = await params;
  const { size, color } = await searchParams;

  const product = await fetchProduct(id);

  const selectedSize = (size || product.sizes[0]) as string;
  const selectedColor = (color || product.colors[0]) as string;

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* MAIN */}
      <div className="grid lg:grid-cols-2 gap-10 mt-12 items-start">
        {/* LEFT - IMAGE */}
        <div className="relative group">
          <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={
                (product.images as Record<string, string>)?.[selectedColor] ||
                ""
              }
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition duration-500 hover:cursor-pointer"
            />
          </div>
        </div>

        {/* RIGHT - INFO */}
        <div className="flex flex-col gap-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {/* Title */}
          <div>
            <h1 className="text-3xl font-semibold leading-snug tracking-tight">
              {product.name}
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              {product.shortDescription}
            </p>
          </div>

          {/* Price + badge */}
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-black">
              {product.price.toLocaleString("vi-VN")}đ
            </p>
          </div>

          {/* Interaction */}
          <div className="bg-gray-50 rounded-xl p-4">
            <ProductInteraction
              product={product}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
            />
          </div>

          {/* Payment */}
          <div className="flex items-center gap-3 opacity-80">
            <Image src="/cards.png" alt="cards" width={50} height={25} />
            <Image src="/stripe.png" alt="stripe" width={50} height={25} />
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-medium mb-2">Mô tả sản phẩm</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Policy */}
          <div className="text-xs text-gray-400 leading-relaxed">
            Bằng việc thanh toán, bạn đồng ý với{" "}
            <span className="underline cursor-pointer hover:text-black">
              Điều khoản
            </span>{" "}
            và{" "}
            <span className="underline cursor-pointer hover:text-black">
              Chính sách bảo mật
            </span>
            .
          </div>
        </div>
      </div>

      {/* RELATED */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Có thể bạn cũng thích</h2>

        <RelatedProducts
          category={product.categorySlug || ""}
          excludeProductId={product.id}
        />
      </div>
    </div>
  );
};

export default ProductPage;
