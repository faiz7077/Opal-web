import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function BackgroundLinesDemo() {
  return (
    
    <BackgroundLines className="flex items-center justify-center h-[90%] flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
      Record <br/> Share <br/> Collaborate
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
      Opal is your all-in-one solution for video recording and sharing, designed for seamless collaboration.

      </p>
      <div className="flex flex-col md:flex-row gap-4 relative z-20">
        <Link href="/auth/sign-up">
            <Button size="lg" className="mt-4">
                Start for Free
                <ArrowRight className="ml-2" />
            </Button>
        </Link>
        <Link href="#video">
            <Button size="lg" variant="outline" className="mt-4">
                Watch Demo
            </Button>
        </Link>
      </div>
      
    </BackgroundLines>
  );
}
