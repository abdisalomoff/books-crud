import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { booksApi } from "../services/booksApi";
import useAuth from "../hooks/useAuth";

interface Props {}

const LogoutPage: FC<Props> = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(null);
    sessionStorage.clear();
    dispatch(booksApi.util.resetApiState());
    navigate("/");
  }, []);

  return null;
};

export default LogoutPage;
