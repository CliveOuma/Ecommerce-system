export const revalidate = 0;

import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IProductsParams } from "@/actions/getProducts";
import NullData from "./components/NullData";
import OfflineDetector from "./components/OfflineDetector";

interface HomeProps{
  searchParams: IProductsParams
}

export default async function Home({searchParams}: HomeProps) {
  const products = await getProducts(searchParams)

  if(products.length === 0 ) {
    return <NullData title="Oops! No products"/>
  }
  
  //shufffle products algorithm

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];  // swap elements
    }
    return array;
}

  const shufffleProducts = shuffleArray(products)

  return (
    <div className="p-8">
      <Container>
        
        <HomeBanner />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shufffleProducts.map((product: any, index: number) => ( 
            <ProductCard key={index} data={product} /> 
          ))}
        </div>
      </Container>
    </div>
  );
}                  