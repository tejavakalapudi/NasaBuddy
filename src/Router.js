import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import HomeScreen from './components/HomeScreen';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 85 }}>
      <Scene>
        <Scene key="home" component={HomeScreen} title="Nasa Buddy" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
