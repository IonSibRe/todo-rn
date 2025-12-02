import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const STORAGE_KEY = "@todolist";

// Typ úkolu
type Todo = {
  id: string;
  text: string;
  createdAt: string;
};

export default function TodoListScreen() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Načtení dat při startu appky
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json !== null) {
        setTodos(JSON.parse(json));
      }
    } catch (e) {
      Alert.alert("Chyba", "Nepodařilo se načíst úkoly");
    }
  };

  const saveTodos = async (newTodos: Todo[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
    } catch (e) {
      Alert.alert("Chyba", "Nepodařilo se uložit úkoly");
    }
  };

  const addOrEditTodo = () => {
    if (text.trim().length === 0) return;

    if (editingId) {
      // Editace existujícího úkolu
      const updatedTodos = todos.map((todo) =>
        todo.id === editingId ? { ...todo, text } : todo
      );
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
      setEditingId(null);
    } else {
      // Přidání nového úkolu
      const newTodo: Todo = {
        id: Date.now().toString(),
        text,
        createdAt: new Date().toLocaleString(),
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
    }

    setText("");
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const startEditing = (todo: Todo) => {
    setText(todo.text);
    setEditingId(todo.id);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Todo List</Text>

      <TextInput
        placeholder="Zadejte úkol..."
        value={text}
        onChangeText={setText}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <Button
        title={editingId ? "Uložit změny" : "Přidat úkol"}
        onPress={addOrEditTodo}
      />

      <ScrollView style={{ marginTop: 20 }}>
        {todos.map((todo) => (
          <View
            key={todo.id}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 8,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16 }}>{todo.text}</Text>
              <Text style={{ fontSize: 12, color: "#888" }}>
                Vytvořeno: {todo.createdAt}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => startEditing(todo)}
                style={{ marginRight: 10 }}
              >
                <Text style={{ color: "blue" }}>Upravit</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
                <Text style={{ color: "red" }}>Smazat</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
