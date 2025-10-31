import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

const UPLOADTHING_TOKEN = process.env.UPLOADTHING_TOKEN!;
if (!UPLOADTHING_TOKEN) throw new Error("UPLOADTHING_TOKEN n'est pas défini !");

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: { token: UPLOADTHING_TOKEN },
});
