"use client";

import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";

import { PictureInPicture } from "lucide-react";
import type React from "react"; // Added import for React

declare global {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
  maxImages?: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  maxImages = 3,
}) => {
  const handleUpload = useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (result: any) => {
      if (value.length >= maxImages) {
        return;
      }
      onChange([...value, result.info.secure_url]);
    },
    [onChange, value, maxImages]
  );

  const handleRemove = useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index));
    },
    [onChange, value]
  );

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        {value.map((url, index) => (
          <div key={url} className="relative h-[100px] w-[100px]">
            <Image
              fill
              style={{ objectFit: "cover" }}
              src={url || "/placeholder.svg"}
              alt="Upload"
              className="rounded-md"
            />
            <button
              onClick={() => handleRemove(index)}
              className="absolute top-0 right-0 rounded-full bg-red-500 p-1 text-white"
              type="button"
            >
              X
            </button>
          </div>
        ))}
      </div>
      {value.length < maxImages && (
        <CldUploadWidget
          onUpload={handleUpload}
          uploadPreset="ml_default"
          options={{
            maxFiles: 1,
          }}
        >
          {({ open }) => {
            return (
              <Button
                onClick={() => open?.()}
                className="relative flex cursor-pointer flex-col items-center justify-center gap-4 border-2 border-neutral-300 border-dashed p-20 text-neutral-600 transition hover:opacity-70"
              >
                <PictureInPicture size={50} />
                <div className="font-semibold text-lg">
                  Haga clic para subir
                </div>
              </Button>
            );
          }}
        </CldUploadWidget>
      )}
    </div>
  );
};
