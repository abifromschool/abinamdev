export type Photo = {
  src: string;
  alt: string;
  title: string;
  place?: string;
  year?: string;
};

export const photos: Photo[] = [
  {
    src: "/gallery/picture-1.jpg",
    alt: "bridge over a river sourrounded by clouds",
    title: "Gorge",
    place: "Kentucky",
    year: "2026",
  },
  {
    src: "/gallery/picture-2.jpg",
    alt: "guy putting on a green for par",
    title: "Par",
    place: "Blacklick Golf Course",
    year: "2026",
  },
  {
    src: "/gallery/picture-3.jpg",
    alt: "yikes!",
    title: "Yikes!",
    place: "Downtown Columbus",
    year: "2025",
  },
  {
    src: "/gallery/picture-4.jpg",
    alt: "no swimming sign next to water",
    title: "No Swimming",
    place: "Chicago",
    year: "2025",
  },
];
