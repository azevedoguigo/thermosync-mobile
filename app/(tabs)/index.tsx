import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const [temperature, setTemperature] = useState<Number | undefined>();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const websocket = new WebSocket("ws://192.168.0.108:3000/ws");

    websocket.onopen = () => {
      console.log("Opened websocket connection!");
      setIsConnected(true);
    };

    websocket.onmessage = (e) => {
      setTemperature(e.data);
      console.log(e.data);
    };

    websocket.onclose = () => {
      console.log("Closed websocket connection!");
      setIsConnected(false);
    };
  }, []);

  return (
    <View className="flex justify-center items-center h-full">
      <LinearGradient colors={["#2563EB", "#1E40AF"]} className="rounded-full p-4">
        <View className="flex items-center justify-center rounded-full p-4 bg-slate-300 h-56 w-56">
          <Text className="text-4xl text-gray-700">
            {temperature ? temperature.toString().trim() : "--"} ºC
          </Text>
          <Text className="text-gray-700 text-lg mt-3">Temperatura ambiente</Text>
        </View>
      </LinearGradient>

      <View className="items-start w-full mt-16 mb-2">
        <Text className="ml-6">Via Open Weather</Text>
      </View>
      
      <View className="flex-row gap-4">
        <LinearGradient 
          colors={["#818cf8", "#6366f1"]}
          className="justify-center items-center bg-indigo-600 rounded-2xl w-44 h-20 p-2"
        >
          <Text className="text-2xl text-zinc-700">30 ºC</Text>
          <Text className="text-zinc-700 text-lg mt-2">Temperatura atual</Text>
        </LinearGradient>

        <LinearGradient 
          colors={["#818cf8", "#6366f1"]}
          className="justify-center items-center bg-indigo-600 rounded-2xl w-44 h-20 p-2"
        >
          <Text className="text-2xl text-zinc-700">60%</Text>
          <Text className="text-zinc-700 text-lg mt-2">Umidade atual</Text>
        </LinearGradient>
      </View>
    </View>
  );
}
