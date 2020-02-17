import React, {useState, useEffect, Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import MapView, {Marker, UrlTile} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
navigator.geolocation = require('@react-native-community/geolocation');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      currentMarker: {
        latitude: 0.01,
        longitude: 0.01,
      },
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        // alert(position)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      err => this.setState({error: err.message}),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 2000},
    );
  }

  render() {
    console.log(this.state.currentMarker);
    let markerPos = this.state.currentMarker;
    let markerPosLg = markerPos.longitude
    let markerPosLt = markerPos.latitude
    // let markerPosLong = markerPosLg.substring(6)
    // let markerPosLati = markerPosLt.substring(6)
    // const locationBox = () => {
    //   <View style={styles.box}>

    //   </View>
    // }

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
          mapType="none">
          <UrlTile
            urlTemplate={
              'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
            }
          />

          <Marker
            draggable
            coordinate={{
              latitude: this.state.latitude + 0.01,
              longitude: this.state.longitude + 0.01,
            }}
            title={'Marker'}
            onDrag={e =>
              this.setState({currentMarker: e.nativeEvent.coordinate})
            }
          />
          {/* <View style={styles.box}></View> */}
        </MapView>
        
        <View style={styles.box}>
          <Text style={styles.position}>
            ({markerPosLg}) - ({markerPosLt})
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  box: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#F1F1F1',
    width: "80%",
    height:50,
    opacity: 0.5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent:'center',
    padding: 10
  },
  position: {
    color: "black"
  }
});

export default App;
