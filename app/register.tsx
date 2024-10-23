import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";

import { BlurView } from "expo-blur";
import { register } from "@/services/api";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin() {
    try {
      console.log({
        first_name: firstName,
        last_name: lastName,
        email, 
        password,
      })
      const response = await register({
        first_name: firstName,
        last_name: lastName,
        email, 
        password,
      });

      router.push("/login")
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
        className="items-center justify-center rounded-lg h-[40Svh] w-3/4 p-2 overflow-hidden"
      >
        <Text className="text-xl text-zinc-900 font-medium mb-4">
          Your first time here?
        </Text>

        <TextInput 
          placeholder="First Name"
          className="bg-slate-300 rounded mb-1 h-10 w-full p-2"
          onChangeText={setFirstName}
        />

        <TextInput 
          placeholder="LastName"
          className="bg-slate-300 rounded mb-1 h-10 w-full p-2"
          onChangeText={setLastName}
        />

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
            Register
          </Text>
        </TouchableOpacity>

        <View className="flex-row gap-2 mt-1">
          <Text className="text-zinc-900">
            Already have an account?
          </Text>
          <Link 
            href={"/login"}
            className="text-blue-700 font-medium"
          >
            Login
          </Link>
        </View>
      </BlurView>
    </ImageBackground>
  )
}