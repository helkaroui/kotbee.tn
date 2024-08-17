import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserById } from "@/db/queries";

type Props = {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const user = await getUserById(params.id);

  if(!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex flex-col gap-y-4 mt-8 mb-4 w-[700px] mx-auto justify-start items-start">
      <div className="w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">الصفحة الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{user.fullName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="w-full flex flex-col gap-x-2">
          <div className="my-4">
            <Card>
              <CardHeader>
                <CardTitle>الملف الشخصي</CardTitle>
              </CardHeader>
              <CardContent className="flex felx-row w-full">
                <div className="flex flex-col gap-2 min-w-40">
                  <Avatar className="w-8 h-8 mb-4">
                      <AvatarImage src={user.imageSrc!} />
                      <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p>{user?.fullName}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  );
}
