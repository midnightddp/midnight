"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

type Props = {
  children: React.ReactNode;
  allowedEmails?: string[];
  redirectTo?: string;
};

export default function AdminAuth({
  children,
  allowedEmails,
  redirectTo = "/admin/sign-in",
}: Props) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Prevent SSR issues
    if (typeof window === "undefined") return;

    const envEmails =
      process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",")
        .map((s) => s.trim())
        .filter(Boolean) || [];

    const allowed = allowedEmails?.length
      ? allowedEmails
      : envEmails.length
      ? envEmails
      : ["midnightddp@gmail.com"];

    const unsub = onAuthStateChanged(auth, (user: User | null) => {
      const ok =
        user && !user.isAnonymous && user.email && allowed.includes(user.email);

      setAuthorized(ok);
      setChecked(true);
    });

    return () => unsub();
  }, []);

  // Perform redirect ONLY after hydration + check complete
  useEffect(() => {
    if (!checked) return;

    if (!authorized) {
      router.replace("/admin/sign-in");
    }
  }, [checked, authorized]);

  if (!checked) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="mb-2">Verifying admin access…</div>
          <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!authorized) return null;

  return <>{children}</>;
}
