import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Crée le handler à l'intérieur pour que le token soit lu au runtime
const getHandler = () => {
  const token = process.env.UPLOADTHING_TOKEN;
  if (!token)
    throw new Error("UPLOADTHING_TOKEN n'est pas défini dans l'environnement !");

  return createRouteHandler({
    router: ourFileRouter,
    config: { token },
  });
};

// Réexporte directement GET et POST
const { GET, POST } = getHandler();
export { GET, POST };
