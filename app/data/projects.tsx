export type Project = {
  name: string;
  blurb: string;
  href?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    name: "FuzzBot",
    blurb: "my friend kept winning....",
    href: "https://github.com/abifromschool/fuzzBot",
  },
  {
    name: "MT Draw",
    blurb: "in game editor was bad, so i made a better one.",
    href: "https://github.com/abifromschool/MotorDecals",
  },
];
