import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import HomeScreen from './components/HomeScreen';
import NeoInfoByDate from './components/NeoInfoByDate';
import MarsRovers from './components/MarsRovers';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{
      backgroundColor: '#fff', 
      paddingBottom: 30
    }}>
      <Scene>
        <Scene key="home" component={HomeScreen} title="Home" initial titleStyle={styles.navigationBarTitleStyle}/>
        <Scene key="neoByDate" component={NeoInfoByDate} titleStyle={styles.navigationBarTitleStyle}/>
        <Scene key="rovers" component={MarsRovers} title="Rovers" titleStyle={styles.navigationBarTitleStyle}/>
      </Scene>
    </Router>
  );
};

const styles = {
    navigationBarTitleStyle: {
      flex: 1,
      textAlign: 'center'
    }
};

export default RouterComponent;
