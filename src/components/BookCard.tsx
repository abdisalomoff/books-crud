import { Box, Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { toast } from "react-toastify";
import {
  useAddBookMutation,
  useDeleteBookMutation,
} from "../services/booksApi";
import BookStatusButton from "../components/heading/BookStatusButton";
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
      .then(() => {
        toast.success(`Book "${book.title}" removed from your list`);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.data.message);
      });
  };

  return (
    <Stack position="relative" bgcolor="white" borderRadius="8px" boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)">
      {book.status !== undefined && <BookStatusButton book={book} />}
      <Box
        component="img"
        src={book.cover}
        alt={book.title}
        width={1}
        sx={{
          aspectRatio: "2/3",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      />
      <Stack
        gap={2}
        sx={{
          p: 2,
        }}
      >
        <Typography variant="h6">{book.title}</Typography>
        <Typography variant="subtitle1">Author: {book.author}</Typography>
        <Typography>Publish year: {book.published}</Typography>
        <Typography>ISBN: {book.isbn}</Typography>

        {book.status === undefined && !added && (
          <Button
            variant="contained"
            size="small"
            color="primary"
            sx={{ mt: "auto" }}
            onClick={handleAdd}
            disabled={isLoading}
          >
            Add to Library
          </Button>
        )}
        {book.status !== undefined && added && (
          <Button
            variant="contained"
            size="small"
            color="error"
            sx={{ mt: "auto" }}
            onClick={handleDelete}
            disabled={isRemoving}
          >
            Remove from Library
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default BookCard;