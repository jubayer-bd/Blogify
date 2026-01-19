// proxy.ts
import { withAuth } from "next-auth/middleware";

// Change the export name from 'middleware' to 'proxy'
export const proxy = withAuth(
  function proxy(req) {
    // Your custom logic (if any) goes here
  },
  {
    pages: {
      signIn: "/login",
    },
  },
);

export const config = {
  matcher: ["/add-post/:path*"],
};