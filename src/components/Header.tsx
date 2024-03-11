import { AppBar, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import UserMenu from "./heading/UserMenu";
import useAuth from "../hooks/useAuth";

interface Props {}

const Header: FC<Props> = () => {
  const { user } = useAuth();

  return (
    <AppBar position="sticky" sx={{ backgroundColor:  "#4caf50"  }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <AutoStoriesIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Books Crud
        </Typography>
        {user && <UserMenu />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
