"use client";

import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Menu, Plane, MapPin, Users, PhoneCall } from "lucide-react";
import { useState } from "react";
import React from "react";

type NavigationType = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const navigation: NavigationType[] = [
  { name: "Tour Packages", href: "/tour-packages", icon: Plane },
  { name: "Destinations", href: "/destinations", icon: MapPin },
];

function Navbar() {
  return (
    <>
      <header className=" relative container mx-auto py-6 inset-x-0  z-50">
        <nav className=" flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex lg:flex-1 gap-3 items-center">
            <Link href="/">
              <span className="sr-only">BlueLanka Travels & Tours </span>
              <Image
                alt="BlueLanka travels and tours"
                src="/logo.png"
                width={110}
                height={100}
              />
            </Link>
            <span className="hidden lg:inline-flex text-lg font-bold tracking-tighter text-blue-900">
              BlueLanka Travels & Tours
            </span>
          </div>

          <div className="hidden lg:flex lg:gap-x-8 items-center justify-center">
            <div className="hidden lg:flex lg:gap-x-8">
              {navigation
                .map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-base font-semibold leading-6 text-gray-900 hover:text-blue-600"
                  >
                    {item.name}
                  </Link>
                ))
                .slice(0, 3)}
            </div>
            {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end px-2 space-x-4">
              <Button
                asChild
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 bg-transparent"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                <Link href="/register">Register</Link>
              </Button>
            </div> */}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
