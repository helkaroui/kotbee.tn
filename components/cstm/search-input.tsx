"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const MIN_SEARCH_LENGTH = 2;

export const SearchInput = () => {
    const [state, setState] = useState('');
    const router = useRouter();
  
    const handleChange = (event: any) => {
      setState(event.target.value);
    }
  
    const handleSubmit = (event: any) => {
        if(state != '' && state.length >= MIN_SEARCH_LENGTH) {
            console.log(state);
            router.push(`/search?q=${state}`);
        }
        event.preventDefault();
    }
  
    return (
    <form onSubmit={handleSubmit} className="relative">
        <Input placeholder="البحث" className="rounded-3xl min-w-[400px] border border-slate-500 text-center" value={state} onChange={handleChange} />
        <div 
            className={cn(
                "absolute top-1 left-1 w-8 h-8 bg-slate-200 rounded-full hover:cursor-pointer hover:bg-slate-300 flex justify-center items-center",
                state.length < MIN_SEARCH_LENGTH && 'opacity-50 hover:cursor-not-allowed hover:bg-slate-200'
            )}
            onClick={handleSubmit}
        >
                <Search size={20} className="stroke-slate-500" />
        </div>
    </form>
    );  
};