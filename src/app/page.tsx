"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status }: { data: any, status: string } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" && session?.user.role !== "renter") {
      push("/login");
    }
  }, [status, session]);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
}
