import React from "react";
import { Button } from "./ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface BinarySearchListProps {
  value: number[];
  params?: {
    target?: number;
    l?: number;
    r?: number;
    m?: number;
    showM?: boolean;
    success?: boolean;
  };
}

function BinarySearchList({ value, params }: BinarySearchListProps) {
  const { target, l, r, m, showM, success } = params ?? {};
  return (
    <div className="flex gap-2">
      {value.map((val, index) => {
        return (
          <div
            key={index}
            className="relative flex flex-col items-center justify-center content-center align-center"
          >
            {l !== null && index == l ? (
              <ArrowDown className="absolute -top-10" />
            ) : null}
            <Button
              variant={
                target !== null && val === target
                  ? "default"
                  : index >= (l ?? 0) && index <= (r ?? value.length - 1)
                  ? "outline"
                  : "ghost"
              }
              className={cn("", {
                "bg-blue-500": showM && index === m,
                "bg-green-500": success && index === m,
              })}
              // className={showM && index === m ? "bg-blue-500" : ""}
            >
              {val}
            </Button>
            {r !== null && index == r ? (
              <ArrowUp className="absolute -bottom-10" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default BinarySearchList;
