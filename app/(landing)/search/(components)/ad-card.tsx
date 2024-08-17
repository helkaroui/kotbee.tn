"use client";

import Link from "next/link";
import moment from "moment";
import Image from "next/image";

type PostCardProps = {
    id: number;
    title: string;
    description: string;
    location: string;
    date: Date;
    images: string[];
    isNew: boolean;
  };
  
export const PostCard = ({ id, title, description, location, date, images, isNew }: PostCardProps) => {
    return (
      <Link href={`/ad/${id}`} className="w-full">
        <div className="relative flex flex-row w-full gap-x-4 p-4 border border-b-4 border-gray-200 rounded-lg hover:cursor-pointer hover:bg-gray-50">
          <Image src={images[0]} alt={title} width={100} height={100} className="rounded-lg" />
          <div className="flex flex-col text-md">
            <p className="font-bold">{title}</p>
            <p className="font-thin">{description}</p>
            <p className="font-thin">{location}</p>
            <p className="font-thin">{moment(date).locale("ar-tn").fromNow()}</p>
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