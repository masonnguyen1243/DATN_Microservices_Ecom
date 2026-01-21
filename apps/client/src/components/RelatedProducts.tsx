import { ProductType } from "@repo/types";
import ProductCard from "./ProductCard";

//Mock data
// const products: ProductsTypes = [
//   {
//     id: 1,
//     name: "Áo Nỉ Fitted L.3.7828",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 230000,
//     sizes: ["s", "m", "l", "xl", "xxl"],
//     colors: ["brown", "white"],
//     images: {
//       brown:
//         "https://pos.nvncdn.com/f4d87e-8901/ps/Ao-Ni-Fitted-L-3-7828.jpg?v=1765861051",
//       white:
//         "https://pos.nvncdn.com/f4d87e-8901/ps/Ao-Ni-Fitted-L-3-7828-Trang-M.jpg?v=1765861103",
//     },
//   },
//   {
//     id: 2,
//     name: "Áo Nỉ Fitted L.5.7854",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 245000,
//     sizes: ["s", "m", "l", "xl"],
//     colors: ["black", "beige"],
//     images: {
//       black:
//         "https://pos.nvncdn.com/f4d87e-8901/ps/Ao-Ni-Fitted-L-4-7854-Den-M-1.jpg?v=1765276761",
//       beige:
//         "https://pos.nvncdn.com/f4d87e-8901/ps/Ao-Ni-Fitted-L-4-7854-Be-M.jpg?v=1765276827",
//     },
//   },
//   {
//     id: 3,
//     name: "Áo Nỉ Fitted L.4.7857",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 265000,
//     sizes: ["s", "m", "l"],
//     colors: ["white", "black"],
//     images: {
//       white:
//         "https://pos.nvncdn.com/f4d87e-8901/ps/Ao-Ni-Fitted-L-4-7857-Trang-M.jpg?v=1765276504",
//       black:
//         "https://pos.nvncdn.com/f4d87e-8901/ps/Ao-Ni-Fitted-L-4-7857-Den-M.jpg?v=1765276534",
//     },
//   },
//   {
//     id: 4,
//     name: "Quần Jeans Baggy 30.1.1379",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 290000,
//     sizes: ["32", "33", "34"],
//     colors: ["blue"],
//     images: {
//       blue: "https://pos.nvncdn.com/f4d87e-8901/ps/Quan-Jeans-Baggy-30-1-1379.jpg?v=1764831819",
//     },
//   },
// ];

const fetchData = async ({
  category,
  sort,
  search,
  params,
}: {
  category?: string;
  sort?: string;
  search?: string;
  params: "homepage" | "products";
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?${category ? `category=${category}` : ""}${search ? `&search=${search}` : ""}&sort=${sort || "newest"}${params === "homepage" ? "&limit=8" : ""}`,
  );

  const data: ProductType[] = await res.json();
  return data;
};

const RelatedProducts = async ({
  category,
  excludeProductId,
}: {
  category: string;
  excludeProductId?: string | number;
}) => {
  const products = await fetchData({ category });

  // Filter out the current product
  const filteredProducts = excludeProductId
    ? products.filter((product) => product.id !== excludeProductId)
    : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
export default RelatedProducts;
