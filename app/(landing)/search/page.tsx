import { Button } from "@/components/ui/button";
import { MapPin, Filter } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-4 mt-8 mb-4 w-[700px] mx-auto justify-start items-start">
      <div className="flex flex-row gap-x-4">
        <Button variant="golden">الموقع <MapPin className="mr-2"/></Button>
        <Button variant="golden">تصفية <Filter className="mr-2"/></Button>
      </div>

      <div className="flex flex-col w-full">
        <p className="font-bold">الإعلانات: جميع أنحاء</p>
        <p className="font-thin">76،845،112 إعلان</p>
      </div>

      <div className="flex flex-col w-full gap-4 justify-center items-center">

        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <PostCard
            key={i}
            id={i}
            isNew={i === 1}
            title="منشور"
            description="وصف"
            location="Grombalia, Nabeul"
            date="منذ 3 أيام"
            image="صورة"
          />
        ))
        }


        <Button variant="golden" className="w-[200px]"> Load More</Button>
      </div>

    </div>
  );
}

type PostCardProps = {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isNew: boolean;
};

const PostCard = ({ id, title, description, location, date, image, isNew }: PostCardProps) => {
  return (
    <Link href={`/ad/${id}`} className="w-full">
      <div className="relative flex flex-row w-full gap-x-4 p-4 border border-b-4 border-gray-200 rounded-lg hover:cursor-pointer hover:bg-gray-50">
        <div className="w-[100px] h-[100px] bg-gray-300 rounded-lg"></div>
        <div className="flex flex-col text-md">
          <p className="font-bold">{title}</p>
          <p className="font-thin">{description}</p>
          <p className="font-thin">{location}</p>
          <p className="font-thin">{date}</p>
        </div>

        {isNew &&
            <div className="absolute -top-2 left-8 flex w-12 h-6  bg-rose-400 rounded-xl text-sm font-semibold text-white items-center justify-center">
              New
            </div>
        }
      </div>
    </Link>
  );
}