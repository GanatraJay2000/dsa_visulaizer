import React, { useEffect, useRef } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

function MyLogs({ logs }: { logs: string[] }) {
  const logItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (logs.length > 0) {
      logItemRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs.length]);
  return (
    <ScrollArea className="h-[200px] w-[550px] rounded-md border p-4">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Log</h4>
        {logs.map((log, index) => (
          <div key={index} ref={index + 1 === logs.length ? logItemRef : null}>
            <Separator className="my-2" />
            <div className="text-sm">{log}</div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default MyLogs;
