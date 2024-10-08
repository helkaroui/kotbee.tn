import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ImageCarousel } from "@/components/cstm/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { getAdById } from "@/db/queries";
import { Time } from "./(components)/time";
import { auth } from "@clerk/nextjs/server";

type Props = {
  params: {
    id: number;
  };
};

export default async function Page({ params }: Props) {
  const user = await auth();
  const ads = await getAdById(params.id);

  if (!ads) {
    return <div>Ad not found</div>;
  }

  return (
    <div className="flex flex-col mt-8 mb-4 px-4 lg:w-[700px] mx-auto justify-start items-start">
      <div className="w-full mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">الصفحة الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/search?category=${ads.category}`}>{ads.cat?.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/search?subcategory=${ads.subCategory}`}>{ads.subCat?.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/search?gouvernorat=${ads.gouvernorat}`}>{ads.gouvernorat}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/search?delegation=${ads.delegation}`}>{ads.delegation}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="w-full flex flex-col-reverse gap-4 md:flex-row">
        <div className="md:basis-1/3 w-full">
          <div className="flex flex-col gap-4 rounded-xl border border-b-4 border-slate-300 w-full p-2">
            <h1 className="text-lg font-bold mb-4">صاحب المنشور</h1>
            <div className="flex flex-row md:flex-col gap-4 justify-between items-center">
              <div className="flex flex-row gap-2 justify-center items-center">
                <Link href={`/profil/${ads.userId}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={ads.user.imageSrc!} />
                    <AvatarFallback>{ads.user.userName?.at(0)}</AvatarFallback>
                  </Avatar>
                </Link>

                <p className="text-xl font-semibold">{ads.user.fullName}</p>
              </div>

              {!user || user.userId != ads.userId ? <Link href={`/reply/${ads.adId}`}>
                <Button variant="primary" className="w-full">أرسل رسالة نصية</Button>
              </Link> : null
              }
            </div>
          </div>

        </div>
        <div className="flex flex-col md:basis-2/3 w-full px-2">
          <ImageCarousel images={ads.images} />
          <div className="flex flex-row justify-between mt-2">
            <h2 className="font-bold text-xl">{ads.title}</h2>
            <p className="text-sm font-thin">
              <Time d={ads.createdAt} />
            </p>
          </div>
          <Separator />
          <div className="my-4">
            <p className="text-md font-light">
              {ads.description}
            </p>
          </div>

          <Separator />
          <div className="my-4">
            <p className="text-xl font-bold mb-2">الموقع:</p>
            <p className="text-md font-light">
              {ads.gouvernorat}، {ads.delegation}، {ads.localite}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
