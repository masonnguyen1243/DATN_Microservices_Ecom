import { ProductsTypes, ProductType } from "@repo/types";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Filter from "./Filter";
import Categories from "./Categories";

//Mock data
// const products: ProductsType = [
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
//   {
//     id: 5,
//     name: "Quần Kaki Loose 30.3.QKK014",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 490000,
//     sizes: ["31", "32", "33"],
//     colors: ["white"],
//     images: {
//       white:
//         "https://pos.nvncdn.com/f4d87e-8901/ps/Quan-Kaki-Loose-30-3-QKK014.jpg?v=1766929376",
//     },
//   },
//   {
//     id: 6,
//     name: "Quần Kaki Straight 30.4.QKK018",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 450000,
//     sizes: ["29", "30", "31", "32"],
//     colors: ["black", "white"],
//     images: {
//       black:
//         "https://pos.nvncdn.com/f4d87e-8901/ps/Quan-Kaki-Straight-30-4-QKK018-Den-29.jpg?v=1765593289",
//       white:
//         "https://pos.nvncdn.com/f4d87e-8901/ps/Quan-Kaki-Straight-30-4-QKK018.jpg?v=1765592004",
//     },
//   },
//   {
//     id: 7,
//     name: "Áo Len Slim L.3.3401",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 340000,
//     sizes: ["s", "m", "l"],
//     colors: ["white", "black"],
//     images: {
//       white:
//         "https://pos.nvncdn.com/f4d87e-8901/ps/Ao-Len-Slim-L-3-3401-Trang-M.jpg?v=1758621573",
//       black:
//         "https://pos.nvncdn.com/f4d87e-8901/ps/Ao-Len-Slim-L-3-3401-Den-M.jpg?v=1758621508",
//     },
//   },
//   {
//     id: 8,
//     name: "Áo Sơ Mi Dài Loose L.1.4433",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 280000,
//     sizes: ["s", "m", "l"],
//     colors: ["blue"],
//     images: {
//       blue: "https://pos.nvncdn.com/f4d87e-8901/ps/Ao-So-Mi-Dai-Loose-L-1-4433.jpg?v=1761012922",
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

const ProductList = async ({
  category,
  params,
  sort,
  search,
}: {
  category: string;
  params: "homepage" | "products";
  sort?: string;
  search?: string;
}) => {
  const products = await fetchData({ category, sort, search, params });

  return (
    <div className="w-full mt-6">
      {params === "products" && <Categories />}

      {params === "products" && <Filter />}

      {params !== "products" && (
        <Link
          href={category ? `/products?category=${category}` : "/products"}
          className="flex justify-end mb-4 underline text-sm text-gray-500"
        >
          Tất cả sản phẩm
        </Link>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
