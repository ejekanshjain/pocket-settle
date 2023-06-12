import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Group } from '../../components/Group'
import { NewGroup } from '../../components/NewGroup'
import { useAppState } from '../../context/App'
import { firestore } from '../../lib/firebase'

const TopTabs = createMaterialTopTabNavigator()

export default function Index() {
  const { profile } = useAppState()

  const [groups, setGroups] = useState<
    {
      id: string
      name: string
    }[]
  >([])

  useEffect(() => {
    const unsubs: any[] = []
    profile?.groups?.forEach(group => {
      const unsub = onSnapshot(doc(firestore, 'groups', group), doc => {
        const docData = doc.data()
        if (!docData) return
        setGroups(prev => {
          const index = prev.findIndex(g => g.id === doc.id)
          if (index > -1) {
            prev[index]!.name = docData.name
          } else {
            prev.push({
              id: doc.id,
              name: docData.name
            })
          }
          return [...prev]
        })
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
