import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import { getRecentAds } from "@/db/queries";

export default async function Listings() {
    const recentAds = await getRecentAds();
    return (
        <div className="w-full flex flex-col pb-8 px-2">
            {recentAds.length > 0 &&
                <>
                    <div className="flex flex-row justify-between text-lg font-bold">
                        <h2>الإعلانات الأخيرة</h2>
                        <Link href="/search" className="text-sm text-blue-500">
                            عرض الكل
                        </Link>
                    </div>
                    <div className="w-full flex overflow-x-auto scroll-smooth scroll-mx-4 snap-x">
                        {recentAds.map((ads, index) => (
                            <div key={index} className="p-1">
                                {/* TODO add placeholder */}
                                <div
                                    className="relative w-[200px] h-[200px] bg-cover bg-center rounded-lg snap-center "
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

                                    <Link href={`/ad/${ads.adId}`}>
                                        <div className="absolute top-0 right-0 w-full h-full rounded-lg bg-gradient-to-t from-slate-800"></div>

                                        <CardContent className="relative flex aspect-square items-center justify-center p-6 ">
                                            <h2 className="absolute bottom-2 right-2 text-lg font-bold text-white">{ads.title}</h2>
                                            <p className="absolute top-2 right-2 text-sm font-semibold text-white">{ads.gouvernorat} - {ads.delegation}</p>
                                        </CardContent>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    );
}