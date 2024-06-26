"use client";
import List from "@/components/genList";
import React, { useEffect, useState } from "react";

import MyLogs from "@/components/MyLogs";
import MyTitle from "@/components/MyTitle";
import MyButtons from "@/components/MyButtons";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { CopyBlock, dracula } from "react-code-blocks";

function LongestUniqueSubstring() {
  const value = "abcabcbb";
  const [autoNext, setAutoNext] = useState(false);
  const [autoNextSpeed, setAutoNextSpeed] = useState(1000);
  const [fail, setFail] = useState(false);
  const [success, setSuccess] = useState(false);
  const [click, setClick] = useState<null | number>(null);
  const initLogs = ["Loading String..."];
  const [logs, setLogs] = useState<string[]>(initLogs);
  const [intervalId, setIntervalId] = useState<
    Array<NodeJS.Timeout | string | number | undefined>
  >([]);

  // ?============================================================================================================
  const [s, setS] = useState(value);
  const [l, setL] = useState(-1);
  const [r, setR] = useState(-1);
  const [maxL, setMaxL] = useState(-1);
  const [maxR, setMaxR] = useState(-1);
  const [myArray, setMyArray] = useState<string[]>([]);
  const [max, setMax] = useState(0);
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

    setR(-1);
    setL(-1);
    setMyArray([]);
    setMax(0);
    setMaxL(-1);
    setMaxR(-1);

    setClick(null);
    setSuccess(false);
    setFail(false);
    setLogs(initLogs);
  };

  useEffect(() => {
    reset();
  }, [s]);

  // ============================================================================================================

  const customLogEntry = {
    success: (_m: number) =>
      setLogs((logs) => [...logs, `Length of Maximum Unique Substring: ${_m}`]),
    slideWindow: (_l: number, _r: number, _myArray: string[], _val: string) => {
      return setLogs((logs) => [
        ...logs,
        `${_val} does not exist in [${_myArray}] => Sliding Window: Left: ${_l}, Right: ${_r}`,
      ]);
    },
    slidedWindow: (
      _l: number,
      _r: number,
      _myArray: string[],
      _val: string
    ) => {
      return setLogs((logs) => [
        ...logs,
        `${_val} exists in [${_myArray}] => Sliding Window: Left: ${_l}, Right: ${_r}`,
      ]);
    },
  };

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (success) return;
    if (click == null) return;
    if (l == -1 && r == -1) setL(0);
    setR((r) => r + 1);
  }, [click]);

  useEffect(() => {
    if (r >= s.length) {
      setMax((x) => {
        const _max = Math.max(x, myArray.length);
        if (_max == myArray.length) {
          setMaxL(l);
          setMaxR(r);
        }
        return _max;
      });
      setSuccess(true);
      customLogEntry.success(max);
      setAutoNext(false);
      intervalId.forEach(clearInterval);
      return;
    }
    const idx = myArray.indexOf(s[r]);
    if (idx != -1) {
      if (!success && r !== -1)
        customLogEntry.slidedWindow(l + idx + 1, r, myArray, s[r]);
      setMyArray((map) => map.slice(idx + 1));
      setL((l) => l + idx + 1);
    } else {
      if (!success && r !== -1) customLogEntry.slideWindow(l, r, myArray, s[r]);
    }
    if (s[r]) {
      setMyArray((map) => {
        return [...map, s[r]];
      });
    }
  }, [r]);

  useEffect(() => {
    setMax((x) => {
      const _max = Math.max(x, myArray.length);
      if (_max == myArray.length) {
        setMaxL(l);
        setMaxR(r);
      }
      return _max;
    });
  }, [myArray]);

  useEffect(() => {
    if (success) {
      setR(maxR);
      setL(maxL);
    }
  }, [success]);

  const formSchema = z.object({
    s: z.string(),
    autoSpeed: z.string(),
  });

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    reset();
    setS(data.s);

    setAutoNextSpeed(parseInt(data.autoSpeed));
  };

  const code = `/**
 * @param {string} s
 * @return {number}
 */

var lengthOfLongestSubstring = function(s) {
    let map = [];
    let max = 0
    for(let i = 0; i < s.length; i++){
        const idx = map.indexOf(s[i])
        if (idx != -1) map = map.slice(idx+1)
        map.push(s[i])
        max = Math.max(max, map.length)
    }
    max = Math.max(max, map.length)
    return max
};
  `;

  return (
    <div className="flex flex-col md:flex-row min-h-screen h-full items-stretch">
      <div className="flex flex-col gap-24 items-center justify-center md:px-20 md:pt-20 p-5">
        <MyTitle title="Longest Unique Substring" />

        <List
          params={{
            l,
            r,
            value: s.split(""),
            success,
            arrows: false,
            itemVariant: () => "outline",
            itemClass: ({ _index, l, r }) => {
              return cn("", {
                "bg-blue-200": _index! >= l! && _index! <= r!,
                "bg-green-200": success && _index! >= maxL! && _index! <= maxR!,
              });
            },
          }}
        />
        <MyButtons<typeof formSchema>
          stateVars={{
            autoNext,
            setAutoNext,
            setClick,
            reset,
            s,
            success,
            autoNextSpeed,
            handleFormSubmit,
            formSchema,
            defValues: { s, autoSpeed: autoNextSpeed.toString() },
          }}
        />
        <MyLogs logs={logs} />
      </div>

      <div className="min-h-screen h-full w-full flex flex-col justify-center items-start p-10 bg-[#282a36]">
        <h1 className="text-xl font-bold text-white">Code</h1>
        <CopyBlock
          customStyle={{ width: "100%" }}
          text={code}
          language="javascript"
          showLineNumbers
          theme={dracula}
          wrapLongLines
        />
      </div>
    </div>
  );
}

export default LongestUniqueSubstring;
