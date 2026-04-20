import ProductSearchClient from "@/src/components/search/ProductSearchClient";
import SearchBar from "@/src/components/search/SearchBar";
import { getProductSearch } from "@/src/lib/data/products";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const products = await getProductSearch(query);

  return (
    <div>
      <div className="mb-8">
        <SearchBar initialKeyword={query} />
      </div>

      <ProductSearchClient products={products} />
    </div>
  );
}
