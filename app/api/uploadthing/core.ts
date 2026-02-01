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
      console.log("✅ Server Image Upload Completed:", file.url);
      // v7: Return data to client (awaitServerData: true by default)
      return { uploadedBy: metadata.userId, url: file.url };
    }),
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("✅ Message File Upload Completed:", file.url);
      return { uploadedBy: metadata.userId, url: file.url };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
