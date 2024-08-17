import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import { getRecentAds } from "@/db/queries";

export default async function Listings() {
    const recentAds = await getRecentAds();
    return (
        <div className="flex flex-col gap-8 pb-8 max-w-[700px] mx-auto">
            {recentAds.length > 0 &&
            <>
                <div className="flex flex-row justify-between text-lg font-bold">
                    <h2>الإعلانات الأخيرة</h2>
                    <Link href="/search" className="text-sm text-blue-500">
                        عرض الكل
                    </Link>
                </div>

                <Carousel
                    opts={{
                        align: "end",
                        direction: "rtl",
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {recentAds.map((ads, index) => (
                            <CarouselItem key={index} className="basis-1/3">
                                <div className="p-1 min-w-[200px]">
                                    {/* TODO add placeholder */}
                                    <Card 
                                        className="relative"
                                        style={{
                                            backgroundImage: `url('${ads.images ? ads.images[0] : ""}')`,
                                        }}
                                    >
                                        <Link href={`/profil/${ads.userId}`} className="absolute top-2 left-2 z-10">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src={ads.user.imageSrc!} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </Link>

                                        <Link href={ `/ad/${ads.adId}` }>
                                            <div className="absolute top-0 right-0 w-full h-full rounded-lg bg-gradient-to-t from-slate-800"></div>
                                        
                                            <CardContent className="relative flex aspect-square items-center justify-center p-6 ">
                                                <h2 className="absolute bottom-2 right-2 text-lg font-bold text-white">{ads.title}</h2>
                                                <p  className="absolute top-2 right-2 text-sm font-semibold text-white">{ads.gouvernorat} - {ads.delegation}</p>
                                            </CardContent>
                                        </Link>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNext />
                    <CarouselPrevious />
                </Carousel>
            </>
            }
        </div>
    );
}