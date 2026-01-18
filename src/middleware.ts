// middleware.ts
import { withAuth } from "next-auth/middleware";

export const middleware = withAuth(
  function middleware(req) {
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
