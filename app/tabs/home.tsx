import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, Text, View } from "react-native";

export default function HomeScreen() {
  const [quote, setQuote] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://api.quotable.io/random");
      setQuote(`${res.data.content} - ${res.data.author}`);
    } catch (e) {
      Alert.alert("Chyba", "Nepodařilo se načíst citát");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Vítejte v todo-rn</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text
          style={{
            fontSize: 18,
            fontStyle: "italic",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {quote}
        </Text>
      )}

      <Button title="Načíst nový citát" onPress={fetchQuote} />
    </View>
  );
}
