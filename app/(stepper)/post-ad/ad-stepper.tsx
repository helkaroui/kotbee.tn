"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Step, Stepper, useStepper } from "@/components/extension/stepper";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useMemo, useState } from "react";
import useSWR from 'swr';
import { getCategoriesType } from "@/db/queries";
import MultiImageUploader from "@/components/extension/multi-image-uploader";

const steps = [
	{ label: "عنوان الإعلان", description: "اختر عنوانًا لإعلانك" },
	{ label: "وصف الإعلان", description: "اختر وصفًا" },
	{ label: "عنوان السكن", description: "حدد عنوانك" },
	{ label: "إضافة صور", description: "إضافة صورة (اختياري)" },
];

type FormData = {
	title: string;
	description: string;
	category: string;
	categoryId: number;
	subcategory: string;
	subcategoryId: number;
	subcategoryLabel: string | null;
	subcategories: subCategoryType[];
	gouvernorat: string;
	delegation: string;
	delegations: string[];
	localite: string;
	localites: string[];
	showPhone: boolean;
	images: File[];
};

export default function StepperForm() {
	const [data, setData] = useState({
		title: "",
		description: "",
		category: "",
		categoryId: 0,
		subcategory: "",
		subcategoryId: 0,
		subcategoryLabel: null,
		subcategories: [],
		gouvernorat: "",
		delegation: "",
		delegations: [],
		localite: "",
		localites: [],
		showPhone: false,
		images: [],
	} as FormData);

	const setFormData = (data: FormData) => {
		setData((prevData) => ({
			...prevData,
			...data,
		}));
	};

	return (
		<div className="flex w-full flex-col m-2">
			<Stepper variant="circle-alt" initialStep={0} steps={steps}>
				{steps.map((stepProps, index) => {
					if (index === 0) {
						return (
							<Step key={stepProps.label} {...stepProps}>
								<FirstStepForm data={data} setFormData={setFormData} />
							</Step>
						);
					}
					if (index === 1) {
						return (
							<Step key={stepProps.label} {...stepProps}>
								<SecondStepForm data={data} setFormData={setFormData} />
							</Step>
						)
					}
					if (index === 2) {
						return (
							<Step key={stepProps.label} {...stepProps}>
								<GeolocationStepForm data={data} setFormData={setFormData} />
							</Step>
						)
					}
					if (index === 3) {
						return (
							<Step key={stepProps.label} {...stepProps}>
								<ThirdStepForm data={data} setFormData={setFormData} />
							</Step>
						)
					}
				})}
				<MyStepperFooter data={data} />
			</Stepper>
		</div>
	);
}

const FirstFormSchema = z.object({
	title: z.string().min(3, {
		message: "يجب أن يكون العنوان على الأقل 3 أحرف.",
	}),
});

type StepType = {
	data: FormData,
	setFormData: (data: FormData) => void
}

function FirstStepForm({ data, setFormData }: StepType) {
	const { nextStep } = useStepper();

	const form = useForm<z.infer<typeof FirstFormSchema>>({
		resolver: zodResolver(FirstFormSchema),
		defaultValues: {
			title: data.title,
		},
	});

	function onSubmit(_data: z.infer<typeof FirstFormSchema>) {
		setFormData({ ...data, title: _data.title });
		nextStep();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="mx-2">
							<FormLabel>ما هو عنوان إعلانك؟</FormLabel>
							<FormControl>
								<Input placeholder="اكتب عنوانًا مختصرًا هنا" {...field} dir="rtl" />
							</FormControl>
							<FormDescription>
								هذا هو عنوان إعلانك.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<StepperFormActions />
			</form>
		</Form>
	);
}

const SecondFormSchema = z.object({
	description: z.string().max(50, {
		message: "يجب ألا يقل الوصف عن 50 حرفًا.",
	}).optional(),
	category: z.string().min(1, {
		message: "يجب تحديد الفئة.",
	}),
	subcategory: z.string().min(1, {
		message: "يجب تحديد النوع.",
	}),
	showPhone: z.boolean(),
});

const GeolocationFormSchema = z.object({
	gouvernorat: z.string().min(2, {
		message: "يجب تحديد الولاية.",
	}),
	delegation: z.string().min(2, {
		message: "يجب تحديد المعتمدية.",
	}),
	localite: z.string().min(2, {
		message: "يجب تحديد المدينة.",
	})
});

type LocationType = {
	[x: string]: {
		delegation: string;
		localite: string;
		cp: string;
	}[]
};

