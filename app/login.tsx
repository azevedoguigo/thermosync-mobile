import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Button, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";

import * as SecureStore from 'expo-secure-store';
import { BlurView } from "expo-blur";
import { login } from "@/services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin() {
    try {
      const response = await login({email, password});
      await SecureStore.setItemAsync("token", response.token);
      router.push("/(tabs)/")
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground 
      source={require("../assets/images/bg-clouds.jpg")}
      resizeMode="cover"
      className="flex justify-center items-center h-full"
    >
      <BlurView 
        intensity={110} 
        className="items-center justify-center rounded-lg h-64 w-3/4 p-2 overflow-hidden"
      >
        <Text className="text-xl text-zinc-900 font-medium mb-4">
          Welcome back!
        </Text>

        <TextInput 
          placeholder="Email"
          className="bg-slate-300 rounded mb-1 h-10 w-full p-2"
          onChangeText={setEmail}
        />

        <TextInput 
          placeholder="Password"
          className="bg-slate-300 rounded mb-5 h-10 w-full p-2"
          secureTextEntry
          onChangeText={setPassword}
        />

        <TouchableOpacity 
          className="items-center justify-center bg-blue-700 rounded-lg h-10 w-full"
          onPress={() => handleLogin()}
        >
          <Text className="font-medium text-lg text-white">
            Login
          </Text>
        </TouchableOpacity>

        <View className="flex-row gap-2 mt-1">
          <Text className="text-zinc-900">Don't have account?</Text>
          <Link 
            href={"/_sitemap"}
            className="text-blue-700 font-medium"
          >
            Register Now
          </Link>
        </View>
      </BlurView>
    </ImageBackground>
  )
}