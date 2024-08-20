"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import validator from "validator";
import { getUserProfileType } from "@/db/queries";
import useSWR from "swr";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z.string().refine(validator.isMobilePhone),
  dob: z.string().date(),
})

const fetcher = (url: string) => fetch(url).then((res) => res.json()).then((data) => data as getUserProfileType);
export default function Page() {
  const user = useSWR("/api/user/me", fetcher);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.data?.fullName || "empty",
      phone: user.data?.primaryPhoneNumber || "",
      dob: user.data?.dob || "",
    },
  });


  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  };

  if (user.isLoading) {
    return <div>Loading...</div>
  }

  if(user.error) {
    return <div>Something went wrong!</div>
  }

  if(user.data === undefined) {
    return <div>Unauthorized</div>
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
              <BreadcrumbLink href="/user">ملفي الشخصي</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>تحديث</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="w-full flex flex-col gap-x-2">
          <div className="my-4">
            <Card>
              <CardHeader>
                <CardTitle>تحديث تفاصيل الملف الشخصي</CardTitle>
                
              </CardHeader>
              <CardContent>
                <Avatar className="w-8 h-8 mb-4">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>اسم المستخدم</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} value={user.data?.fullName || ""} />
                          </FormControl>
                          <FormDescription>
                            هذا هو اسم العرض العام الخاص بك.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رقم الهاتف</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} dir="ltr" className="text-center" value={user.data?.primaryPhoneNumber || ""} />
                          </FormControl>
                          <FormDescription>
                            هذا هو رقم هاتفك المحمول.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>تاريخ الميلاد</FormLabel>
                          <FormControl>
                            <Input placeholder="22/04/1994" {...field} type="date"  value={user.data?.dob || ""} />
                          </FormControl>
                          <FormDescription>
                            هذا هو تاريخ ميلادك.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit">إرسال</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  );
}
