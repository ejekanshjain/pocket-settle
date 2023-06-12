import { doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { z } from 'zod'
import { Profile as TProfile, useAppState } from '../context/App'
import { firestore } from '../lib/firebase'

const ProfileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional()
})

export const Profile = () => {
  const { user, profile: userProfile } = useAppState()

  const [profile, setProfile] = useState<TProfile>(
    userProfile
      ? {
          name: userProfile.name || '',
          email: userProfile.email || undefined
        }
      : {
          name: user?.displayName || '',
          email: user?.email || undefined
        }
  )
  const [saving, setSaving] = useState(false)

  return (
    <View>
      {/* Name */}
      <TextInput
        style={{
          width: 240,
          borderColor: 'black',
          borderWidth: 1
        }}
        textContentType="name"
        autoComplete="name"
        placeholder="Enter name"
        returnKeyType="done"
        value={profile.name}
        onChangeText={text =>
          setProfile(prev => ({
            ...prev,
            name: text
          }))
        }
      />

      {/* Email */}
      <TextInput
        style={{
          width: 240,
          borderColor: 'black',
          borderWidth: 1
        }}
        textContentType="emailAddress"
        keyboardType="email-address"
        autoComplete="email"
        placeholder="Enter email"
        returnKeyType="done"
        value={profile.email}
        onChangeText={text =>
          setProfile(prev => ({
            ...prev,
            email: text.toLowerCase().trim() || undefined
          }))
        }
      />

      <TouchableOpacity
        disabled={saving}
        onPress={async () => {
          if (!user) return

          const parsedProfile = ProfileSchema.safeParse(profile)

          if (parsedProfile.success) {
            setSaving(true)
            await setDoc(
              doc(firestore, 'profiles', user.uid),
              parsedProfile.data,
              {
                merge: true
              }
            )
            setSaving(false)
          }
        }}
      >
        <Text>Update Profile</Text>
      </TouchableOpacity>
    </View>
  )
}
