import { Bolt } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  target: z.string(),
  list: z.string(),
  autoSpeed: z.string(),
});

const MyDrawer = ({
  target,
  nums,
  autoNextSpeed,
  onSubmit,
}: {
  target: number;
  nums: number[];
  autoNextSpeed: number;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      target: target.toString(),
      list: nums.join(","),
      autoSpeed: autoNextSpeed.toString(),
    },
  });
  return (
    <Drawer>
      <Button asChild variant="ghost" className="px-2">
        <DrawerTrigger>
          <Bolt className="h-5 text-slate-500" />
        </DrawerTrigger>
      </Button>
      <DrawerContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 md:w-4/12 mx-auto py-20"
          >
            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target</FormLabel>
                  <FormControl>
                    <Input placeholder="9" {...field} />
                  </FormControl>
                  <FormDescription>Item to be found</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="list"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>List Items</FormLabel>
                  <FormControl>
                    <Input placeholder="1,2,3,4,5,6,7,8,9" {...field} />
                  </FormControl>
                  <FormDescription>Comma Seperated List</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="autoSpeed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Auto-Next Speed</FormLabel>
                  <FormControl>
                    <Input placeholder="1000" {...field} />
                  </FormControl>
                  <FormDescription>
                    Speed of the Animation in milliseconds
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <DrawerClose>
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </DrawerClose>
              <DrawerClose>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default MyDrawer;
