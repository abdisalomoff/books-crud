import { Book, Logout, Menu as MenuIcon, Search } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface Props {}

const UserMenu: FC<Props> = () => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        sx={{ ml: "auto" }}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            "& .MuiMenu-list": { py: 0 },
            "& a": {
              textDecoration: "none",
              color: "inherit",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ mr: 1 }} /> {user?.name}
        </MenuItem>
        <Divider />
        <Link to="/">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Book fontSize="small" />
            </ListItemIcon>
            My Books
          </MenuItem>
        </Link>
        <Link to="/search">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Search fontSize="small" />
            </ListItemIcon>
            Search a book
          </MenuItem>
        </Link>
        <Divider />
        <Link to="/logout">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
};

export default UserMenu;
