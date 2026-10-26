"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Globe = dynamic(() => import("./Globe"), { ssr: false });

/** Mounts the WebGL globe only when it approaches the viewport. */
export function LazyGlobe() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative aspect-square w-full" role="img" aria-label="Globe highlighting Pakistan as Assistora's headquarters, connected to service regions worldwide">
      <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(71,118,255,0.35),rgba(8,13,31,0)_70%)]" />
      {show && <Globe />}
    </div>
  );
}
