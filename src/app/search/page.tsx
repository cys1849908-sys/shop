import ProductSearchClient from "@/src/components/search/ProductSearchClient";
import SearchBar from "@/src/components/search/SearchBar";
import { getProductSearch } from "@/src/lib/data/products";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  console.log(searchParams);
  const products = await getProductSearch(q);

  return (
    <div>
      <div className="mb-8">
        <SearchBar initialKeyword={q} />
      </div>

      <ProductSearchClient products={products} />
    </div>
  );
}
