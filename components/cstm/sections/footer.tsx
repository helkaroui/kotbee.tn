import { Heart } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer
            className="w-full bg-[#183153] py-4 md:py-12 flex flex-row justify-start text-white"
        >
            <div className="flex flex-col lg:min-w-[1152px] lg:mx-auto justify-center">
                    <div className="flex flex-col md:flex-row mb-4 mx-4 md:mx-0">
                       <div className="basis-1/2 md:ml-4">
                         <Image src="/logo.svg" alt="kotbi.tn" height={50} width={50} />
                         <h2 className="text-lg font-bold mt-4 mb-2">
                            كتبي تونس
                         </h2>
                         <p className="mb-2 text-base">
                            كتبي هو موقع تونسي لتبادل الكتب القديمة بين الأفراد
                         </p>

                         <p className="text-nowrap text-base flex flex-row mb-4 md:mb-0">
                            صنع بحب   <span><Heart color="red" width={20} height={20} /> </span> في <a className="hover:text-[#97d1fd]" href="">تونس</a>
                         </p>
                       </div>

                       <div className="basis-1/4 flex flex-row md:flex-col gap-2 md:mr-4">
                            <h2 className="text-[#616d8a] font-bold">المساعدة</h2>
                            <a className="text-sm hover:text-[#97d1fd]" href="mailto:support@kotbi.tn">الدعم</a>
                            <a className="text-sm hover:text-[#97d1fd]" href="mailto:contact@kotbi.tn">اتصل بنا</a>
                            <a className="text-sm hover:text-[#97d1fd]" href="/faq">الأسئلة الشائعة</a>
                       </div>

                        <div className="basis-1/4 flex flex-row md:flex-col gap-2">
                            <h2 className="text-[#616d8a] font-bold">صفحات التواصل</h2>
                            <a className="text-sm hover:text-[#97d1fd]" href="">انستغرام</a>
                            <a className="text-sm hover:text-[#97d1fd]" href="">فيسبوك</a>
                            <a className="text-sm hover:text-[#97d1fd]" href="">تويتر</a>
                        </div>
                    </div>

                    <div className="flex flex-row gap-5 mx-4 md:mx-0 md:mt-12">
                        <a className="text-sm font-md hover:text-[#97d1fd]" href="/license">الترخيص</a>
                        <a className="text-sm font-md hover:text-[#97d1fd]" href="/tos">شروط الخدمة</a>
                        <a className="text-sm font-md hover:text-[#97d1fd]" href="/privacy">سياسة الخصوصية</a>
                    </div>
            </div>
        </footer>
    );

};