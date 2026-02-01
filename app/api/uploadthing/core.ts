import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized!");
  return { userId };
};

export const ourFileRouter = {
  serverImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 }
  })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      // v7: file.url is deprecated, use file.key
      const fileUrl = `https://utfs.io/f/${file.key}`;
      console.log("✅ Server Image Upload Completed:", fileUrl);
      // v7: Return data to client (awaitServerData: true by default)
      return { uploadedBy: metadata.userId };
    }),
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      const fileUrl = `https://utfs.io/f/${file.key}`;
      console.log("✅ Message File Upload Completed:", fileUrl);
      return { uploadedBy: metadata.userId };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
