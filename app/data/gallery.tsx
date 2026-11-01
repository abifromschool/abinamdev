export type Photo = {
  src: string;
  alt: string;
  title: string;
  place?: string;
  year?: string;
};

export const photos: Photo[] = [
  {
    src: "/gallery/01.jpg",
    alt: "[describe the photo]",
    title: "[Title of the photo]",
    place: "[Place]",
    year: "[Year]",
  },
];
