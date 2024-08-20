import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { getReplyById } from "@/db/queries";
import { redirect } from "next/navigation";
import moment from "moment";

type Props = {
  params: {
    id: number;
  };
};

export default async function Page({ params }: Props) {
  const data = await getReplyById(params.id);
  
  if(!data) {
    redirect("/");
  }

  moment.locale("ar-tn");

  return (
    <div className="flex flex-col gap-y-4 mt-8 mb-4 w-full md:w-[700px] mx-auto justify-start items-start">
      <div className="w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">الصفحة الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/ad/${params.id}`}>الإعلان الأصلي</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>الرسالة</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="w-full flex flex-row gap-x-2">
        <div className="hidden md:block basis-1/3 h-full">
          <div className="flex flex-row justify-between mt-2">
            <div>
              <h2 className="font-bold text-xl">{data.title}</h2>
              <p className="text-sm font-thin">{moment(data.createdAt).fromNow()}</p>
            </div>
          </div>
          <Separator />
          <div className="my-4">
            <p className="text-xl font-bold mb-2">الوصف:</p>
            <p className="text-md font-light">
              {data.description}
            </p>
          </div>

          <Separator />
          <div className="my-4">
            <p className="text-xl font-bold mb-2">الموقع:</p>
            <p className="text-md font-light">
              {data.gouvernorat}, {data.delegation}, {data.localite}
            </p>
          </div>
        </div>
        <div className="lg:basis-2/3 w-full h-full flex flex-col gap-2 px-2">
          <div className="flex flex-col justify-center items-start gap-4 rounded-xl border border-b-4 border-slate-300 w-full min-h-20 p-2">

            <div className="flex flex-row gap-2 justify-center items-center">
              <Link href="/profil/1">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={data.user.imageSrc!} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>

              <p className="text-xl font-semibold">{data.user.fullName}</p>
            </div>
          </div>


          <div className="flex flex-col justify-center items-center gap-4 rounded-xl border border-b-4 border-slate-300 w-full min-h-20 p-2">

              <h2 className="text-xl font-bold">ارسل رسالة إلى {data.user.fullName}</h2>

              <textarea className="w-full h-32 border border-slate-300 rounded-xl p-2" placeholder="مرحبًا تيم، أنا مهتم بإعلانك! هل ما زال متاحًا؟"></textarea>

              <Link href={"/messages"} >
                <Button className="w-full" variant="primary">
                  إرسال
                </Button>
              </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
