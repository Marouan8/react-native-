import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Pressable, Image } from "react-native";
import axios from "axios";

const App = (props) => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  const [text, setText] = useState({});
  const [send, setSend] = useState(false);

  const [pic, setPic] = useState("");
  const [pubs, setPubs] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://coffee.alexflipnote.dev/random.json"
      )
      .then(function (response) {
        setPic(response.data.file);
        if (text !== "" && pic !== "") {
          setPubs([{ text, pic }, ...pubs]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    setSend(false);
    setText("");
    setPic("");
  }, [send]);

  return (
    <View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          margin: 10,
        }}
      >
        <TextInput
          style={{
            width: "25%",
            height: 30,
            padding: 4,
            borderWidth: 2,
            borderColor: "black",
          }}
          onChangeText={(text) => {
            setText(text);
          }}
          value={text}
          placeholder="What's up?"
          maxLength='30'
        />
        <Pressable
          style={{
            width: "5%",
            height: 30,
            padding: 4,
            backgroundColor: "blue",
            color: "white",
            marginLeft: 7,
            alignItems: "center",
          }}
          onPress={() => {
            setSend(true);
            console.log(text, pic);
            console.log(pubs);
          }}
        >
          <Text style={{ color: "white" }}>Publier</Text>
        </Pressable>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {pubs.length > 0 &&
          pubs.map((item) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "16%",
                height: 260,
                flexDirection: "column",
                borderWidth: 1,
                borderColor: "black",
                margin: 10,
                borderRadius: 7,
              }}
            >
              <Text style={{ marginBottom: 2 }}>{item.text}</Text>
              <Image
                source={{ uri: item.pic }}
                style={{ width: 224, height: 234, marginBottom: 3 }}
              ></Image>
            </View>
          ))}
      </View>
    </View>
  );
};

export default App;