type subCategoryType = {
	title: string;
	createdAt: Date;
	id: number;
	categoryId: number;
};
const locationFetcher = (url: string) => fetch(url).then(r => r.json()).then((data) => data as LocationType)
const categoriesFetcher = (url: string) => fetch(url).then(r => r.json()).then((data) => data as getCategoriesType)

function SecondStepForm({ data, setFormData }: StepType) {
	const { nextStep } = useStepper();
	const categories = useSWR('/api/categories', categoriesFetcher);

	const form = useForm<z.infer<typeof SecondFormSchema>>({
		resolver: zodResolver(SecondFormSchema),
		defaultValues: {
			...data,
		},
	});

	function onSubmit(_data: z.infer<typeof SecondFormSchema>) {
		setFormData({ ...data, ..._data });
		nextStep();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel>الفئة</FormLabel>
							<Select defaultValue={field.value} onValueChange={(v) => {
								const t = categories.data?.find((c) => c.title === v)?.subCategories || [];
								const category = categories.data?.find((c) => c.title === v)
								const categoryId = category?.id || 0;
								const subcategoryLabel = category?.subCategoryTitle || null;
								setFormData({ ...data, categoryId, subcategories: t, subcategoryLabel });
								field.onChange(v)
							}} dir="rtl">
								<FormControl>
									<SelectTrigger className="min-w-[150px]">
										<SelectValue placeholder="" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{
										categories.data?.map((c) => (
											<SelectItem key={c.id} value={c.title}>{c.title}</SelectItem>
										))
									}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{ form.control._formValues["category"] != "" && data.subcategoryLabel && <FormField
					control={form.control}
					name="subcategory"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{data.subcategoryLabel}</FormLabel>
							<Select defaultValue={field.value} onValueChange={(val) => {
								const subcategoryId = data.subcategories.find((c) => c.title === val)?.id || 0;
								setFormData({ ...data, subcategoryId });
								field.onChange(val);
							}} dir="rtl" disabled={form.control._formValues["category"] === ""}>
								<FormControl>
									<SelectTrigger className="min-w-[150px]">
										<SelectValue placeholder="" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{
										data.subcategories.map((c) => (
											<SelectItem key={c.title} value={c.title}>{c.title}</SelectItem>
										))
									}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>}


				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem className="mx-2">
							<FormLabel>الوصف</FormLabel>
							<FormControl>
								<Textarea
									placeholder=""
									{...field}
								/>
							</FormControl>
							<FormDescription>
								اصف إعلانك هنا.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="showPhone"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4" dir="rtl">
							<FormControl className="ml-2">
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>
									عرض رقم الهاتف
								</FormLabel>
								<FormDescription>
									يمكنك اختيار عرض رقم هاتفك في الإعلان أو عدم ذلك. يمكنك تغيير هذا الإعداد في وقت لاحق في صفحة{" "}
									<Link href="/examples/forms">إعدادات الملف الشخصي</Link>.
								</FormDescription>
							</div>
						</FormItem>
					)}
				/>

				<StepperFormActions />
			</form>
		</Form>
	);
}

