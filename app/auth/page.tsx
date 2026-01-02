"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to sign-in page by default
    router.push('/auth/signin');
  }, [router]);

  return null; // Render nothing since we're redirecting
};

export default AuthPage;