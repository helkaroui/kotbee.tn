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

  if(!ads) {
    return <div>Ad not found</div>;
  }

  return (
    <div className="flex flex-col gap-y-4 mt-8 mb-4 w-[700px] mx-auto justify-start items-start">
      <div className="w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">الصفحة الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/categories/livres">{ads.cat?.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/categories/livres">{ads.subCat?.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/location/Nabeul">{ads.gouvernorat}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{ads.delegation}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="w-full flex flex-row gap-x-2">
        <div className="basis-1/3 w-full h-full">
          <div className="flex flex-col justify-center items-center gap-4 rounded-xl border border-b-4 border-slate-300 w-full min-h-20 p-2">

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
              <Button variant="primary" className="w-full">رسالة</Button>
            </Link> : null
            }


          </div>
        
        </div>
        <div className="basis-2/3 h-full">
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

{/*         <Separator />

        <div className="w-full flex justify-center items-center mt-2">
          <Button size="sm" variant="dangerOutline" className="text-sm">الإبلاغ عن الإعلان</Button>
        </div> */}
        
        </div>
      </div>
    </div>
  );
}
