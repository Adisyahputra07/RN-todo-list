import React, { useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import { List, Box, Text, HStack } from "native-base";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import Svg, { Circle, SvgUri } from "react-native-svg";
import axios from "axios";
import AddTodo from "../screens/AddTodo";
import iconTodo from "../assets/ICON.svg";

export default function ListTodo() {
  const url = "http://192.168.1.23:4000/api/v1/";

  const [todo, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState(false);

  const getTodos = () => {
    setIsLoading(true);
    axios
      .get(`${url}/todos`)
      .then((res) => {
        setTodos(res.data.data.todos);
        setIsLoading(false);
      })
      .catch(() => {
        alert("Data Not Found");
        setIsLoading(false);
      });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${url}/todo/${id}`);
      setAction(!action);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, [action]);

  return (
    <Box mt={5} mx={5} flex={1}>
      <HStack>
        <Text mb={2} fontWeight="bold" style={{ marginRight: 93, fontSize: 19, color: "#3F0713" }}>
          TODO LIST
        </Text>
        <AddTodo />
      </HStack>
      {todo?.length < 1 ? (
        <Box flex={1} alignItems="center" justifyContent="center" mt="10">
          <AntDesign name="frowno" size={100} color="#AA2B1D" />
          <Text alignItems="center" fontSize="20" mt="17" color="#AA2B1D">
            Upss List Is ...
          </Text>
          {/* <Image source={iconTodo} width="200" height="200" /> */}
        </Box>
      ) : (
        <FlatList
          style={{ marginTop: 20 }}
          data={todo}
          renderItem={({ item }) => (
            <List key={item.id.toString()} my={2} spacing={2} bg="primary.50" borderRadius={10}>
              <List.Item>
                <HStack space={6} w="100%">
                  <MaterialCommunityIcons
                    onPress={() => handleDelete(item.id)}
                    name="delete-empty"
                    size={24}
                    color="red"
                  />
                  <Text style={{ fontSize: 18, fontWeight: "700", marginLeft: -10, paddingTop: 3 }}>
                    {item.title}
                  </Text>
                </HStack>
              </List.Item>
            </List>
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshing={isLoading}
          onRefresh={getTodos}
        />
      )}
    </Box>
  );
}
