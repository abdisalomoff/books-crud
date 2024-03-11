import { Container, Stack, Tab, Tabs } from "@mui/material";
import { FC, SyntheticEvent, useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

interface Props {}

type TabVariant = "login" | "registration";

const AuthTabs: FC<Props> = () => {
  const [tab, setTab] = useState<TabVariant>("login");
  const handleChangeTab = (_event: SyntheticEvent, value: TabVariant) => {
    setTab(value);
  };

  return (
    <Container maxWidth="xs">
      <Stack gap={3}>
        <Tabs value={tab} onChange={handleChangeTab} variant="fullWidth">
          <Tab value="login" label="Login" />
          <Tab value="registration" label="Registration" />
        </Tabs>
        {tab === "login" && <LoginForm />}
        {tab === "registration" && <RegistrationForm />}
      </Stack>
    </Container>
  );
};

export default AuthTabs;
