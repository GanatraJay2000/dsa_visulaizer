import React from "react";
import ToolTip from "./tooltip";
import { Switch } from "./ui/switch";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import MyDrawer from "./MyDrawer";

function MyButtons({ stateVars }: { stateVars: any }) {
  const {
    autoNext,
    setAutoNext,
    setClick,
    reset,
    target,
    nums,
    success,
    autoNextSpeed,
    handleFormSubmit,
  } = stateVars;
  return (
    <div className="flex gap-2 items-center">
      <ToolTip text="Auto Next">
        <Switch
          className={cn("bg-slate-300", { "bg-black": autoNext })}
          checked={autoNext ?? false}
          onCheckedChange={() => {
            setAutoNext((a: boolean) => !a);
          }}
        />
      </ToolTip>
      <Button
        onClick={() => setClick((a: number | undefined) => (a ? a + 1 : 1))}
        disabled={success}
      >
        Next
      </Button>
      <Button variant="destructive" onClick={reset}>
        Reset
      </Button>
      <MyDrawer
        target={target}
        nums={nums}
        autoNextSpeed={autoNextSpeed}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default MyButtons;
