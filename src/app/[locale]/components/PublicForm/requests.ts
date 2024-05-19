//* External
import { CookieValueTypes } from 'cookies-next';
//* App Custom
import { ChangeProps, ForgotProps, LoginProps } from './PublicForm';

export const loginRequest = async (data: LoginProps) => {
  const { email, password } = data;
  const userObtained = await fetch(
    `/api/user?email=${email}&password=${password}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
  ).then((res) => res.json());
  return userObtained;
};

export const forgotPwRequest = async (data: ForgotProps) => {
  const { email } = data;
  const response = await fetch(`/api/forgot_password?email=${email}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => res.json());
  return response;
};

interface Props {
  email: CookieValueTypes;
  token: CookieValueTypes;
}
export const changePasswordPwRequest = async ({
  params,
  data
}: {
  params: Props;
  data: ChangeProps;
}) => {
  const response = await fetch(
    `/api/change_password?token=${params.token}&email=${params.email}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }
  ).then((res) => res.json());
  return response;
};
