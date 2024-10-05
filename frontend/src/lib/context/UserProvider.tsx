import { createContext, ReactNode, useContext, useState } from "react"


interface IUserProviderProps {
  children: ReactNode
}

const UserContext = createContext({
  userInited: false,
  toggleUserInited: (value: boolean) => { },
})

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [userInited, setUserInited] = useState(false)

  const toggleUserInited = (value: boolean) => {
    setUserInited(value)
  }

  return (
    <UserContext.Provider value={{ userInited, toggleUserInited }} >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext);