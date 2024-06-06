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
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PayrollCalculator from "./PayrollCalculator";

const formSchema = z.object({
  businessTrade: z.string().min(2, {
    message: "Must be applicable business trade.",
  }),
  businessState: z.string().min(2, {
    message: "Must be applicable state.",
  }),
  businessPayroll: z.coerce.number().int().positive().min(1, {
    message: "Must be a positive number.",
  }),
});

interface Props {
  toggleCalculator: () => void;
}

const PremiumEstimator = ({ toggleCalculator }: Props) => {
  const [coverageEstimate, setCoverageEstimate] = useState(0);
  const [showPayrollCalculator, setShowPayrollCalculator] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessTrade: "",
      businessState: "",
      businessPayroll: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const payrollNumber = Number(values.businessPayroll);
    setCoverageEstimate(payrollNumber);
  }

  function setPayrollFromCalc() {
    toggleCalculator();
  }

  return (
    <section className="flex flex-col items-center">
      <div className="w-1/2 xl:w-1/3 bg-purple-2 p-16 rounded-3xl">
        <div className="flex flex-col items-end">
          <Image
            className="cursor-pointer"
            src="darkRefresh.svg"
            alt="back to premium estimator"
            height={30}
            width={30}
            onClick={() => setPayrollFromCalc()}
          />
        </div>
        <header className="home-header text-white items-center w-full text-36 pb-12">
          Payroll Calculator
          <div className="flex flex-col items-center">
            <Image
              src="darkUnderline.svg"
              alt="underline"
              height={30}
              width={200}
            />
          </div>
        </header>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-12 gap-12"
          >
            <div className="border rounded-lg border-gray-1 p-8">
              <FormField
                control={form.control}
                name="businessTrade"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label-2 pb-2">
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
                      <p className="flex flex-row text-white text-14 pt-2">
                        Need help estimating your payroll?
                      </p>
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="border rounded-lg border-gray-1 p-8">
              <FormField
                control={form.control}
                name="businessState"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label-2 pb-2">
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
                      <p className="flex flex-row text-white text-14 pt-2">
                        Need help estimating your payroll?
                      </p>
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
                    <FormLabel className="form-label-2 pb-2">
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
                      <p className="flex flex-row text-white text-14 pt-2">
                        Need help estimating your payroll?
                      </p>
                    </div>
                  </div>
                )}
              />
            </div>

            <div className="border rounded-lg border-gray-1 p-12 flex flex-col items-center">
              <p className="form-label-2 pb-8 text-center w-full">
                Coverage starting at
              </p>
              <p className="text-92 w-full font-medium text-gray-1  text-center">
                ${coverageEstimate}/Month
              </p>
            </div>
          </form>
        </Form>

        <div className="flex flex-col items-center pt-12 w-full">
          <Button
            className="form-btn-2 py-4 px-8 w-full"
            type="submit"
            onClick={() => setPayrollFromCalc()}
          >
            Back to Premium Estimator
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PremiumEstimator;
