import { FC } from "react";
import AuthTabs from "../components/AuthTabs";
import BooksList from "../components/BooksList";
import useAuth from "../hooks/useAuth";

interface Props {}

const HomePage: FC<Props> = () => {
  const { user } = useAuth();

  if (!user) return <AuthTabs />;

  return <BooksList />;
};

export default HomePage;
