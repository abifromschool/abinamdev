import ProjectCard from "../components/projectcard";
import { projects } from "../data/projects";
import Header from "../components/header";

export default function Projects() {
  const left = projects.filter((_, i) => i % 2 === 0);
  const right = projects.filter((_, i) => i % 2 === 1);

  return (
    <main className="mx-auto max-w-[1040px] px-8 pb-24 pt-40">
      <Header />
      <h1 className="text-5xl leading-none">projects</h1>
      <p className="mt-3 text-lg opacity-70">some stuff i made</p>

      <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-start">
        <div className="flex flex-1 flex-col gap-8">
          {left.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-8 md:mt-20">
          {right.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
