import { Box, Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { toast } from "react-toastify";
import {
  useAddBookMutation,
  useDeleteBookMutation,
} from "../services/booksApi";
import BookStatusButton from "../features/BookStatusButton";
import { Book } from "../types";

interface Props {
  book: Book;
  added?: boolean;
}

const BookCard: FC<Props> = ({ book, added }) => {
  const [add, { isLoading }] = useAddBookMutation();
  const [remove, { isLoading: isRemoving }] = useDeleteBookMutation();

  const handleAdd = () => {
    add({ isbn: book.isbn })
      .unwrap()
      .then(() => {
        toast.success(`Book "${book.title}" added to your list`);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.data.message);
      });
  };

  const handleDelete = () => {
    remove(book.id)
      .unwrap()
      .then(() => {
        toast.success(`Book "${book.title}" removed from your list`);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.data.message);
      });
  };

  return (
    <Stack position="relative" bgcolor="grey.200">
      {book.status !== undefined && <BookStatusButton book={book} />}
      <Box
        component="img"
        src={book.cover}
        alt={book.title}
        width={1}
        sx={{
          aspectRatio: "2/3",
        }}
      />
      <Stack
        gap={2}
        sx={{
          position: "absolute",
          bgcolor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          width: 1,
          height: 1,
          p: 2,
          pt: 3,
          opacity: 0,
          transition: "opacity 0.3s",
          lineHeight: 1,
          "&:hover": {
            opacity: 1,
          },
        }}
      >
        <Typography variant="subtitle1">{book.title}</Typography>
        <Typography>Author: {book.author}</Typography>
        <Typography>Publish year: {book.published}</Typography>
        <Typography>ISBN: {book.isbn}</Typography>

        {book.status === undefined && !added && (
          <Button
            variant="contained"
            size="small"
            sx={{ mt: "auto" }}
            onClick={handleAdd}
            disabled={isLoading}
          >
            Add
          </Button>
        )}
        {book.status !== undefined && added && (
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ mt: "auto" }}
            onClick={handleDelete}
            disabled={isRemoving}
          >
            Remove
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default BookCard;
