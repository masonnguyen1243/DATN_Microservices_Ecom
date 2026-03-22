import EditProductForm from "@/components/EditProductForm";
import { ProductType } from "@repo/types";

const getProduct = async (id: string): Promise<ProductType> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/${id}`,
    { cache: "no-store" },
  );

  console.log(res);
  return res.json();
};

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return <EditProductForm product={product} />;
}
