import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";

const STORAGE_KEY_LAST = "@lastQuote";

export default function HomeScreen() {
  const [quote, setQuote] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [offline, setOffline] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  // 🔹 uložit citát offline
  const saveLastQuote = async (text: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_LAST, text);
    } catch {}
  };

  // 🔹 načíst poslední uložený citát
  const loadLastQuote = async () => {
    try {
      const cached = await AsyncStorage.getItem(STORAGE_KEY_LAST);
      if (cached) setQuote(cached);
    } catch {}
  };

  // 🔹 stáhnout citát z API
  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://api.quotable.io/random");
      const final = `${res.data.content} - ${res.data.author}`;

      setQuote(final);
      await saveLastQuote(final);

      setOffline(false);
    } catch (e) {
      setOffline(true);
      await loadLastQuote();
    } finally {
      setLoading(false);
    }
  };

  // 🔹 při načtení aplikace
  useEffect(() => {
    loadLastQuote();
    fetchQuote();

    // aktualizace času každou sekundu
    const timer = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const pad = (n: number) => n.toString().padStart(2, "0");
      setCurrentTime(`${pad(hours)}:${pad(minutes)}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 🔹 funkce pro pozdrav podle denní doby
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Dobré ráno";
    if (hour >= 12 && hour < 14) return "Dobré poledne";
    if (hour >= 14 && hour < 18) return "Dobré odpoledne";
    return "Dobrý večer";
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        marginTop: -70,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Nadpis */}
      <Text style={{ fontSize: 32, marginBottom: 10 }}>todo-rn</Text>

      {/* Pozdrav + čas */}
      <Text style={{ fontSize: 46, marginBottom: 20 }}>
        {getGreeting()}, nyní je {currentTime}
      </Text>

      {/* Offline varování */}
      {offline && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          ⚠ Offline – zobrazen uložený citát
        </Text>
      )}

      {/* Citát nebo spinner */}
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

      {/* Tlačítko pro načtení citátu */}
      <Button
        title="Načíst nový citát"
        onPress={fetchQuote}
        disabled={offline}
      />
    </View>
  );
}
