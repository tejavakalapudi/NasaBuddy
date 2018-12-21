import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import HomeScreen from './components/HomeScreen';
import NeoInfoByDate from './components/NeoInfoByDate';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 85 }}>
      <Scene>
        <Scene key="home" component={HomeScreen} title="Nasa Buddy" />
        <Scene key="neoByDate" component={NeoInfoByDate}/>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
