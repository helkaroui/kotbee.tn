"use client";

import { useSearchParams } from 'next/navigation'; 
import useSWR from 'swr';

import { Button } from "@/components/ui/button";
import { searchAdsType } from "@/db/queries";
import { MapPin, Filter } from "lucide-react";
import { PostCard } from "./(components)/ad-card";
import { useState } from 'react';


const fetcher = (url: string) => fetch(url).then((res) => res.json()).then((data) => data as searchAdsType);
export default function Page() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  var url = `/api/search?page=${page}`;
  searchParams.forEach((value, key) => {
    url += `&${key}=${value}`;
  });

  const ads = useSWR(url, fetcher);

  if(!ads) {
    return <div>Loading...</div>;
  }

  if(ads.error) {
    return <div>Error: {ads.error}</div>;
  }

  if (!ads.data) {
    return <div>No data</div>;
  }

  return (
    <div className="flex flex-col mx-2 mt-8 mb-4 justify-start items-start">
      <div className="flex flex-row gap-x-4">
        <Button variant="golden">الموقع <MapPin className="mr-2"/></Button>
        <Button variant="golden">تصفية <Filter className="mr-2"/></Button>
      </div>

      <div className="flex flex-col w-full my-4">
        <p className="font-bold">الإعلانات: جميع أنحاء</p>
        <p className="font-thin">76،845،112 إعلان</p>
      </div>

      <div className="flex flex-col w-full gap-4 justify-center items-center">

        {ads.data.map((ad, i) => (
          <PostCard
            key={i}
            id={ad.adId}
            isNew={i === 1}
            title={ad.title || "عنوان"}
            description={ad.description || "وصف"}
            location={ad.gouvernorat + ", " + ad.delegation + ", " + ad.localite}
            date={ad.createdAt || "تاريخ"}
            images={ad.images || []}
          />
        ))
        }

        <Button variant="golden" className="w-[200px]"> Load More</Button>
      </div>

    </div>
  );
}
