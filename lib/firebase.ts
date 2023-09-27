import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { getApp, getApps, initializeApp } from 'firebase/app'
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth
} from 'firebase/auth'
import { getFirestore, initializeFirestore } from 'firebase/firestore'

if (getApps().length === 0) {
  const fireapp = initializeApp(Constants.expoConfig?.extra?.firebase)

  initializeAuth(fireapp, {
    persistence: getReactNativePersistence(AsyncStorage)
  })

  initializeFirestore(fireapp, {})
}

export const fireapp = getApp()
export const fireauth = getAuth()
export const firestore = getFirestore()
