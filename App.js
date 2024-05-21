import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {MyContextControllerProvider} from './src/context/';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Router from './src/screens/Router';
import {StatusBar} from 'react-native';
import COLORS from './constants';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const initial = () => {
  const USERS = firestore().collection('USERS');
  const admin = {
    name: 'admin',
    phone: '0339854009',
    address: 'Hanoi',
    email: 'tvtai@gmail.com',
    password: '123456',
    role: 'admin',
  };
  USERS.doc(admin.email).onSnapshot(u => {
    if (!u.exists) {
      auth()
        .createUserWithEmailAndPassword(admin.email, admin.password)
        .then(() => {
          USERS.doc(admin.email).set(admin);
        });
    }
  });
};

const App = () => {
  useEffect(() => {
    initial();
  }, []);
  return (
    <PaperProvider>
      <StatusBar backgroundColor={COLORS.pink} />
      <MyContextControllerProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Router" component={Router} />
          </Stack.Navigator>
        </NavigationContainer>
      </MyContextControllerProvider>
    </PaperProvider>
  );
};

export default App;
// import 'react-native-gesture-handler';
// import React from 'react';
// import {MyContextControllerProvider} from './src/context/';
// import {Provider as PaperProvider} from 'react-native-paper';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Router from './src/screens/Router';
// import {StatusBar} from 'react-native';
// import COLORS from './constants';

// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <PaperProvider>
//       <StatusBar backgroundColor={COLORS.pink} />
//       <MyContextControllerProvider>
//         <NavigationContainer>
//           <Stack.Navigator screenOptions={{headerShown: false}}>
//             <Stack.Screen name="Router" component={Router} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </MyContextControllerProvider>
//     </PaperProvider>
//   );
// };

// export default App;
