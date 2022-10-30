import _ from "lodash";

export const sorts = [
  {
    name: "قیمت", sort: (books, setFilteredBooks) =>
      setFilteredBooks(() => {
          const clonedBooks = _.cloneDeep(books);
          return clonedBooks.sort((a, b) => b.price - a.price);
        }
      )
    ,
  },
  {
    name: "تعداد ستاره", sort: (books, setFilteredBooks) => setFilteredBooks(() => {
        const clonedBooks = _.cloneDeep(books);
        return clonedBooks.sort((a, b) => b.rating - a.rating);
      }
    ),
  },
];

export const filters = [
  {
    name: "صوتی",
    sort: (books, setFilteredBooks) => setFilteredBooks(() => books.filter((a) => a.type !== "Text")),
  },
  {
    name: "متنی (EPUB)",
    sort: (books, setFilteredBooks) => setFilteredBooks(() => books.filter((a) => a.type === "Text")),
  },
  {
    name: "متنی (PDF)",
    sort: (books, setFilteredBooks) => setFilteredBooks(() => books.filter((a) => a.type === "Text")),
  },
];
