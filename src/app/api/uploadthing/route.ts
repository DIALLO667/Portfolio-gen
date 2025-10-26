import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

const UPLOADTHING_TOKEN =
  "eyJhcGlLZXkiOiJza19saXZlXzk2NzQ4Y2RmZWViN2NkZmJmOTMwMmRlNDQyMWI1N2M2MmRlMzk0OTJmN2FhYmNlMjYzMTFmODVhMTdmYzIwMzQiLCJhcHBJZCI6IjY2cWszNnFycmQiLCJyZWdpb25zIjpbInNlYTEiXX0=";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: { token: UPLOADTHING_TOKEN },
});
