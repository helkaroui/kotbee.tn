import {
    Carousel,
    CarouselIndicator,
    CarouselMainContainer,
    CarouselNext,
    CarouselPrevious,
    CarouselThumbsContainer,
    SliderMainItem,
  } from "@/components/extension/carousel";

import Image from "next/image";

type Props = {
    images: string[] | null;
};

export const ImageCarousel = ({images}: Props) => {
    const imgs = images && images.length ? images : ["/img/placeholder-400.svg"];
    return (
      <Carousel dir="rtl" className="w-full">
        <CarouselPrevious />
        <CarouselNext />
        <div className="relative ">
          <CarouselMainContainer className="h-60">
            {imgs.map((img, index) => (
              <SliderMainItem key={index} className="bg-transparent">
                <div className="outline outline-1 outline-border size-full flex items-center justify-center rounded-xl bg-background">
                  <Image src={img} alt="kotbee.tn" height={400} width={400} className="w-full h-full rounded-xl drop-shadow-md" />
                </div>
              </SliderMainItem>
            ))}
          </CarouselMainContainer>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <CarouselThumbsContainer className="gap-x-1" dir="rtl">
              {imgs.map((_, index) => (
                <CarouselIndicator key={index} index={index} />
              ))}
            </CarouselThumbsContainer>
          </div>
        </div>
      </Carousel>
    );
  };
  