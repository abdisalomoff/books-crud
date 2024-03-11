import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetBooksQuery } from "../services/booksApi";
import { Book, BookStatus } from "../types";
import BookCard from "./BookCard";

interface Props {}

const BooksList: FC<Props> = () => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [filterStatus, setFilterStatus] = useState<BookStatus | null>(null);
  const { data, isLoading } = useGetBooksQuery({});

  useEffect(() => {
    if (filterStatus === null) {
      setFilteredBooks(data || []);
      return;
    } else {
      const filtered = data?.filter(
        (book: Book) => book.status === filterStatus
      );
      setFilteredBooks(filtered || []);
    }
  }, [filterStatus, data]);

  const handleChangeFilter = (status: BookStatus | null) => {
    setFilterStatus(status);
  };

  return (
    <Stack gap={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Typography variant="h5">My Books</Typography>

        <Link to="/search">
          <Button>Search a book</Button>
        </Link>
      </Box>

      {isLoading && <Typography>Loading...</Typography>}
      {!isLoading && (
        <Grid container spacing={2}>
          {data?.length === 0 && (
            <Grid item xs={12}>
              <Typography>You don't have any books yet</Typography>
            </Grid>
          )}
          {filteredBooks.map((book: Book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={book.isbn}>
              <BookCard book={book} added />
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
};

export default BooksList;
