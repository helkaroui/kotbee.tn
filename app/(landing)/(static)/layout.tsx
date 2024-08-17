import Image from 'next/image'

type LayoutProps = {
    children: React.ReactNode;        
};

const Layout = ({children}: LayoutProps) => {
return (
    <div className="w-full flex flex-col items-center">
            <div className="max-w-[900px] flex-1 py-8 px-2">
                    <div className="mb-12">
                     {children}
                    </div>
            </div>
    </div>
);
};

export default Layout;