import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth, initializeAuth } from 'firebase/auth'
import { getReactNativePersistence } from 'firebase/auth/react-native'
import { getFirestore, initializeFirestore } from 'firebase/firestore'

if (getApps().length === 0) {
  const fireapp = initializeApp(Constants.manifest?.extra?.firebase)

  initializeAuth(fireapp, {
    persistence: getReactNativePersistence(AsyncStorage)
  })

  initializeFirestore(fireapp, {})
}

export const fireapp = getApp()
export const fireauth = getAuth()
export const firestore = getFirestore()
