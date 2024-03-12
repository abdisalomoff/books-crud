import { Button, Stack, TextField } from "@mui/material";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "../../services/authApi";
import useAuth from "../../hooks/useAuth";

type Inputs = {
  name: string;
  email: string;
  key: string;
  secret: string;
};

const RegistrationForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { setUser } = useAuth();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    registerUser(data)
      .unwrap()
      .then((res) => {
        if (res.isOk) {
          setUser(res.data);
          sessionStorage.setItem("auth", JSON.stringify(res.data));
          toast.success("Registration successful");
        }
      })
      .catch(console.error);
  };

  return (
    <Stack gap={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        label="Name"
        {...register("name", { required: "Name is required" })}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
      />

      <TextField
        variant="outlined"
        size="small"
        fullWidth
        label="Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid email address",
          },
        })}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />

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
        Sign Up
      </Button>
    </Stack>
  );
};

export default RegistrationForm;
