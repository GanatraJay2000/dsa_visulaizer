import { MoveLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

function MyTitle({ title }: { title: string }) {
  return (
    <h1 className="text-3xl font-medium flex items-center gap-2">
      <Link href="/">
        <MoveLeft className="text-blue-500" />
      </Link>
      {title}
    </h1>
  );
}

export default MyTitle;
