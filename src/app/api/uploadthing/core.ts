import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      console.log("🟡 Middleware uploadthing appelé");
      
      const user = await currentUser();
      console.log("👤 User:", user ? user.id : "null");
      
      if (!user) {
        console.log("❌ User non authentifié");
        throw new UploadThingError("Unauthorized");
      }
      
      console.log("✅ User authentifié:", user.id);
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("🎉 Upload terminé pour:", metadata.userId);
      console.log("📂 Fichier URL:", file.url);
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;