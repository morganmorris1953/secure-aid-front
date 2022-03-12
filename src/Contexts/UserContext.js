import { createContext } from 'react';



const UserContext = createContext({
  user: null, // default user value will be null
});

export default UserContext;