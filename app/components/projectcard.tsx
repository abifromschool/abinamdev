import Image from "next/image";
import type { Project } from "../data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const { name, blurb, href, image } = project;
  const cls =
    "block overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#8fc2b8]/50";

  const body = (
    <>
      <div className="relative aspect-[16/10] bg-white/5">
        {image && (
          <Image
            src={image}
            alt={`screenshot of ${name}`}
            fill
            sizes="(min-width: 768px) 472px, 100vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="px-[22px] pb-6 pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-[26px] font-medium">{name}</h2>
          {href && <span className="text-[15px] text-[#8fc2b8]">view →</span>}
        </div>
        <p className="mt-2 text-base leading-snug text-[#f4ece8]/75">{blurb}</p>
      </div>
    </>
  );

  return href ? (
    <a href={href} className={cls}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}
