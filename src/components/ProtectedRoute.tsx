"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Lock } from "lucide-react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the user is definitely not authenticated, send them to login
    if (status === "unauthenticated") {
      router.push("/login"); // Adjust this path to your login page
    }
  }, [status, router]);

  // 1. Show a branded loading state while checking the session
  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="text-orange-600 mb-4"
        >
          <Loader2 size={48} />
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 font-medium animate-pulse"
        >
          Authenticating...
        </motion.p>
      </div>
    );
  }

  // 2. If authenticated, render the page content
  if (status === "authenticated") {
    return <>{children}</>;
  }

  // 3. Fallback (while redirecting)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-orange-600">
      <Lock size={32} />
    </div>
  );
}