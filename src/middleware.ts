import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Routes publiques
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  try {
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
  } catch (err) {
    console.error("Middleware error:", err);
    return new Response("Unauthorized", { status: 401 });
  }
});

export const config = {
  matcher: [
    "/:path*",
    "/api/:path*"
  ],
};
