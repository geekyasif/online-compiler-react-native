
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { StatusBar } from 'react-native';

import Compiler from './screens/Compiler';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <StatusBar barStyle="default"/>
      <Compiler />
  </ApplicationProvider>
  );
}
