import { Container, Paper, Typography } from "@mui/material";
import { FC } from "react";
import UserMenu from "../features/UserMenu";
import useAuth from "../hooks/useAuth";

interface Props {}

const Header: FC<Props> = () => {
  const { user } = useAuth();
  return (
    <Paper
      component="header"
      sx={{ position: "sticky", top: 0, zIndex: 10, py: 1 }}
    >
      <Container maxWidth="xl" sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h4">Books Crud</Typography>

        {user && <UserMenu />}
      </Container>
    </Paper>
  );
};

export default Header;
