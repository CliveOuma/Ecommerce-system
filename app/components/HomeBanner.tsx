import Image from "next/image";

const HomeBanner = () => {
    return ( 
        <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
            <div className="flex-col gap-2 mx-auto px-8 py-12 flex md:flex-row items-center justify-evenly">
                <div className="mb-8 md:mb-0 text-center">
                    <h1 className="text-4xl md:text-6xl fonnt-bold text-white mb-4">Summer Sale</h1>
                    <p className="text-lg md:text-xl text-white mb-2">Enjoy Discounts on selected items</p>
                    <p className="text-2xl md:text-5xl text-orange-400 font-bold">Get 50% discount</p>
                </div>
                <div className="w-1/3 relative aspect-video">
                    <Image src="/banner-image.png"
                    fill
                    alt="banner image"
                    className="object-contain"
                    />

                </div>
                </div>
        </div>
     );
}
 
export default HomeBanner;