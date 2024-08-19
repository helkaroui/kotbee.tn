import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator"
import { getCategories, getSubCategories } from "@/db/queries";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/cstm/search-input";

export default async function Hero() {
    const categories = await getCategories();
    const subcategories = await getSubCategories();

    return (
        <div
            className="w-full bg-slate-100"
        >
            <div
                className="lg:max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-col items-center justify-center p-4 gap-2"

            >

                <div className="static flex flex-col items-center gap-y-8 mt-4">
                    <h1 className="text-4xl font-bold leading-relaxed text-[#183153] max-w-[600px] text-center">
                        شاركوا لوازمكم المدرسية القديمة مع الأطفال المحتاجين
                    </h1>

                    <p className="text-lg lg:text-xl text-neutral-500 max-w-[600px] text-center">
                        قم بتوليد بعض الوصف هنا
                    </p>


                    <div className="flex flex-col gap-4 mt-4 mb-12 w-full justify-center items-center">
                        <Button size="lg" variant="filledYellowComic" className="w-[300px]" asChild>
                            <Link href="/post-ad">
                                أضف منشورًا
                            </Link>
                        </Button>

                        <Separator className="bg-slate-400" />
                        <p className="text-lg lg:text-xl text-neutral-500 max-w-[600px] text-center">
                            أو ابحث عن ما تحتاجه
                        </p>
                        <div className="flex flex-row my-2 justify-center items-center">
                            <SearchInput />
                        </div>

                        <div className="flex flex-wrap max-w-[500px] md:max-w-[600px]  gap-2 justify-center items-center">
                            {
                                categories.map((category) => (
                                    <Link key={category.id} href={`/search?category=${category.id}`}>
                                        <Badge variant="tag">{category.title}</Badge>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
