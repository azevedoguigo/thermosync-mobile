import axios from "axios";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import * as SecureStore from 'expo-secure-store';

export interface WeatherData {
  base: string;
  clouds: Clouds;
  cod: number;
  coord: Coord;
  dt: number;
  id: number;
  main: Main;
  name: string;
  sys: Sys;
  timezone: number;
  visibility: number;
  weather: Weather[];
  wind: Wind;
}

// Interfaces para cada sub-objeto da resposta
interface Clouds {
  all: number;
}

interface Coord {
  lat: number;
  lon: number;
}

interface Main {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface Sys {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface Wind {
  deg: number;
  speed: number;
}


export default function HomeScreen() {
  const [temperature, setTemperature] = useState<String>();
  const [isConnected, setIsConnected] = useState(false);

  const router = useRouter();

  const [weather, setWeather] = useState<WeatherData>();

  const apiKey = "4bea4613a324f1d35d031827f9ad4a1a";
  const city = 'Maceió';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const convertTimestampToTime = (timestamp: number, timezoneOffset: number): string => {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    
    return formattedTime;
  };
  

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        router.push("/login");
        return;
      }
    };

    const connectToWebsocket = () => {
      const websocket = new WebSocket("ws://192.168.0.108:3000/ws");

      websocket.onopen = () => {
        console.log("Opened websocket connection!");
        setIsConnected(true);
      };

      websocket.onmessage = (e) => {
        const wsData = JSON.parse(e.data);
        setTemperature(wsData.temperature);
      };

      websocket.onclose = () => {
        console.log("Closed websocket connection!");
        setIsConnected(false);
      };
    };

    const fecthWeater = async () => {
      try {
        const response = await axios.get(url);
        setWeather(response.data);
      } catch(err) {
        console.log(err);
      }
    };

    checkAuthentication();
    connectToWebsocket();
    fecthWeater();
  }, []);

  return (
    <ImageBackground 
      source={require("../../assets/images/bg-clouds.jpg")}
      resizeMode="cover"
      className="flex justify-center items-center h-full"
    >
      <View className="rounded-full p-4 border-4 border-slate-300">
        <BlurView intensity={100} className="flex items-center justify-center rounded-full p-4 h-56 w-56 overflow-hidden">
          <Text className="text-4xl text-gray-700">
            {temperature ? temperature : "--"} ºC
          </Text>
          <Text 
            className="text-gray-700 text-lg mt-3"
          >
            Ambient temperature
          </Text>
        </BlurView>
      </View>

      <View className="items-start w-full mt-16 mb-2">
        <Text className="ml-6 text-xl">Open Weather</Text>
      </View>

      <View className="flex-row gap-4">
        <BlurView
          intensity={118}
          className="justify-center items-center rounded-2xl w-44 h-20 p-2"
        >
          <Text 
            className="text-2xl text-zinc-800"
          > 
            {weather?.main.temp} ºC
          </Text>
          <Text className="text-zinc-800 text-lg">Actual temperature</Text>
        </BlurView>

        <BlurView 
          intensity={118}
          className="justify-center items-center rounded-2xl w-44 h-20 p-2"
        >
          <Text 
            className="text-2xl text-zinc-800"
          >
            {weather?.main.humidity}%
          </Text>
          <Text className="text-zinc-800 text-lg">Actual humidity</Text>
        </BlurView>
      </View>

      <View className="flex-row gap-4 mt-1">
        <BlurView 
          intensity={118}
          className="justify-center items-center rounded-2xl w-44 h-20 p-2"
        >
          <Text 
            className="text-2xl text-zinc-800"
          > 
            {weather?.main.pressure} mb
          </Text>
          <Text className="text-zinc-800 text-lg">Pressure</Text>
        </BlurView>

        <BlurView 
          intensity={118}
          className="justify-center items-center rounded-2xl w-44 h-20 p-2"
        >
          <Text 
            className="text-2xl text-zinc-800"
          >
            {weather?.wind.speed} km/h
          </Text>
          <Text className="text-zinc-800 text-lg">Wind speed</Text>
        </BlurView>
      </View>

      <View className="flex-row gap-4 mt-1">
        <BlurView 
          intensity={118}
          className="justify-center items-center rounded-2xl w-44 h-20 p-2"
        >
          <Text 
            className="text-2xl text-zinc-800"
          > 
            {convertTimestampToTime(weather?.sys.sunrise!, weather?.timezone!)}
          </Text>
          <Text className="text-zinc-800 text-lg">Sunrise</Text>
        </BlurView>

        <BlurView 
          intensity={118}
          className="justify-cente items-center rounded-2xl w-44 h-20 p-2"
        >
          <Text 
            className="text-2xl text-zinc-800"
          >
            {convertTimestampToTime(weather?.sys.sunset!, weather?.timezone!)}
          </Text>
          <Text className="text-zinc-800 text-lg">Sunset</Text>
        </BlurView>
      </View>
    </ImageBackground>
  );
}
