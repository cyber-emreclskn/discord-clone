"use client";

import React from "react";
import "@uploadthing/react/styles.css";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export function FileUpload({
  onChange,
  value,
  endpoint
}: FileUploadProps) {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("✅ Upload tamamlandı:", res);
        // v7: url removed, use key to construct URL
        const key = res?.[0]?.key;
        if (key) {
          const fileUrl = `https://utfs.io/f/${key}`;
          console.log("🔗 Generated URL:", fileUrl);
          onChange(fileUrl);
        } else {
          console.error("❌ File key bulunamadı:", res);
        }
      }}
      onUploadError={(error: Error) => {
        console.error("❌ Upload hatası:", error.message);
        alert(`Upload failed: ${error.message}`);
      }}
      onBeforeUploadBegin={(files) => {
        console.log("📤 Upload başlıyor:", files.map(f => f.name));
        return files;
      }}
      onUploadBegin={(fileName) => {
        console.log("⏳ Upload devam ediyor:", fileName);
      }}
    />
  );
}
