import { Button, buttonVariants } from "@/components/ui/button";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Link href="/binary-search" className={buttonVariants()}>
        Binary Search
      </Link>
    </main>
  );
}