function GeolocationStepForm({ data, setFormData }: StepType) {
	const { nextStep } = useStepper();
	const location = useSWR('/location.json', locationFetcher);
	const gouvernorats = useMemo(() => {
		return Object.keys(location.data || {})
	}, [location.data]);

	const form = useForm<z.infer<typeof GeolocationFormSchema>>({
		resolver: zodResolver(GeolocationFormSchema),
		defaultValues: {
			...data,
		},
	});

	function onSubmit(_data: z.infer<typeof GeolocationFormSchema>) {
		setFormData({ ...data, ..._data });
		nextStep();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="gouvernorat"
					render={({ field }) => (
						<FormItem className="mx-2">
							<FormLabel>الولاية</FormLabel>
							<Select defaultValue={field.value} onValueChange={(v) => {
								location.data && setFormData({ ...data, delegations: location.data[v].map((d) => d.delegation).filter((v, i, a) => a.indexOf(v) === i), localites: [] });
								field.onChange(v);
							}} dir="rtl">
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{
										gouvernorats.map((g) => (
											<SelectItem key={g} value={g}>{g}</SelectItem>
										))
									}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{form.control._formValues["gouvernorat"] != "" && <FormField
					control={form.control}
					name="delegation"
					render={({ field }) => (
						<FormItem className="mx-2">
							<FormLabel>المعتمدية</FormLabel>
							<Select defaultValue={field.value} onValueChange={(v) => {
								const gov = form.control._formValues["gouvernorat"] as string;
								const t = location.data && location.data[gov].filter((d) => d.delegation === v).map((d) => d.localite) || [];
								setFormData({ ...data, localites: t });
								field.onChange(v);
							}} dir="rtl" disabled={form.control._formValues["gouvernorat"] === ""}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{
										data.delegations.map((g) => (
											<SelectItem key={g} value={g}>{g}</SelectItem>
										))
									}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>}

				{form.control._formValues["gouvernorat"] != "" && form.control._formValues["delegation"] != "" && <FormField
					control={form.control}
					name="localite"
					render={({ field }) => (
						<FormItem className="mx-2">
							<FormLabel>المدينة</FormLabel>
							<Select defaultValue={field.value} onValueChange={field.onChange} dir="rtl" disabled={form.control._formValues["gouvernorat"] === "" || form.control._formValues["delegation"] === ""}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{
										data.localites.map((g) => (
											<SelectItem key={g} value={g}>{g}</SelectItem>
										))
									}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>}
				<StepperFormActions />
			</form>
		</Form>
	);
}

const ThirdFormSchema = z.object({
	images: z.string()
});

function ThirdStepForm({ data, setFormData }: StepType) {
	const { nextStep } = useStepper();

	const form = useForm<z.infer<typeof ThirdFormSchema>>({
		resolver: zodResolver(ThirdFormSchema),
		defaultValues: {
			images: ""
		},
	});

	function onSubmit(_data: z.infer<typeof ThirdFormSchema>) {
		nextStep();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="flex w-full bg-slate-200 rounded-xl p-4 justify-center items-center">
					<MultiImageUploader onChange={(images) => {
						setFormData({ ...data, images });
					}} />
				</div>
				<StepperFormActions />
			</form>
		</Form>
	);
}

function StepperFormActions() {
	const {
		prevStep,
		resetSteps,
		isDisabledStep,
		hasCompletedAllSteps,
		isLastStep,
	} = useStepper();

	return (
		<div className="w-full flex justify-center gap-2">
			{hasCompletedAllSteps ? (
				<Button size="sm" type="button" onClick={resetSteps}>
					إعادة التعيين
				</Button>
			) : (
				<>
					<Button
						disabled={isDisabledStep}
						onClick={prevStep}
						size="sm"
						variant="default"
						type="button"
					>
						السابق
					</Button>
					<Button size="sm" type="submit" variant="primary">
						{isLastStep ? "إنهاء" : "التالي"}
					</Button>
				</>
			)}
		</div>
	);
}

function MyStepperFooter({ data }: { data: FormData }) {
	const { activeStep, steps } = useStepper();
	const { toast } = useToast();
	const [uploadStatus, setUploadStatus] = useState("نشر الإعلان");

	const onClick = () => {
		var form = new FormData();
		form.set("title", data.title);
		form.set("description", data.description);
		form.set("category", data.category);
		form.set("categoryId", data.categoryId.toString());
		form.set("subcategory", data.subcategory);
		form.set("subcategoryId", data.subcategoryId.toString());
		form.set("gouvernorat", data.gouvernorat);
		form.set("delegation", data.delegation);
		form.set("localite", data.localite);
		form.set("showPhone", data.showPhone ? "true" : "false");
		data.images.forEach((image, index) => {
			form.append("images", image);
		});

		setUploadStatus("جاري نشر الإعلان...");

		fetch('/api/post-ad', {
			method: 'POST',
			body: form
		}).then((res) => {
			if (!res.ok) {
				setUploadStatus("حدث خطأ أثناء نشر الإعلان!");
				toast({ title: "حدث خطأ أثناء نشر الإعلان!", variant: "destructive" });
			} else {
				setUploadStatus("تم نشر الإعلان بنجاح!");
				toast({ title: "تم نشر الإعلان بنجاح!", variant: "success" });
				res.json().then((data) => {
					setTimeout(() => {
						window.location.href = `/ad/${data.adId}`;
					}, 1000);
				});
			}
		});
	};

	if (activeStep !== steps.length) {
		return null;
	}

	return (
		<div className="flex items-center justify-center gap-2 mt-8">
			<Button onClick={onClick} variant="filledYellowComic" className="w-[200px]">
				<Sparkles size={24} className="ml-2 stroke-slate-800" />
				{uploadStatus}
			</Button>
		</div>
	);
}