import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full flex justify-center gap-24 pt-12 text-xl">
      <Link
        className="transition ease-out duration 150 hover:scale-110"
        href="/projects"
      >
        projects
      </Link>
      <a className="hover:scale-110" href="https://github.com/abifromschool">
        git
      </a>
      <a
        className="hover:scale-110"
        href="https://www.linkedin.com/in/abinam-giri-78b18028b/"
      >
        linkedin
      </a>
    </header>
  );
}
