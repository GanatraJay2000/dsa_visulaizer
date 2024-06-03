"use client";
import List from "@/components/bsList";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

import { Switch } from "@/components/ui/switch";

import { Alert, AlertTitle } from "@/components/ui/alert";
import ToolTip from "@/components/tooltip";
import { cn } from "@/lib/utils";
import MyDrawer, { formSchema } from "@/components/MyDrawer";
import { custom, z } from "zod";
import MyLogs from "@/components/MyLogs";
import MyTitle from "@/components/MyTitle";
import MyAlert from "@/components/MyAlert";
import MyButtons from "@/components/MyButtons";

interface BinarySearchProps {
  value?: number[];
  tar?: number;
}

function BinarySearch({
  value = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ],
  tar = 17,
}: BinarySearchProps) {
  const [autoNext, setAutoNext] = useState(false);
  const [autoNextSpeed, setAutoNextSpeed] = useState(1000);
  const [fail, setFail] = useState(false);
  const [success, setSuccess] = useState(false);
  const [click, setClick] = useState<null | number>(null);
  const initLogs = [
    "Loading Array & Target | Adding Left and Right Pointers...",
  ];
  const [logs, setLogs] = useState<string[]>(initLogs);
  const [intervalId, setIntervalId] = useState<
    Array<NodeJS.Timeout | string | number | undefined>
  >([]);

  // ?============================================================================================================
  const [nums, setNums] = useState(value);
  const [target, setTarget] = useState(tar);
  const [l, setL] = useState(0);
  const [r, setR] = useState(nums.length - 1);
  const [showM, setShowM] = useState(true);
  const [m, setM] = useState<number | undefined>(undefined);
  // ?============================================================================================================

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

  const reset = () => {
    setAutoNext(false);
    intervalId.forEach(clearInterval);
    setR(nums.length - 1);
    setClick(null);
    setSuccess(false);
    setM(undefined);
    setL(0);
    setFail(false);
    setLogs(initLogs);
  };

  useEffect(() => {
    reset();
  }, [nums, target]);

  // ============================================================================================================

  const customLogEntry = {
    failed: () =>
      setLogs((logs) => [...logs, `Failed to find target ${target}`]),
    success: (_m: number) =>
      setLogs((logs) => [...logs, `Target Found at Index ${_m}`]),
    midPoint: (_m: number) =>
      setLogs((logs) => [
        ...logs,
        `Midpoint Index: ${_m} | Value: ${nums[_m]}`,
      ]),
    moveLeft: (_m: number) =>
      setLogs((logs) => [
        ...logs,
        `Target is greater than ${nums[_m]} | Moving Left Pointer to Index: ${
          _m + 1
        }`,
      ]),
    moveRight: (_m: number) =>
      setLogs((logs) => [
        ...logs,
        `Target is less than ${nums[_m]} | Moving Right Pointer to Index: ${
          _m - 1
        }`,
      ]),
  };

  useEffect(() => {
    reset();

    if (r < l) {
      setFail(true);
      customLogEntry.failed();
      setAutoNext(false);
      intervalId.forEach(clearInterval);
    }
  }, []);

  useEffect(() => {
    if (success) return;
    if (click == null) return;

    if (r < l) {
      setFail(true);
      customLogEntry.failed();
      setAutoNext(false);
      intervalId.forEach(clearInterval);
      return;
    }
    let _m = Math.floor((l + r) / 2);
    setM(_m);

    if (click! % 2 === 1) {
      setShowM(true);
      customLogEntry.midPoint(_m);
    }

    if (nums[_m] === target) {
      customLogEntry.success(_m);
      setSuccess(true);
    }
  }, [click]);

  useEffect(() => {
    if (click! % 2 === 1) return;
    if (m == undefined) return;
    if (nums[m] === target) {
      setSuccess(true);
    } else if (nums[m] < target) {
      customLogEntry.moveLeft(m);
      setShowM(false);
      setL(m + 1);
    } else {
      customLogEntry.moveRight(m);
      setShowM(false);
      setR(m - 1);
    }
  }, [m, click]);

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
      <MyTitle title="Binary Search" />
      {fail ? (
        <MyAlert title={`Failed to find the target: ${target}`} />
      ) : (
        <List value={nums} params={{ target, l, r, m, showM, success }} />
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

export default BinarySearch;