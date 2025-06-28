import { Alert, Button,  Field, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { LoginData } from "../services/AuthClient";
import { FC, useState } from "react";
interface Props {
  submitter: (loginData: LoginData) => Promise<boolean>;
}

const LoginForm: FC<Props> = ({submitter}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField
  } = useForm<LoginData>();
const [isAlert, setIsAlert] = useState<boolean>(false);
  const onSubmit = handleSubmit(async (data) => {
        const res = await submitter(data);
        if(!res) {
            setIsAlert(true);
        } else {
            reset();
        }
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field.Root invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Input {...register("email", { required: true })} onFocus={() => {resetField("email"); setIsAlert(false)}}/>
          <Field.ErrorText>Email is required</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <Input {...register("password")} type="password" onFocus={() => {resetField("password"); setIsAlert(false)}}/>
          <Field.ErrorText>Password is required</Field.ErrorText>
        </Field.Root>

        <Button type="submit">Submit</Button>
       { isAlert && <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Title>Wrong Credentials</Alert.Title>
        </Alert.Root>}
      </Stack>
    </form>
  );
};
export default LoginForm;
