import { Button, buttonVariants } from "@/components/ui/button";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex gap-2 min-h-screen items-center justify-center">
      <Link href="/binary-search" className={buttonVariants()}>
        Binary Search
      </Link>
      <Link href="/2sum" className={buttonVariants()}>
        2 Sum
      </Link>
      <Link href="/longest-unique-substring" className={buttonVariants()}>
        Longest Unique Substring
      </Link>
    </main>
  );
}
