import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// On récupère le token depuis les variables d'environnement
const UPLOADTHING_TOKEN = process.env.UPLOADTHING_TOKEN;

if (!UPLOADTHING_TOKEN) {
  throw new Error(
    "UPLOADTHING_TOKEN n'est pas défini dans l'environnement !"
  );
}

// Optionnel : log temporaire pour vérifier que Vercel lit la variable
console.log("UPLOADTHING_TOKEN:", UPLOADTHING_TOKEN);

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: { token: UPLOADTHING_TOKEN },
});
