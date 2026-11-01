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
    blurb: "in game editor was lacking, so i made a better one.",
    href: "https://github.com/abifromschool/MotorDecals",
  },
  {
    name: "CIV",
    blurb:
      "hitbox compatibility for create contraptions and Immersive vehicles.",
    href: "https://github.com/abifromschool/civ",
  },
];
