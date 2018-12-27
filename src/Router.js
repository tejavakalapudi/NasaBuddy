import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import HomeScreen from './components/HomeScreen';
import NeoInfoByDate from './components/NeoInfoByDate';
import MarsRovers from './components/MarsRovers';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ 
      paddingTop: 85, 
      backgroundColor: '#fff', 
      paddingBottom: 30
    }}>
      <Scene>
        <Scene key="home" component={HomeScreen} title="Nasa Buddy" initial/>
        <Scene key="neoByDate" component={NeoInfoByDate}/>
        <Scene key="rovers" component={MarsRovers} title="Mars Rovers"/>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
