import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useAppState } from '../context/App'
import { firestore } from '../lib/firebase'

export const NewGroup = () => {
  const { profile, user } = useAppState()
  const [name, setName] = useState('')

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <TextInput
        mode="outlined"
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
        style={{ width: '75%' }}
        returnKeyType="done"
      />
      <Button
        style={{
          marginTop: 12
        }}
        mode="outlined"
        icon="plus"
        onPress={async () => {
          if (!user || !profile) return
          if (!name.trim()) return

          const docRef = await addDoc(collection(firestore, 'groups'), {
            name: name.trim(),
            owner: user.uid
          })

          const newGroups = profile?.groups
            ? [...profile.groups, docRef.id]
            : [docRef.id]

          const memberData = {
            name: profile.name,
            userId: user.uid
          }

          await addDoc(
            collection(firestore, 'groups', docRef.id, 'members'),
            memberData
          )

          await setDoc(
            doc(firestore, 'profiles', user.uid),
            {
              groups: newGroups
            },
            {
              merge: true
            }
          )

          setName('')
        }}
      >
        Create
      </Button>
    </View>
  )
}
