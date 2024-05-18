"use client";
import Image from 'next/image'; 
import { truncateText } from "@/utils/truncateText";
import { formatPrice } from "@/utils/formatPrice";
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
    data: any;
}


const ProductCard: React.FC<ProductCardProps> = ({ data }) => {

    const router = useRouter();


    // Calculate the average rating from the reviews data
    const productRating = data.reviews.length > 0 ?
        data.reviews.reduce((acc: number, item: any) => acc + item.rating, 0) / data.reviews.length
        : 0;

    return (
        <div onClick={() =>  router.push(`/product/${data.id}`)} className="col-span-1 cursor-pointer border-[1,2px] border-slate-200 p-2 rounded-sm transition hover:scale-105 text-center text-sm">
            <div className="flex-col flex w-full gap-1 items-center">
                <div className="aspect-square overflow-hidden relative w-full">
                    {data.images && data.images[0] && (
                        <Image
                            src={data.images[0].image}
                            alt={data.name}
                            fill
                            className="w-full h-full object-contain"
                        />
                    )}
                </div>
                <div className='mt-4'>
                    {truncateText(data.name)}
                </div>
                <div>
                    <Rating value={productRating} readOnly />
                </div>
                <div>
                    {data.reviews.length} reviews
                </div>
                <div className='font-semibold'>{formatPrice(data.price)}</div>
            </div>
        </div>
    );
};

export default ProductCard;
