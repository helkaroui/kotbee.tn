import Listings from "@/components/cstm/listings";
import Hero from "@/components/cstm/sections/hero";

export default function Page() {
  return (
      <div className="flex flex-col gap-8">
        <Hero />
        <Listings />
      </div>
  );
}
