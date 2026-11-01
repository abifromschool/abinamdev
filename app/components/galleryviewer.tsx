"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Photo } from "../data/gallery";

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "previous photo" : "next photo"}
      className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#214e4b] text-[#8fc2b8] shadow-[inset_0_0_0_1px_rgba(143,194,184,0.35)] transition hover:bg-[#2a625e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8fc2b8]"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path
          d={
            direction === "prev"
              ? "M14.5 5.5L8 12l6.5 6.5"
              : "M9.5 5.5L16 12l-6.5 6.5"
          }
        />
      </svg>
    </button>
  );
}

export default function GalleryViewer({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = photos.length;

  const go = useCallback(
    (step: number) => setIndex((i) => (i + step + count) % count),
    [count],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    if (count < 2) return;
    for (const step of [-1, 1]) {
      new window.Image().src = photos[(index + step + count) % count].src;
    }
  }, [index, count, photos]);

  if (count === 0) return null;
  const photo = photos[index];
  const caption = [photo.place, photo.year].filter(Boolean).join(", ");

  return (
    <div className="mx-auto mt-10 max-w-[932px]">
      <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-5">
        <ArrowButton direction="prev" onClick={() => go(-1)} />

        <div
          className="order-first min-w-0 max-w-[780px] basis-full bg-[#214e4b] p-2 shadow-[0_22px_40px_rgba(0,0,0,0.4)] md:order-none md:flex-1 md:basis-auto md:p-3"
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
        >
          <div className="bg-[#ece7de] p-4 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.14)] md:p-[34px]">
            <div className="relative aspect-[3/2] bg-[#f6f3ee] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.22)]">
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 700px, 90vw"
                priority={index === 0}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <ArrowButton direction="next" onClick={() => go(1)} />
      </div>

      <div className="mt-5 flex justify-center md:justify-end md:pr-[76px]">
        <div className="w-[236px] bg-[#15161a] bg-[image:repeating-linear-gradient(0deg,rgba(255,255,255,0.035)_0,rgba(255,255,255,0.035)_1px,transparent_1px,transparent_3px)] px-[18px] py-4 font-sans text-[13px] leading-[1.4] text-[#f2f2f2] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),0_10px_22px_rgba(0,0,0,0.45)]">
          <p className="font-bold">{photo.title}</p>
          {caption && <p>{caption}</p>}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {photo.title}, photo {index + 1} of {count}
      </p>
    </div>
  );
}
