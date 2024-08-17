import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { getUserProfile } from "@/db/queries";
import moment from "moment";

export default async function Page() {
  const user = await getUserProfile();

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col mt-8 mb-4 mx-4 w-full justify-start items-start">
      <div className="w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">الصفحة الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>ملفي الشخصي</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="w-full flex flex-col gap-x-2">
          <div className="my-4">
            <Card className="bg-slate-100">
              <CardHeader>
                <CardTitle> الملف الشخصي</CardTitle>
                
              </CardHeader>
              <CardContent>

                <div className="flex flex-row gap-2 justify-between">
                  <Avatar className="w-8 h-8 mb-4">
                      <AvatarImage src={user.imageSrc!} />
                      <AvatarFallback>AV</AvatarFallback>
                  </Avatar>

                  <p>{user.fullName}</p>

                  <Link href="/user/update">
                    <Button variant="primary">تعديل الملف الشخصي</Button>
                  </Link>
                </div>

                <div>
                  <SignOutButton redirectUrl="/">
                    <Button variant="primary">Sign out</Button>
                  </SignOutButton>
                </div>

                <Separator className="my-2" />

                <div className="m-2 flex flex-col gap-2 justify-center items-center min-h-[200px]">
                  { user.ads.length != 0 ? user.ads.map((item) => (
                    <PostCard
                      key={item.adId}
                      id={item.adId}
                      title={item.title!}
                      description={item.description!}
                      location={item.gouvernorat + ", " + item.delegation + ", " + item.localite}
                      date={item.createdAt}
                      image={item.images?.at(0) || null}
                    />
                  )) : <p className="text-slate-600">ليس لديك أي إعلان حتى الآن</p>
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  );
}

type Props = {
  id: number;
  title: string;
  description: string;
  location: string;
  date: Date;
  image: string | null;
}

const PostCard = ({ id, title, description, location, date, image }: Props) => {
  moment.locale('ar-tn');

  return (
      <div className={cn("relative flex flex-row w-full gap-x-4 p-4 border border-b-4 border-gray-200 rounded-lg hover:cursor-pointer hover:bg-gray-50 bg-white")}>
        <Link href={`/ad/${id}`} className="w-full flex flex-row gap-2">
          <div className=" bg-white rounded-lg">
            <Image src={image || "/images/placeholder.png"} alt="kotbee.tn" className="rounded-lg" height={100} width={100} />
          </div>
          <div className="flex flex-col text-md">
            <p className="font-bold">{title}</p>
            <p className="font-thin">{location}</p>
            <p className="font-thin">{moment(date).fromNow()}</p>
          </div>
        </Link>

        <DropdownMenu key={id}>
          <DropdownMenuTrigger key={id} className="h-[20px] w-[20px]">
            <EllipsisVertical size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent key={id}>
            <DropdownMenuItem>Modify</DropdownMenuItem>
            <DropdownMenuItem className="text-rose-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
  );
}