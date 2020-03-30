import { createContext } from 'react';

export const UserContext = createContext(null);

export const User = () => {
  return {
    name: 'John Doe',
    email: 'Johnd@gmail.com'
  };
};
