import { Button } from "@/components/ui/button";
import Link from "next/link";
import {EllipsisVertical} from "lucide-react";
import { cn } from "@/lib/utils";
import moment from "moment";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getFavorites } from "@/db/queries";

export default async function Page() {
  const data = await getFavorites();

  return (
    <div className="flex flex-col gap-y-4 mt-8 mb-4 mx-4 w-full justify-start items-start">
      <div className="flex flex-col w-full">
        <p className="font-bold">
          الإعلانات المفضلة
        </p>
        <p className="font-thin">{data?.length} إعلانات</p>
      </div>

      <div className="flex flex-col w-full gap-4 justify-center items-center">

        {data && data.length ? data.map((ad, index) => (
          <PostCard
            key={index}
            id={ad.adId}
            isDeleted={false}
            title={ad.ad.title!}
            description={ad.ad.description!}
            location={ad.ad.gouvernorat + ", " + ad.ad.delegation + ", " + ad.ad.localite}
            date={ad.ad.createdAt}
            image={ad.ad.images?.at(0) || null}
          />
        )) : (
          <p>لا توجد إعلانات مفضلة</p>
        )
        }
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
  isDeleted: boolean;
}

const PostCard = ({ id, title, description, location, date, image, isDeleted }: Props) => {
  moment.locale('ar-tn');

  return (
      <div className={cn("relative flex flex-row w-full gap-x-4 p-4 border border-b-4 border-gray-200 rounded-lg hover:cursor-pointer hover:bg-gray-50",
          isDeleted && "filter hover:cursor-default bg-slate-200 hover:bg-slate-200 "
      )}>
        <Link href={`/ad/${id}`} className="w-full flex flex-row gap-2">
        <Image src={image!} height={200} width={200} alt={title} />
        <div className="flex flex-col text-md">
          <p className="font-bold">{title}</p>
          <p className="font-thin">{description}</p>
          <p className="font-thin">{location}</p>
          <p className="font-thin">{moment(date).fromNow()}</p>
        </div>
        </Link>

        {isDeleted &&
            <div className="absolute -top-2 left-12 flex px-1 h-6  bg-rose-400 rounded-xl text-sm font-semibold text-white items-center justify-center">
              Deleted
            </div>
        }

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="primaryOutline" size="icon" className={ cn("absolute top-2 left-2", isDeleted && "bg-slate-200")}>
              <EllipsisVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
  );
}