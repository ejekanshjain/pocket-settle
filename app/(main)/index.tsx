import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Group } from '../../components/Group'
import { NewGroup } from '../../components/NewGroup'
import { useAppState } from '../../context/App'
import { firestore } from '../../lib/firebase'

const TopTabs = createMaterialTopTabNavigator()

export default function Index() {
  const { user, profile } = useAppState()

  const [groups, setGroups] = useState<
    {
      id: string
      name: string
    }[]
  >([])

  useEffect(() => {
    const unsubs: any[] = []
    profile?.groups?.forEach(group => {
      const unsub = onSnapshot(doc(firestore, 'groups', group), d => {
        const docData = d.data()
        if (!docData) {
          setGroups(prev => {
            const index = prev.findIndex(g => g.id === d.id)
            if (index > -1) prev.splice(index, 1)
            return [...prev]
          })
          if (user?.uid)
            setDoc(
              doc(firestore, 'profiles', user.uid),
              {
                groups: profile.groups?.filter(pg => pg !== group)
              },
              {
                merge: true
              }
            )
        } else {
          setGroups(prev => {
            const index = prev.findIndex(g => g.id === d.id)
            if (index > -1) prev[index]!.name = docData.name
            else
              prev.push({
                id: d.id,
                name: docData.name
              })
            return [...prev]
          })
        }
      })
      unsubs.push(unsub)
    })

    return () => {
      unsubs.forEach(unsub => unsub())
    }
  }, [profile?.groups])

  if (!groups.length) return <NewGroup />

  return (
    <TopTabs.Navigator>
      {groups.map(g => (
        <TopTabs.Screen
          key={g.id}
          name={g.name}
          component={Group}
          initialParams={g}
        />
      ))}
      <TopTabs.Screen name="New Group" component={NewGroup} />
    </TopTabs.Navigator>
  )
}
