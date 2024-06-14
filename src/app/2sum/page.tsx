"use client";
import List from "@/components/genList";
import React, { useEffect, useState } from "react";

import { formSchema } from "@/components/MyDrawer";
import { z } from "zod";
import MyLogs from "@/components/MyLogs";
import MyTitle from "@/components/MyTitle";
import MyAlert from "@/components/MyAlert";
import MyButtons from "@/components/MyButtons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function TwoSum() {
  const val = [2, 7, 11, 15];
  const tar = 26;
  const [autoNext, setAutoNext] = useState(false);
  const [autoNextSpeed, setAutoNextSpeed] = useState(1000);
  const [fail, setFail] = useState(false);
  const [success, setSuccess] = useState(false);
  const [click, setClick] = useState<null | number>(null);
  const initLogs = ["Loading List"];
  const [logs, setLogs] = useState<string[]>(initLogs);
  const [intervalId, setIntervalId] = useState<
    Array<NodeJS.Timeout | string | number | undefined>
  >([]);

  // ?============================================================================================================
  const [nums, setNums] = useState(val);
  const [target, setTarget] = useState(tar);
  const [l, setL] = useState<{ val: number }>({ val: 0 });
  const [r, setR] = useState<{ val: number }>({ val: 1 });
  // ?============================================================================================================

  function debounce(func: Function, timeout = 150) {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  }

  useEffect(() => {
    if (autoNext) {
      const _intervalId = setInterval(() => {
        setClick((a) => (a ? a + 1 : 1));
      }, autoNextSpeed);
      setIntervalId([...intervalId, _intervalId]);
    } else {
      intervalId.forEach(clearInterval);
    }
  }, [autoNext]);

  const _reset = () => {
    setAutoNext(false);
    intervalId.forEach(clearInterval);

    setClick(null);
    setSuccess(false);
    setFail(false);
    setLogs(initLogs);

    setL({ val: 0 });
  };

  const reset = debounce(_reset);

  useEffect(() => {
    reset();
  }, [nums, target]);

  // ============================================================================================================

  const customLogEntry = {
    failed: () =>
      setLogs((logs) => [...logs, `Failed to find items that total ${target}`]),
    success: (_l: number, _r: number) =>
      setLogs((logs) => [
        ...logs,
        `Target calculated at Index ${_l} and ${_r}`,
      ]),
    next: (_l: number, _r: number) => {
      let sum = nums[_l] + nums[_r];

      setLogs((logs) => [
        ...logs,
        `Checking ${nums[_l]} + ${nums[_r]} = ${sum} ${
          sum === target ? "✅" : "❌"
        }`,
      ]);
    },
  };

  useEffect(() => {
    if (success) return;
    if (l.val >= nums.length - 2) {
      setFail(true);
      customLogEntry.failed();
      return;
    }
  }, []);

  useEffect(() => {
    if (l.val == 0) {
      checkSuccess();
    }
    if (success) return;
    setR({ val: l.val + 1 });
  }, [l]);

  useEffect(() => {
    if (success) return;
    customLogEntry.next(l.val, r.val);
    checkSuccess();
  }, [r]);

  useEffect(() => {
    if (success) customLogEntry.success(l.val, r.val);
    setAutoNext(false);
  }, [success, fail]);

  useEffect(() => {
    setSuccess(false);
    if (click == null) return;

    if (l.val >= nums.length - 2) {
      setFail(true);
      customLogEntry.failed();
      return;
    }
    if (r.val >= nums.length) {
      setFail(true);
      customLogEntry.failed();
      return;
    }
    if (r.val >= nums.length - 1) {
      setL((a) => ({ val: a.val + 1 }));
      return;
    }

    setR((a) => ({ val: a.val + 1 }));
  }, [click]);

  function checkSuccess() {
    if (nums[l.val] + nums[r.val] === target) setSuccess(true);
  }

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    reset();
    setTarget(parseInt(data.target));
    data.list = data.list.replace(/^,+|,+$/g, "");

    const _nums = data.list
      .split(",")
      .map((n) => parseInt(n))
      .filter((n) => !isNaN(n));
    setNums(_nums);

    setAutoNextSpeed(parseInt(data.autoSpeed));
  };

  return (
    <div className="flex flex-col gap-24 items-center p-20">
      <MyTitle title="Two Sum" />
      {fail ? (
        <MyAlert title={`Failed to find the target: ${target}`} />
      ) : (
        <div className="flex gap-20">
          {l !== null && r !== null && success !== null && (
            <List
              params={{
                value: nums,
                l: l.val,
                r: r.val,
                success,
                colorL: "bg-yellow-200",
                colorR: "bg-blue-200",
                arrows: false,
                itemVariant: () => "outline",
                itemClass: ({ _index, r, colorR, colorL, l, success }) => {
                  return cn(
                    `${_index == r && colorR && !success ? colorR : ""} ${
                      _index == l && colorL && !success ? colorL : ""
                    }
                 ${
                   success == true && (_index == l || _index == r)
                     ? "bg-green-200"
                     : ""
                 }
                `
                  );
                },
              }}
            />
          )}
          <Button>{target}</Button>
        </div>
      )}
      <MyButtons
        stateVars={{
          autoNext,
          setAutoNext,
          setClick,
          reset,
          target,
          nums,
          success,
          autoNextSpeed,
          handleFormSubmit,
        }}
      />
      <MyLogs logs={logs} />
    </div>
  );
}

export default TwoSum;
