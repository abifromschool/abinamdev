import type { Metadata } from "next";
import Link from "next/link";
import GalleryViewer from "../components/galleryviewer";
import { photos } from "../data/gallery";

export const metadata: Metadata = {
  title: "Gallery | Abi's Portfolio",
};

export default function Gallery() {
  return (
    <main className="mx-auto max-w-[1108px] px-8 pb-16 pt-14">
      <div className="grid grid-cols-[1fr_auto_1fr] items-baseline gap-x-7">
        <Link
          href="/"
          className="justify-self-end text-[44px] leading-none tracking-[-0.01em] text-[#f4ece8]/60 transition hover:text-white"
        >
          home
        </Link>
        <h1 className="text-[44px] font-normal leading-none tracking-[-0.01em]">
          gallery
        </h1>
        <span />
      </div>

      <GalleryViewer photos={photos} />
    </main>
  );
}
