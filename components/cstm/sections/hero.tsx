"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import useMobileDetect from "@/store/use-mobile";
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input";

export default function Hero() {
    const currentDevice = useMobileDetect()

    return (
        <div
            className="w-full bg-slate-100"
        >
        <div 
            className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-col items-center justify-center p-4 gap-2"
            
            >

            <div className="static flex flex-col items-center gap-y-8 mt-4">
            <h1 className="text-4xl font-bold leading-relaxed text-[#183153] max-w-[600px] text-center">
            شاركوا لوازمكم المدرسية القديمة مع الأطفال المحتاجين
            </h1>
    
            <p className="text-lg lg:text-xl text-neutral-500 max-w-[600px] text-center">
                // قم بتوليد بعض الوصف هنا
            </p>
    
    
            <div className="flex flex-col gap-4 mt-4 mb-12 w-full justify-center items-center">
                    <Button size="lg" variant="filledYellowComic" className="w-[300px]" asChild>
                        <Link href="/post-ad">
                            أضف منشورًا
                        </Link>
                    </Button>

                    <div className="w-full flex flex-row justify-center items-center gap-x-2">
                        <Separator className="bg-slate-400" />
                        <p className="text-lg lg:text-xl text-neutral-500 max-w-[600px] text-center">
                            أو
                        </p>
                        <Separator className="bg-slate-400" />
                    </div>

                    

                    <div className="flex flex-row gap-x-2 justify-center items-center">
                        <Input className="grow w-[400px]" type="text" placeholder="ابحث عن لوازم المدرسة"  />
                        <Button size="lg" variant="whiteComic" className="w-[100px]" asChild>
                            <Link href="/search">
                            ابحث
                            </Link>
                        </Button>
                    </div>
            </div>
    
            </div>
      </div>
      </div>
    );
};