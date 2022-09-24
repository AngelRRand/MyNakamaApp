
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirebaseState from './src/context/firebase/firebaseState.js';
import PedidosbaseState from './src/context/pedidos/pedidosState.js';


import DetallesPlato from './src/view/DetallesPlato.jsx';
import RestaurantMenu from './src/view/RestaurantMenu.jsx';
import NuevaOrden from './src/view/NuevaOrden.jsx';
import ProgresoPedido from './src/view/ProgresoPedido.jsx';
import ResumenPedido from './src/view/ResumenPedido.jsx';
import BotonResumen from './src/component/BotonResumen.jsx';


const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <FirebaseState>
      <PedidosbaseState>

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0f0f0f'
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize:25,
              color: '#ffdc3d',
            },
            headerTintColor: '#ffdc3d'
          }}
        >
          <Stack.Screen
            name='nuevaOrden'
            component={NuevaOrden}
            options={{
              headerTitleAlign: 'center',
              title: 'NAKAMA RAMEN',
              
            }}
          />
          <Stack.Screen
            name='menu'
            component={RestaurantMenu}
            options={{
              title: 'Menu',
              headerRight: p => <BotonResumen/>
            }}
          />
          <Stack.Screen
            name='detallesPlato'
            component={DetallesPlato}
            options={{
              title: 'Detalles'
            }}
          />
          <Stack.Screen
            name='progresoPedido'
            component={ProgresoPedido}
            options={{
              title: 'Progreso Pedido'
            }}
          />
          <Stack.Screen
            name='resumenPedido'
            component={ResumenPedido}
            options={{
              title: 'Resumen Pedido'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>

      </PedidosbaseState>

    </FirebaseState>
  );
}