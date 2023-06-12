import { User } from 'firebase/auth'
import { createContext, useContext } from 'react'

export type Profile = {
  name: string
  email?: string
  groups?: string[]
}

const AppState = createContext({
  user: null as User | null,
  profile: null as Profile | null
})

export const AppStateProvider = AppState.Provider

export const useAppState = () => useContext(AppState)
