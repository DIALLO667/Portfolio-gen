import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/uploadthing(.*)",
]);

export default clerkMiddleware((auth, req) => {
  console.log("🔵 Middleware Clerk - Route:", req.nextUrl.pathname);
  
  if (!isPublicRoute(req)) {
    console.log("🔒 Route protégée - vérification auth");
    auth.protect();
  } else {
    console.log("🔓 Route publique - accès libre");
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};