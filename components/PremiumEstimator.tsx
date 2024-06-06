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
  showCalculator: () => void;
}

const PremiumEstimator = ({ showCalculator }: Props) => {
  const [coverageEstimateLow, setCoverageEstimateLow] = useState(0);
  const [coverageEstimateHigh, setCoverageEstimateHigh] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessTrade: "",
      businessState: "",
      businessPayroll: 0,
    },
  });

  const onInputChange = (event: any) => {
    let rate = {
      Restaurants: {
        "New Mexico": "0.9",
        Idaho: "0.9",
        Georgia: "0.9",
        Alabama: "0.9",
      },
      Plumbing: {
        "New Mexico": "2.52",
        Idaho: "2.52",
        Georgia: "2.52",
        Alabama: "2.52",
      },
      Dentistry: {
        "New Mexico": "0.2",
        Idaho: "0.2",
        Georgia: "0.2",
        Alabama: "0.2",
      },
      Carpentry: {
        "New Mexico": "3.47",
        Idaho: "3.47",
        Georgia: "3.47",
        Alabama: "3.47",
      },
    };

    let trade_rate = rate[form.getValues("businessTrade") as keyof typeof rate];
    if (trade_rate) {
      let state_rate =
        trade_rate[form.getValues("businessState") as keyof typeof trade_rate];
      if (state_rate) {
        const coverage_estimate_year =
          (form.getValues("businessPayroll") * parseFloat(state_rate)) / 100;
        const percentage_variance =
          coverage_estimate_year < 1000
            ? 0.15
            : coverage_estimate_year < 2000
            ? 0.1
            : 0.05;
        // Make +/-15% range on on less than 1k
        // Make +/-10% range on 1k-1.9k
        // Make +/- 5% range on estimate 2k or

        const monthly_coverage = coverage_estimate_year / 12;
        const coverage_estimate_low = Math.ceil(
          monthly_coverage - monthly_coverage * percentage_variance
        );
        const coverage_estimate_high = Math.ceil(
          monthly_coverage + monthly_coverage * percentage_variance
        );

        setCoverageEstimateLow(coverage_estimate_low);
        setCoverageEstimateHigh(coverage_estimate_high);
      }
    }
  };

  function setPayrollFromCalc() {
    showCalculator();
  }

  return (
    <section className="flex flex-col items-center">
      <div className="w-1/2 xl:w-1/3 bg-white p-16 rounded-3xl">
        <header className="home-header items-center w-full text-36 pb-12">
          Premium Estimator
        </header>
        <Form {...form}>
          <form
            onChange={(e) => onInputChange(e)}
            className="space-y-12 gap-12"
          >
            <div className="border rounded-lg border-gray-1 p-8">
              <FormField
                control={form.control}
                name="businessTrade"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label pb-2">
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
                name="businessState"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label pb-2">
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
                    <FormLabel className="form-label pb-2">
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
                    <p
                      className="flex flex-row cursor-pointer underline underline-offset-4 text-blue-1"
                      onClick={() => setPayrollFromCalc()}
                    >
                      Payroll Assistance
                    </p>
                  </div>
                )}
              />
            </div>

            <div className="border rounded-lg border-gray-1 p-12 flex flex-col items-center">
              {coverageEstimateLow === 0 && coverageEstimateHigh === 0 ? (
                <p className="form-label pb-8 text-center w-full">
                  Estimating your premium...
                </p>
              ) : (
                <div>
                  <p className="form-label pb-8 text-center w-full">
                    Coverage starting at
                  </p>
                  <p className="text-92 w-full font-medium text-gray-1  text-center">
                    ${coverageEstimateLow} - ${coverageEstimateHigh}/Month
                  </p>
                </div>
              )}
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default PremiumEstimator;
