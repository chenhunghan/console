import { withMiddlewareAuthRequired } from "./lib";

export default withMiddlewareAuthRequired();

export const config = {
  matcher: [
    "/(.*?)/connectors/:path*",
    "/(.*?)/dashboard/:path*",
    "/(.*?)/pipelines",
    "/(.*?)/pipelines/(.*?)/builder",
    "/(.*?)/models/:path*",
    "/settings",
  ],
};
