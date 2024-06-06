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

const formSchema = z.object({
  hourlyWage: z.coerce.number().optional(),
  employeeCount: z.coerce.number().optional(),
  hoursPerWeekPerEmployee: z.coerce.number().optional(),
  weeksOpenPerYear: z.coerce.number().optional(),
});

interface Props {
  toggleCalculator: () => void;
}

const PayrollCalculator = ({ toggleCalculator }: Props) => {
  const [payrollAmount, setPayrollAmount] = useState(0);
  // const [showPayrollCalculator, setShowPayrollCalculator] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hourlyWage: 0,
      employeeCount: 0,
      hoursPerWeekPerEmployee: 0,
      weeksOpenPerYear: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // const payrollNumber = Number(values.businessPayroll);
    setPayrollAmount(values.employeeCount!);
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
                name="hourlyWage"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label-2 pb-2">
                      Average Hourly Wage Per Employee
                    </FormLabel>
                    <div className="w-full flex flex-col">
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="ex: 21"
                          className="input-class"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message mt-2" />
                      <p className="flex flex-row text-white text-14 pt-2">
                        Based on job duty. For salaried employees, estimate the
                        hourly rate
                      </p>
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="border rounded-lg border-gray-1 p-8">
              <FormField
                control={form.control}
                name="employeeCount"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label-2 pb-2">
                      Number of Employees
                    </FormLabel>
                    <div className="w-full flex flex-col">
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="ex: 6"
                          className="input-class"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message mt-2" />
                      <p className="flex flex-row text-white text-14 pt-2">
                        Do not include owners, officers, subcontractors, or 1099
                        workers
                      </p>
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="border rounded-lg border-gray-1 p-8">
              <FormField
                control={form.control}
                name="hoursPerWeekPerEmployee"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label-2 pb-2">
                      Estimated Average Hours Worked per Week
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
                        Hours worked per week are per employee
                      </p>
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="border rounded-lg border-gray-1 p-8">
              <FormField
                control={form.control}
                name="weeksOpenPerYear"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label-2 pb-2">
                      Estimated number of weeks open for business each year
                    </FormLabel>
                    <div className="w-full flex flex-col">
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="ex: 40"
                          className="input-class"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message mt-2" />
                      <p className="flex flex-row text-white text-14 pt-2">
                        Hours worked per week are per employee
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
                ${payrollAmount}/Month
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

export default PayrollCalculator;
