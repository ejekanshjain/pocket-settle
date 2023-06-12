import { Drawer } from '../../components/Drawer'

export default function MainLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Home',
          title: 'Home'
        }}
      />
      <Drawer.Screen
        name="me"
        options={{
          drawerLabel: 'My Account',
          title: 'My Account'
        }}
      />
    </Drawer>
  )
}
