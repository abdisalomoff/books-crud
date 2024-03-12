import { Box, Container, Stack } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

const BaseLayout: FC = () => {
  return (
    <Stack
      gap={2}
      sx={{
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box component="main" flexGrow={1} mb={10}>
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Stack>
  );
};

export default BaseLayout;
