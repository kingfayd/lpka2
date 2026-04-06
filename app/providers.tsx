"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init({
        duration: 1000,
        once: true,
        easing: "ease-out-cubic",
      });
    }
  }, []);

  return <>{children}</>;
}