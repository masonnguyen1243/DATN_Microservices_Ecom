import ProductInteraction from "@/components/ProductInteraction";
import RelatedProducts from "@/components/RelatedProducts";
import { ProductType } from "@repo/types";
import Image from "next/image";

//Mockdata
// const product: ProductType = {
//   id: 1,
//   name: "Áo Phông Regular L.14.2851",
//   shortDescription:
//     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//   description:
//     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//   price: 99000,
//   sizes: ["s", "m", "l", "xl", "xxl"],
//   colors: ["gray", "pink", "green"],
//   images: {
//     gray: "https://pos.nvncdn.com/f4d87e-8901/ps/20240603_3HjkANRYQp.jpeg?v=1717407028",
//     pink: "https://pos.nvncdn.com/f4d87e-8901/ps/20240603_pjkETypTNY.jpeg?v=1717405982",
//     green:
//       "https://pos.nvncdn.com/f4d87e-8901/ps/20240603_H2TTnCTCkQ.jpeg?v=1717406048",
//   },
// };

const fetchProduct = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/${id}`,
  );

  const data: ProductType = await res.json();
  return data;
};

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color: string; size: string }>;
}) => {
  const { size, color } = await searchParams;

  const { id } = await params;
  const product = await fetchProduct(id);

  const selectedSize = (size || product.sizes[0]) as string;
  const selectedColor = (color || product.colors[0]) as string;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">
        {/* Images */}
        <div className="w-full lg:w-5/12 relative aspect-2/3">
          <Image
            src={
              (product.images as Record<string, string>)?.[selectedColor] || ""
            }
            alt={product.name}
            fill
            className="object-contain rounded-md"
          />
        </div>

        {/* Details */}
        <div className="w-full lg:w-7/12 flex flex-col gap-4">
          <h1 className="text-2xl font-medium">{product.name}</h1>
          <p className="text-gray-500">{product.description}</p>
          <p className="font-bold text-xl">
            {product.price.toLocaleString("vi-VN")}
            <span className="text-sm underline align-baseline ml-0.5">đ</span>
          </p>

          <ProductInteraction
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
          />

          {/* Card info */}
          <div className="flex items-center gap-2 mt-4">
            <Image
              src={"/cards.png"}
              alt="cards"
              width={50}
              height={25}
              className="rounded-md"
            />
            <Image
              src={"/stripe.png"}
              alt="stripe"
              width={50}
              height={25}
              className="rounded-md"
            />
          </div>
          <p className="text-gray-500 text-xs">
            By clicking Pay Now, you agree to our{" "}
            <span className="underline hover:text-black hover:cursor-pointer">
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span className="underline hover:text-black hover:cursor-pointer">
              Privacy Policy
            </span>
            . You authorize us to charge your card or other chosen payment
            method for the total amount show. All sales are subject to our
            return and{" "}
            <span className="underline hover:text-black hover:cursor-pointer">
              Return Policies
            </span>
          </p>
        </div>
      </div>

      <h2 className="text-black font-bold text-3xl uppercase mb-6 mt-12">
        Sản phẩm có thể bạn sẽ thích
      </h2>
      <RelatedProducts
        category={product.categorySlug || ""}
        excludeProductId={product.id}
      />
    </div>
  );
};
export default ProductPage;
