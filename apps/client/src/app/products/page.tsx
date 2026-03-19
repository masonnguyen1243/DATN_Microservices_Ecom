import ProductList from "@/components/ProductList";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: string;
  }>;
}) => {
  const params = await searchParams;

  const category = params.category || "";
  const search = params.search || "";
  const sort = params.sort || "newest";

  return (
    <div>
      <ProductList
        category={category}
        search={search}
        sort={sort}
        params="products"
      />
    </div>
  );
};

export default ProductsPage;
