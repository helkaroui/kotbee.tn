import { Heart, Menu, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ClerkLoaded, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";

type BtnProps = {
    href: string;
    label: string;
    icon: React.ReactNode;
}
export default function NavbarBtn({ href, label, icon }: BtnProps) {
    return (
        <ClerkLoaded>
            <SignedIn>
                <Link href={href} className="flex flex-col justify-center items-center min-w-[50px] p-1 hover:bg-slate-50 hover:rounded-lg hover:shadow-inner">
                    {icon}
                    <p className="md:text-xs lg:text-md">{label}</p>
                </Link>
            </SignedIn>

            <SignedOut>
                <SignInButton mode="modal" forceRedirectUrl={href} signUpForceRedirectUrl={href}>
                    <div className="flex flex-col hover:cursor-pointer justify-center items-center min-w-[50px] p-2 hover:bg-slate-50 hover:rounded-lg hover:shadow-inner">
                        {icon}
                        <p className="md:text-xs lg:text-md">{label}</p>
                    </div>
                </SignInButton>
            </SignedOut>
        </ClerkLoaded>
    )
}


export function MobileNavBtn({ href, label, icon }: BtnProps) {
    return (
        <ClerkLoaded>
        <SignedIn>
            <Link href={href} className="flex gap-x-4 justify-center items-center min-w-[50px] p-1 hover:bg-rose-50 hover:rounded-lg hover:shadow-inner">
                {icon}
                <p className="text-lg">{label}</p>
            </Link>
        </SignedIn>

        <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl={href} signUpForceRedirectUrl={href}>
                <Link href={href} className="flex gap-x-4 justify-center items-center min-w-[50px] p-1 hover:bg-rose-50 hover:rounded-lg hover:shadow-inner">
                    {icon}
                    <p className="text-lg">{label}</p>
                </Link>
            </SignInButton>
        </SignedOut>
    </ClerkLoaded>
    );
}

export function MobileNavbar() {
    return (
        <div className="flex md:hidden relative w-full mx-8 items-center justify-center">
            <Link href="/" className="flex flex-row justify-center items-center gap-2 text-xl font-bold">
                <Image src="/logo.svg" height={35} width={35} alt="kotbi.tn"></Image>
                kotbee.tn
            </Link>

            <div className="absolute right-0">
                <Sheet>
                    <SheetTrigger asChild>
                        <div className="flex flex-col hover:cursor-pointer justify-center items-center min-w-[50px] p-2 hover:bg-slate-50 hover:rounded-lg hover:shadow-inner">
                            <Menu />
                        </div>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                        <SheetTitle>

                            <Link href="/" className="flex flex-row justify-center items-center gap-2 text-xl font-bold">
                                <Image src="/logo.svg" height={35} width={35} alt="kotbi.tn"></Image>
                                kotbee.tn
                            </Link>

                        </SheetTitle>
                        <Separator className="my-2"/>
                        </SheetHeader>
                            <div className="flex flex-col gap-4 p-4">
                                
                                <Link href="/post-ad" className="w-full">
                                    <Button variant="filledYellowComic" className="w-full">أضف منشورًا</Button>
                                </Link>

                                <Separator className="my-2"/>

                                <MobileNavBtn href="/favories" label=" المفضلة" icon={<Heart />} />
                                <MobileNavBtn href="/messages" label="الرسائل" icon={<MessageSquare />} />
                                <MobileNavBtn href="/user" label="الملف" icon={<User />} />
                            </div>
                    </SheetContent>
                    </Sheet>
            </div>
        </div>
    )
}

export function WideNavbar() {
    return (
        <div className="hidden md:flex w-full mx-8 items-center justify-between">
            <Link href="/" className="flex flex-row justify-center items-center gap-2 text-xl font-bold">
                <Image src="/logo.svg" height={35} width={35} alt="kotbi.tn"></Image>
                kotbee.tn
            </Link>

            <div className="grow"></div>

            <div className="flex gap-x-4">
                <NavbarBtn href="/favories" label=" المفضلة" icon={<Heart />} />
                <NavbarBtn href="/messages" label="الرسائل" icon={<MessageSquare />} />
                <NavbarBtn href="/user" label="الملف" icon={<User />} />
            </div>
        </div>
    )
}

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 z-50 w-full h-[64px] flex flex-row justify-between items-center py-2 bg-[#ffd43b] border-b-[1px] border-black shadow-xl">
            <WideNavbar />
            <MobileNavbar />
        </nav>
    )
}
