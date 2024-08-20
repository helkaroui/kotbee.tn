"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { CircleX } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type MultiImageUploaderProps = {
    onChange: (images: File[]) => void;
};

export default function MultiImageUploader({ onChange }: MultiImageUploaderProps) {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const {toast} = useToast();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if(acceptedFiles.length > 3) {
            toast({
                title: "يمكنك تحميل ما يصل إلى 3 صور فقط.",
                variant: "destructive"
            });
            return;
        }
        setSelectedImages((prev) => {
            if(prev.length + acceptedFiles.length > 3) { 
                toast({
                    title: "يمكنك تحميل ما يصل إلى 3 صور فقط.",
                    variant: "destructive"
                });
                return prev;
            }

            onChange([...prev, ...acceptedFiles]);
            return [...prev, ...acceptedFiles];
        });
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({ onDrop, accept: {
        'image/png': ['.png'],
        'image/jpeg': ['.jpg', '.jpeg']
      }, maxFiles: 3 });

    return (
        <div className="">
            <div className="flex justify-center items-center rounded-xl border border-slate-500 border-dashed px-4 py-8 my-4 hover:cursor-pointer hover:bg-slate-100" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>قم بإسقاط الصور هنا ...</p>
            ) : (
                <div className="flex-1 text-center">
                <p>أضف بعض الصور المرافقة لإعلانك</p>
                <p>(إختياري)</p>
                </div>
            )}
            </div>

            <div className="flex flex-wrap gap-2 justify-start items-center">
            {selectedImages.length > 0 &&
                selectedImages.map((image, index) => (
                    <div key={index} className="relative">
                        <div 
                            className="absolute z-10 rounded-full bg-slate-600 -top-1 -right-1 flex justify-center items-center hover:cursor-pointer hover:bg-rose-500"
                            onClick={() => {
                                setSelectedImages((prevState) => prevState.filter((img) => img !== image));
                                onChange(selectedImages.filter((img) => img !== image));
                            }}
                        >
                            <CircleX className="h-6 w-6 text-white" />
                        </div>
                        <Image src={`${URL.createObjectURL(image)}`} className="rounded-xl border border-slate-600" alt="" height={200} width={200} />
                    </div>
                ))}
            </div>
        </div>
        );
}