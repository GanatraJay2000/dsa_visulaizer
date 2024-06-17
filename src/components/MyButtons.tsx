import React from "react";
import ToolTip from "./tooltip";
import { Switch } from "./ui/switch";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import MyDrawer, { GenericFormSchema } from "./MyDrawer";

function MyButtons<T extends GenericFormSchema>({
  stateVars,
}: {
  stateVars: any;
}) {
  const {
    autoNext,
    setAutoNext,
    setClick,
    reset,
    target,
    nums,
    s,
    success,
    autoNextSpeed,
    handleFormSubmit,
    formSchema,
    defValues,
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
      <MyDrawer<T>
        target={target}
        nums={nums}
        s={s}
        autoNextSpeed={autoNextSpeed}
        onSubmit={handleFormSubmit}
        formSchema={formSchema}
        defValues={defValues}
      />
    </div>
  );
}

export default MyButtons;
