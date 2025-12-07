import type { Author } from "./Api";
import defaultAuthor from "/AuthorPlaceholder.png";

export const AUTHORS_MOCK: Author[] = [
  {
    id: 1,
    name: "Mock Author 1",
    image_url: defaultAuthor,
    count_v: 1,
    count_i: 2,
    count_no: 3,
    count_li: 4,
    count_da: 5,
    count_zhe: 6,
    count_ili: 7,
    count_libo: 8,
    about: "This is a mock author for development purposes.",
  },
  {
    id: 2,
    name: "Mock Author 2",
    image_url: defaultAuthor,
    count_v: 1,
    count_i: 2,
    count_no: 3,
    count_li: 4,
    count_da: 5,
    count_zhe: 6,
    count_ili: 7,
    count_libo: 8,
    about: "This is another mock author for development purposes.",
  },
];
