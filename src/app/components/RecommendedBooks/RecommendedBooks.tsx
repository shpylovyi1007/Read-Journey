"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getBooks } from "@/app/redux/books/operations";
import { selectBooks } from "@/app/redux/books/selectors";
import { useEffect, useState } from "react";
import css from "./RecommendedBooks.module.css";
import Image from "next/image";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function RecommendedBooks() {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const truncateToFirstDot = (text: string) => {
    const dotIndex = text.indexOf(".");
    return dotIndex !== -1 ? text.slice(0, dotIndex) : text;
  };

  useEffect(() => {
    dispatch(getBooks({ page: 1 }));
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Recommended</h2>
      <ul className={css.list}>
        {books.map((book) => {
          return (
            <li className={css.item} key={book.id}>
              <button onClick={handleOpen} className={css.button}>
                <Image
                  className={css.image}
                  width={150}
                  height={208}
                  src={book.imageUrl}
                  alt={`${book.title} by ${book.author}`}
                  priority={true}
                />
                <p className={css.bookTitle}>
                  {truncateToFirstDot(book.title)}
                </p>
                <p className={css.author}>{book.author}</p>
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <button className={css.close} onClick={handleClose}>
                    <svg width={28} height={28}>
                      <use href="symbol-defs.svg#close"></use>
                    </svg>
                  </button>
                  <Image
                    className={css.image}
                    width={150}
                    height={208}
                    src={book.imageUrl}
                    alt={`${book.title} by ${book.author}`}
                    priority={true}
                  />
                  <p className={css.bookTitle}>
                    {truncateToFirstDot(book.title)}
                  </p>
                  <p className={css.author}>{book.author}</p>
                </Box>
              </Modal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
