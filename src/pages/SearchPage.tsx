import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import {
  useFindBooksMutation,
  useGetBooksQuery,
} from "../services/booksApi";
import BookCard from "../components/BookCard";
import { Book } from "../types";

interface Props {}

const SearchPage: FC<Props> = () => {
  const [title, setTitle] = useState("");
  const [find, { isLoading }] = useFindBooksMutation();
  const [result, setResult] = useState<Book[]>([]);

  const { data } = useGetBooksQuery({});
  const myBooks = data || [];

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSearch = (event: SyntheticEvent) => {
    event.preventDefault();
    find(title)
      .unwrap()
      .then((res) => {
        setResult(res.data);
      })
      .catch(console.error);
  };

  return (
    <Stack gap={3}>
      <Typography variant="h5">Find a book</Typography>

      <Box component="form" display="flex" gap={1} onSubmit={handleSearch}>
        <TextField
          placeholder="Search a book"
          size="small"
          value={title}
          onChange={handleChangeTitle}
        />
        <Button variant="contained" type="submit" disabled={isLoading}>
          Search
        </Button>
      </Box>

      {isLoading && <Typography>Searching...</Typography>}
      {!isLoading && (
        <Grid container spacing={2}>
          {result.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={book.isbn}>
              <BookCard
                book={book}
                added={myBooks.some(
                  (myBook: Book) => myBook.isbn === book.isbn
                )}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
};

export default SearchPage;
