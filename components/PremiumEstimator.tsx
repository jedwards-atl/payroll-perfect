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
import Image from "next/image";
import Link from "next/link";
import PayrollCalculator from "./PayrollCalculator";
import React, { useState } from "react";
import Slider from "react-input-slider";

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

  const onSliderChange = (value: any) => {
    form.setValue("businessPayroll", value);
    onInputChange();
  };

  const onInputChange = () => {
    console.log(form.getValues());
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
      } else {
        setCoverageEstimateLow(0);
        setCoverageEstimateHigh(0);
      }
    }
  };

  function setPayrollFromCalc() {
    toggleCalculator();
  }

  return (
    <section className="flex flex-col items-center">
      <div className="w-1/2 xl:w-1/3 bg-white p-16 rounded-3xl">
        <div className="flex flex-col items-end">
          <Image
            className="cursor-pointer"
            src="lightRefresh.svg"
            alt="back to premium estimator"
            height={30}
            width={30}
            onClick={() => setPayrollFromCalc()}
          />
        </div>
        <header className="home-header items-center w-full text-36 pb-12 text-center">
          Comp Quick
          <br />
          Premium Estimator
          <div className="flex flex-col items-center">
            <Image
              src="lightUnderline.svg"
              alt="underline"
              height={30}
              width={320}
            />
          </div>
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
                        {/*<Input*/}
                        {/*  type="number"*/}
                        {/*  placeholder="ex: 200,000"*/}
                        {/*  className="input-class"*/}
                        {/*  {...field}*/}
                        {/*/>*/}
                        <Slider
                          axis="x"
                          xmin={0}
                          xmax={1000000}
                          xstep={1000} // Optional: this sets the step between each value
                          x={form.watch("businessPayroll")}
                          onChange={({ x }) => onSliderChange(x)}
                          styles={{
                            track: {
                              backgroundColor: "#ddd",
                              width: "100%",
                            },
                            active: {
                              backgroundColor: "#4632d8",
                            },
                            thumb: {
                              width: 20,
                              height: 20,
                              backgroundColor: "#4632d8",
                            },
                          }}
                        />
                      </FormControl>
                      <div className="slider-labels pt-2">
                        <div className="payroll-min">$0</div>
                        <div className="payroll-value text-purple-2">
                          <b>
                            ${form.watch("businessPayroll").toLocaleString()}
                          </b>
                        </div>
                        <div className="payroll-max">$1,000,000</div>
                      </div>
                      <FormMessage className="form-message mt-500" />
                    </div>
                    <p
                      className="flex flex-row cursor-pointer underline underline-offset-4 text-blue-1"
                      onClick={() => setPayrollFromCalc()}
                    >
                      Payroll Calculators
                    </p>
                  </div>
                )}
              />
            </div>

            <div className="border rounded-lg border-gray-1 p-12 flex flex-col items-center">
              {coverageEstimateLow === 0 && coverageEstimateHigh === 0 ? (
                <p className="form-label pb-8 text-center w-full">
                  Please enter your business information above
                </p>
              ) : (
                <div>
                  <p className="form-label pb-8 text-center w-full">
                    Workers' Comp Insurance
                  </p>
                  {coverageEstimateLow === coverageEstimateHigh ? (
                    <p className="text-36 w-full font-medium text-purple-2  text-center">
                      ${coverageEstimateLow}
                    </p>
                  ) : (
                    <p className="text-36 w-full font-medium text-purple-2  text-center">
                      ${coverageEstimateLow} - ${coverageEstimateHigh}
                    </p>
                  )}
                </div>
              )}
            </div>
          </form>
        </Form>

        <div className="flex flex-col items-center pt-12 w-full">
          <Link
            href="https://www.simplybusiness.com/business-insurance/workers-compensation-insurance/"
            className="w-full"
          >
            <Button
              className="form-btn-2 px-24 w-full text-white flex"
              type="submit"
            >
              <p className="text-white">Start Quote Now</p>
              <Image
                src="whiteRightArrow.svg"
                alt="arrow right"
                height={30}
                width={30}
                className="pl-2"
              />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PremiumEstimator;
