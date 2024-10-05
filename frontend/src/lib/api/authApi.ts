import { $api } from "./api";

interface IRequestPropsLogin {
  username: string
  password: string
}

interface IRequestPropsRegister extends IRequestPropsLogin {
  email: string
}

const register = ({ username, email, password }: IRequestPropsRegister) =>
  $api.post('/users/register/', {
    username,
    email,
    password,
  });


const login = ({ username, password }: IRequestPropsLogin) =>
  $api.post('/users/login/', {
    username,
    password,
  },{
    withCredentials:true
  }
);

const logout = () => $api.post('/users/logout/');

export {
  register,
  login,
  logout
}