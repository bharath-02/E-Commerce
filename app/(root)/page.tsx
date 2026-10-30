import { ProductList } from "@/components/shared/product/productList";
import { ProductCarousel } from "@/components/shared/product/productCarousel";
import ViewAllProducts from "@/components/shared/product/viewAllProducts";
import DealCountDown from "@/components/shared/countDown";
import IconBoxes from "@/components/shared/iconBoxes";
import {
  getLatestProducts,
  getFeaturedProducts,
} from "@/lib/actions/product.actions";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={latestProducts} title="Newest Arrivals" limit={8} />
      <ViewAllProducts />
      <DealCountDown />
      <IconBoxes />
    </>
  );
};

export default HomePage;
