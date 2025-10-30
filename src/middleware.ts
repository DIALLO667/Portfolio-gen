import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Définir les routes publiques
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  try {
    if (!isPublicRoute(req)) {
      await auth.protect(); // protège les routes privées
    }
  } catch (err) {
    console.error("Middleware error:", err); // log l'erreur sur Vercel
    return new Response("Unauthorized", { status: 401 }); // renvoie 401 au lieu de 500
  }
});

export const config = {
  matcher: [
    "/:path((?!_next/|.*\\.(css|js|png|jpg|jpeg|svg|gif|woff2?|ico))*)", // ignore statiques et _next
    "/api/:path*" // middleware sur API
  ],
};
