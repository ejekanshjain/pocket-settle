import { Stack, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { User, onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { PaperProvider } from 'react-native-paper'
import { AppStateProvider, Profile } from '../context/App'
import { fireauth, firestore } from '../lib/firebase'

export default function RootLayout() {
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      fireauth,
      user => {
        setUser(user)
        if (!user) setReady(true)
      }
    )

    return unsubscribeFromAuthStatusChanged
  }, [])

  useEffect(() => {
    if (!user) return

    setReady(false)

    const unsubscribeFromProfile = onSnapshot(
      doc(firestore, 'profiles', user.uid),
      doc => {
        setProfile(doc.exists() ? (doc.data() as any) : null)
        setReady(true)
      }
    )

    return unsubscribeFromProfile
  }, [user])

  useEffect(() => {
    const inLoadingGroup = segments[0] === '(loading)'
    const inAuthGroup = segments[0] === '(auth)'
    const inProfileGroup = segments[0] === '(profile)'

    if (!ready && !inLoadingGroup) router.replace('/loading')
    else if (ready && !user && !inAuthGroup) router.replace('/signin')
    else if (ready && user && !profile && !inProfileGroup)
      router.replace('/setup')
    else if (
      ready &&
      user &&
      profile &&
      (inLoadingGroup || inAuthGroup || inProfileGroup)
    )
      router.replace('/')
  }, [ready, user, profile, segments])

  return (
    <PaperProvider>
      <StatusBar style="dark" />
      <AppStateProvider
        value={{
          user,
          profile
        }}
      >
        <Stack>
          <Stack.Screen
            name="(auth)/signin"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="(loading)/loading"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="(profile)/setup"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="(main)"
            options={{
              headerShown: false
            }}
          />
        </Stack>
      </AppStateProvider>
    </PaperProvider>
  )
}
