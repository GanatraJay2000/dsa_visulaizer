import { Bolt, Target } from "lucide-react";
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
import { DefaultValues, Path, useForm } from "react-hook-form";
import { TypeOf, z } from "zod";

const genericFormSchema = z.object({
  autoSpeed: z.string(),
});

export type GenericFormSchema = typeof genericFormSchema;

const MyDrawer = <T extends z.ZodTypeAny>({
  target,
  nums,
  s,
  autoNextSpeed,
  onSubmit,
  formSchema,
  defValues,
}: {
  target: number;
  nums: number[];
  s: string;
  autoNextSpeed: number;
  formSchema: T;
  defValues?: DefaultValues<z.infer<T>>;
  onSubmit: (data: z.infer<T>) => void;
}) => {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(formSchema),
    defaultValues: defValues,
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
            {target && (
              <FormField
                control={form.control}
                name={"target" as Path<TypeOf<T>>}
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
            )}
            {nums && (
              <FormField
                control={form.control}
                name={"list" as Path<TypeOf<T>>}
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
            )}
            {s && (
              <FormField
                control={form.control}
                name={"s" as Path<TypeOf<T>>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>String</FormLabel>
                    <FormControl>
                      <Input placeholder="Hello World" {...field} />
                    </FormControl>
                    <FormDescription>String to be searched</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name={"autoSpeed" as Path<TypeOf<T>>}
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
              <DrawerClose asChild>
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
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
