import React from 'react';
import {Alert} from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = "e17cd826f7b77eb22a7ada334284a278";

export default class extends React.Component {

  state = {
    isLoading: true,
  }

  getWeather = async(latitude, longitude) => {
    const {data} = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`);

    console.log(data);


  }

  getLocation = async() => {


    try {

      await Location.requestPermissionsAsync();

      const {coords: { latitude, longitude }} = await Location.getCurrentPositionAsync();

      this.setState({ isLoading: false });

      this.getWeather(latitude, longitude);
      

    } catch(error) {
      Alert.alert("Can't find you.", "So bad");

    }
    
  }


  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
  
}
