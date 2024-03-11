import { ButtonTypeMap } from "@mui/material";

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export type User = {
  email: string;
  id: number;
  key: string;
  name: string;
  secret: string;
};

export type Book = {
  author: string;
  cover: string;
  isbn: string;
  published: number;
  title: string;
  id: number;
  status: BookStatus;
};

export type BookStatuses = Record<
  number,
  {
    label: string;
    color: ButtonTypeMap["props"]["color"];
  }
>;

export type BookStatus = keyof BookStatuses;

export type BookContainer = {
  book: Book;
  status: BookStatus;
};
