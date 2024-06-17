import React from "react";
import { Button } from "./ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "link"
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | null
  | undefined;

interface GenListPropsParams {
  arrows?: boolean;
  colorL?: string;
  colorR?: string;
  l?: number;
  m?: number;
  r?: number;
  showM?: boolean;
  success?: boolean;
  target?: number;
  _index?: number;
  _val?: number | string;
  value: number[] | string[];
}

interface GenListProps {
  params: GenListPropsParams & {
    itemVariant: ({ ...args }: GenListPropsParams) => ButtonVariant;
    itemClass: ({ ...args }: GenListPropsParams) => string;
  };
}

function GenList({ params }: GenListProps) {
  const {
    value,
    l,
    r,
    arrows = true,
    itemVariant,
    itemClass,
  } = params ?? { itemVariant: () => null, itemClass: () => "", value: [] };
  return (
    <div className="flex gap-2">
      {value.map((_val, _index) => {
        return (
          <div
            key={_index}
            className="relative flex flex-col items-center justify-center content-center align-center"
          >
            {l !== null && _index == l && arrows ? (
              <ArrowDown className="absolute -top-10" />
            ) : null}
            <Button
              variant={itemVariant({ _index, _val, ...params })}
              className={itemClass({ _index, _val, ...params })}
            >
              {_val}
            </Button>
            {r !== null && _index == r && arrows ? (
              <ArrowUp className="absolute -bottom-10" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default GenList;
