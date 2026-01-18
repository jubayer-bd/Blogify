"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LogOut, User as UserIcon } from "lucide-react";
import { useSession, signOut } from "next-auth/react"; // Import NextAuth hooks

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
// import { data } from "framer-motion/client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Blogs", href: "/blogs" },
  { name: "Post", href: "/add-post" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession(); // Access user session data
  // Helper function to handle Sign Out
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex gap-1 justify-center items-center text-xl font-bold text-orange-600"
        >
          <figure className="w-8 h-8 relative">
            <Image
              className="dark:invert object-contain"
              src="/orig.png"
              alt="Blogify logo"
              fill
              priority
            />
          </figure>
          <span className="text-orange-600">Blogify</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-orange-600 ${
                pathname === link.href
                  ? "text-orange-600"
                  : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-gray-200 mx-2"></div>

          {/* Auth Section (Desktop) */}
          {status === "authenticated" ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {/* User Image or Default Icon */}
                <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-200 relative">
                  {session.user?.image ? (
                    <Image 
                      src={session.user.image} 
                      alt="User" 
                      fill 
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                        <UserIcon className="h-4 w-4 text-gray-500" />
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium">
                  {session.user?.name?.split(" ")[0]} {/* Show First Name */}
                </span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button size="sm">Login</Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-64">
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium ${
                    pathname === link.href
                      ? "text-orange-600"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <hr className="my-2" />

              {/* Auth Section (Mobile) */}
              {status === "authenticated" ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200 relative bg-gray-100">
                        {session.user?.image ? (
                            <Image 
                            src={session.user.image} 
                            alt="User" 
                            fill 
                            className="object-cover"
                            />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center">
                                <UserIcon className="h-5 w-5 text-gray-500" />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{session.user?.name}</span>
                        <span className="text-xs text-gray-500 truncate max-w-[150px]">{session.user?.email}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleLogout}
                    className="w-full justify-start text-red-500"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button className="w-full">Login</Button>
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}