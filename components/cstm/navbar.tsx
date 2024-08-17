import { Heart, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ClerkLoaded, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

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

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 z-50 w-full h-[64px] flex flex-row justify-between items-center py-2 bg-[#ffd43b] border-b-[1px] border-black shadow-xl">
            <div className="w-full mx-8 flex items-center justify-between">
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
        </nav>
    )
}
