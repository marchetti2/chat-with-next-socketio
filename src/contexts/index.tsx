import React, { createContext, useContext, useState } from "react";

interface ContextContent {
  name: string
  message: string
  setUsername(content: string): void
  setMessage(content: string): void
}
const ContextName = createContext<ContextContent>({} as ContextContent)

const ContextNameProvider: React.FC = ({ children }) => {
  const [name, setName] = useState<string>('')
  const [message, setMsg] = useState<string>("")

  const setUsername = (content: string): void => {
    setName(content)
  }
  const setMessage = (content: string): void => {
    setMsg(content)
  }

  return (
    <ContextName.Provider value={{name, message, setUsername, setMessage}}>
      {children}
    </ContextName.Provider >
  )
}

const Context = ():ContextContent => {
  const context = useContext(ContextName)
  return context
}

export {ContextName, ContextNameProvider, Context }
