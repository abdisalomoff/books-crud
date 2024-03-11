import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import { BOOK_STATUSES } from "../../app/constants";
import { useEditBookStatusMutation } from "../../services/booksApi";
import { Book, BookStatus } from "../../types";

interface Props {
  book: Required<Book>;
}

const BookStatusButton: FC<Props> = ({ book }) => {
  const { id, status } = book;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [changeStatus] = useEditBookStatusMutation();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeStatus = (status: BookStatus) => {
    changeStatus({ id, status })
      .unwrap()
      .then(() => {
        toast.success(`Status changed to ${BOOK_STATUSES[status].label}`);
        handleClose();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.data.message);
      });
  };

  return (
    <>
      <Button
        color={BOOK_STATUSES[status].color}
        variant="contained"
        size="small"
        // disabled
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 1,
          py: 0.25,
          borderRadius: 0,
        }}
        onClick={handleClick}
      >
        {BOOK_STATUSES[status].label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
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
        <Typography sx={{ px: 2, pt: 1 }}>Change status to:</Typography>

        {Object.keys(BOOK_STATUSES).map((index) => (
          <MenuItem
            onClick={() => handleChangeStatus(+index)}
            sx={{ minHeight: 32, py: 0, justifyContent: "right" }}
            disabled={status === +index}
            key={index}
          >
            {BOOK_STATUSES[+index].label}
          </MenuItem>
        ))}
        {/* <MenuItem onClick={handleClose}>Search a book</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </>
  );
};

export default BookStatusButton;
