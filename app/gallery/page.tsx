import type { Metadata } from "next";
import Link from "next/link";
import GalleryViewer from "../components/galleryviewer";
import GrassField from "../components/grass";
import { photos } from "../data/gallery";

export const metadata: Metadata = {
  title: "Gallery | Abi's Portfolio",
};

export default function Gallery() {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 z-0">
        <GrassField />
      </div>

      <main className="relative z-10 mx-auto max-w-[1108px] px-8 pb-16 pt-14">
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/"
            className="text-xl transition ease-in-out hover:scale-110"
          >
            home
          </Link>
        </div>

        <GalleryViewer photos={photos} />
      </main>
    </div>
  );
}
