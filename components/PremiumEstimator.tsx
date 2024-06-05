"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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

const formSchema = z.object({
  businessTrade: z.string().min(2, {
    message: "Must be applicable business trade.",
  }),
  businessState: z.string().min(2, {
    message: "Must be applicable business trade.",
  }),
  businessPayroll: z.string().min(2, {
    message: "Must be applicable business trade.",
  }),
});

const PremiumEstimator = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessTrade: "",
      businessState: "",
      businessPayroll: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <section className="w-full">
      <header className="home-header items-center bg-white w-full">
        Premium Estimator
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="border rounded-lg border-gray-1 p-8">
            <FormField
              control={form.control}
              name="businessTrade"
              render={({ field }) => (
                <div className="form-item">
                  <FormLabel className="form-label font-bold text-black-1 pb-2">
                    What does your business do?
                  </FormLabel>
                  <div className="w-full flex flex-col">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="ex: accounting, landscaping"
                        className="input-class"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="form-message mt-2" />
                  </div>
                </div>
              )}
            />
          </div>
          <div className="border rounded-lg border-gray-1 p-8">
            <FormField
              control={form.control}
              name="businessTrade"
              render={({ field }) => (
                <div className="form-item">
                  <FormLabel className="form-label font-bold text-black-1 pb-2">
                    What state is your business in?
                  </FormLabel>
                  <div className="w-full flex flex-col">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="ex: Virginia"
                        className="input-class"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="form-message mt-2" />
                  </div>
                </div>
              )}
            />
          </div>
          <div className="border rounded-lg border-gray-1 p-8">
            <FormField
              control={form.control}
              name="businessPayroll"
              render={({ field }) => (
                <div className="form-item">
                  <FormLabel className="form-label font-bold text-black-1 pb-2">
                    What is your estimated annual payroll?
                  </FormLabel>
                  <div className="w-full flex flex-col">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="ex: 200,000"
                        className="input-class"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="form-message mt-2" />
                  </div>
                </div>
              )}
            />
          </div>

          <div>
            <Button className="form-btn" type="submit">
              Submit
            </Button>
          </div>

          <div className="border rounded-lg border-gray-1 p-8">
            <FormField
              control={form.control}
              name="businessPayroll"
              render={({ field }) => (
                <div className="form-item">
                  <FormLabel className="form-label font-bold text-black-1 pb-2">
                    What is your estimated annual payroll?
                  </FormLabel>
                  <div className="w-full flex flex-col">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="ex: 200,000"
                        className="input-class"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="form-message mt-2" />
                  </div>
                </div>
              )}
            />
          </div>
        </form>
      </Form>
    </section>
  );
};

export default PremiumEstimator;
