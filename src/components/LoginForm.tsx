import { Button, Stack, TextField } from "@mui/material";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetUserMutation } from "../services/authApi";
import useAuth from "../hooks/useAuth";
type Inputs = {
  key: string;
  secret: string;
};

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [login, { isLoading }] = useGetUserMutation();
  const { setUser } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    login(data)
      .unwrap()
      .then((res) => {
        setUser(res.data);
        sessionStorage.setItem("auth", JSON.stringify(res.data));
        toast.success("Login success");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.data.message);
      });
  };

  return (
    <Stack gap={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        label="Username"
        {...register("key", { required: "Username is required" })}
        error={Boolean(errors.key)}
        helperText={errors.key?.message}
      />

      <TextField
        variant="outlined"
        size="small"
        fullWidth
        label="Password"
        type="password"
        {...register("secret", { required: "Password is required" })}
        error={Boolean(errors.secret)}
        helperText={errors.secret?.message}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        disabled={isLoading}
      >
        Sign in
      </Button>
    </Stack>
  );
};

export default LoginForm;
