import { createContext, useState } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const data = {

    }

  return (
    <AuthContext.Provider
        value={data}
    >
        {children}
    </AuthContext.Provider>
  )
}

export{AuthProvider};
