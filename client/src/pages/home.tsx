import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, GitGraph, Cpu, PillIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">AI-Powered</span>
            <span className="block text-primary">Quantum Drug Discovery</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Revolutionizing pharmaceutical research by combining Graph Neural Networks with Quantum Computing to accelerate drug development pipelines.
          </p>
          <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
            <Link href="/input">
              <Button className="mr-4">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline">
                Learn More
                <BookOpen className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
          <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
            <div className="relative block w-full bg-white rounded-lg overflow-hidden">
              <span className="sr-only">Watch our video</span>
              <img 
                className="w-full" 
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=750&q=80" 
                alt="Science lab" 
              />
              <div className="absolute inset-0 w-full h-full flex items-center justify-center" aria-hidden="true">
                <svg className="h-20 w-20 text-primary" fill="currentColor" viewBox="0 0 84 84">
                  <circle opacity="0.9" cx="42" cy="42" r="42" fill="white" />
                  <path d="M55 42L35 55V29L55 42Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-md bg-primary text-white flex items-center justify-center">
                  <GitGraph className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Graph Neural Networks</h3>
                <p className="mt-3 text-base text-gray-500">
                  Advanced deep learning architectures designed specifically for molecular graph data to predict drug properties and interactions.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-md bg-purple-600 text-white flex items-center justify-center">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Quantum Computing</h3>
                <p className="mt-3 text-base text-gray-500">
                  Leveraging quantum principles to enhance computational capabilities for complex molecular simulations and property calculations.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-md bg-green-600 text-white flex items-center justify-center">
                  <PillIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Drug Discovery</h3>
                <p className="mt-3 text-base text-gray-500">
                  Accelerating the identification of drug candidates and prediction of pharmacological properties to streamline development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
