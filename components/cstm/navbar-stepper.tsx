import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type BtnProps = {
    href: string;
    label: string;
    icon: React.ReactNode;
}
export function NavbarBtn({ href, label, icon }: BtnProps) {
    return (
        <Link href={href} className="flex flex-col justify-center items-center min-w-[70px] p-2 hover:bg-slate-50 hover:rounded-xl hover:shadow-inner border-2 border-b-4 border-white rounded-xl">
            <p>{label}</p>
        </Link>
    )
}

export function NavbarStepper() {
    return (
        <nav className="fixed top-0 left-0 z-50 w-full flex flex-row justify-between items-center py-2 bg-[#ffd43b] border-b-[1px] border-black shadow-xl">
            <div className="w-[900px] flex flex-row justify-around items-center mx-auto">

                <Link href="/" className="flex flex-row justify-center items-center gap-2 text-xl font-bold">
                    <Image src="/logo.svg" height={35} width={35} alt="kotbi.tn"></Image>
                    kotbee.tn
                </Link>

                <div className="flex gap-x-4">
                    <NavbarBtn href="/" label="إلغاء" icon={<Heart />} />
                </div>
            </div>
        </nav>
    )
}
