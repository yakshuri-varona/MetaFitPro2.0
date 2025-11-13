import React, { useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const FOOD_DB = [
  { id: '1', name: 'Manzana', calories: 52, protein: 0.3, fat: 0.2, carbs: 14 },
  { id: '2', name: 'Huevo', calories: 155, protein: 13, fat: 11, carbs: 1.1 },
  { id: '3', name: 'Cerveza', calories: 43, protein: 0.5, fat: 0, carbs: 3.6 },
  { id: '4', name: 'Pollo (100g)', calories: 165, protein: 31, fat: 3.6, carbs: 0 },
  { id: '5', name: 'Arroz cocido', calories: 130, protein: 2.7, fat: 0.3, carbs: 28 },
  { id: '6', name: 'Pan integral', calories: 69, protein: 3.6, fat: 1.1, carbs: 12 },
  { id: '7', name: 'Leche (100ml)', calories: 42, protein: 3.4, fat: 1, carbs: 5 },
  { id: '8', name: 'Tomate', calories: 18, protein: 0.9, fat: 0.2, carbs: 3.9 },
  { id: '9', name: 'Pizza (100g)', calories: 266, protein: 11, fat: 10, carbs: 33 },
];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(FOOD_DB);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFood, setActiveFood] = useState(null);
  const [quantity, setQuantity] = useState('100');
  const [mealItems, setMealItems] = useState([]);

  const onSearchChange = (text: string) => {
    setQuery(text);
    if (!text.trim()) {
      setResults(FOOD_DB);
      return;
    }
    const filtered = FOOD_DB.filter((f) =>
      f.name.toLowerCase().includes(text.toLowerCase())
    );
    setResults(filtered);
  };

  const openAddModal = (food: any) => {
    setActiveFood(food);
    setQuantity('100');
    setModalVisible(true);
  };

  const addItemToMeal = () => {
    if (!activeFood) return;
    const qty = parseFloat(quantity) || 100;
    const factor = qty / 100;
    const item = {
      id: `${activeFood.id}_${Date.now()}`,
      name: activeFood.name,
      quantity: qty,
      calories: (activeFood.calories * factor).toFixed(1),
      protein: (activeFood.protein * factor).toFixed(1),
      fat: (activeFood.fat * factor).toFixed(1),
      carbs: (activeFood.carbs * factor).toFixed(1),
    };
    setMealItems([item, ...mealItems]);
    setModalVisible(false);
    Keyboard.dismiss();
  };

  const removeItem = (id: string) => {
    setMealItems(mealItems.filter((i) => i.id !== id));
  };

  const totals = mealItems.reduce(
    (acc, i) => {
      acc.calories += parseFloat(i.calories);
      acc.protein += parseFloat(i.protein);
      acc.fat += parseFloat(i.fat);
      acc.carbs += parseFloat(i.carbs);
      return acc;
    },
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Registrar Comida</Text>

        <TextInput
          style={styles.search}
          placeholder="Buscar alimento..."
          value={query}
          onChangeText={onSearchChange}
        />

        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => openAddModal(item)}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSub}>
                {item.calories} kcal · P {item.protein}g · G {item.fat}g · C {item.carbs}g
              </Text>
            </TouchableOpacity>
          )}
          scrollEnabled={false}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comida actual</Text>

          {mealItems.length === 0 ? (
            <Text style={styles.empty}>No has agregado alimentos aún</Text>
          ) : (
            mealItems.map((i) => (
              <View key={i.id} style={styles.item}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>{i.name} • {i.quantity}g</Text>
                  <Text style={styles.itemSub}>
                    {i.calories} kcal · P {i.protein}g · G {i.fat}g · C {i.carbs}g
                  </Text>
                </View>
                <TouchableOpacity onPress={() => removeItem(i.id)}>
                  <Text style={styles.remove}>✖</Text>
                </TouchableOpacity>
              </View>
            ))
          )}

          {mealItems.length > 0 && (
            <View style={styles.totals}>
              <Text style={styles.totalText}>Calorías: {totals.calories.toFixed(1)} kcal</Text>
              <Text style={styles.totalText}>Proteína: {totals.protein.toFixed(1)} g</Text>
              <Text style={styles.totalText}>Grasa: {totals.fat.toFixed(1)} g</Text>
              <Text style={styles.totalText}>Carbs: {totals.carbs.toFixed(1)} g</Text>
            </View>
          )}
        </View>

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalBg}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Agregar alimento</Text>
              <Text style={styles.modalFood}>{activeFood?.name}</Text>
              <Text style={styles.modalSub}>
                {activeFood?.calories} kcal · P {activeFood?.protein}g · G {activeFood?.fat}g · C {activeFood?.carbs}g
              </Text>

              <Text style={styles.modalLabel}>Cantidad (gramos)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
              />

              <View style={styles.modalBtns}>
                <TouchableOpacity style={styles.addBtn} onPress={addItemToMeal}>
                  <Text style={styles.addText}>Agregar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.addBtn, { backgroundColor: '#ccc' }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={[styles.addText, { color: '#333' }]}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', paddingBottom: 60 },
  header: { fontSize: 22, fontWeight: '800', color: '#0b3d2e', textAlign: 'center', marginBottom: 15 },
  search: {
    backgroundColor: '#f2f5f3',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#d7efe6',
    color: '#0b3d2e',
  },
  card: {
    backgroundColor: '#f8fbfa',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e6f5ee',
    marginTop: 10,
  },
  cardTitle: { fontWeight: '700', color: '#0b3d2e' },
  cardSub: { color: '#4b6b60', fontSize: 12, marginTop: 4 },
  section: { marginTop: 20 },
  sectionTitle: { fontWeight: '800', fontSize: 18, color: '#0b3d2e', marginBottom: 8 },
  empty: { color: '#666', fontStyle: 'italic' },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fbfffd',
    borderWidth: 1,
    borderColor: '#e6f5ee',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  itemTitle: { color: '#0b3d2e', fontWeight: '700' },
  itemSub: { color: '#4b6b60', fontSize: 12 },
  remove: { color: '#b33a3a', fontSize: 18, marginLeft: 10 },
  totals: { marginTop: 10, backgroundColor: '#f2faf7', borderRadius: 10, padding: 10 },
  totalText: { color: '#0b3d2e', fontWeight: '700', marginBottom: 4 },

  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalCard: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e6f5ee',
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#0b3d2e' },
  modalFood: { fontSize: 16, fontWeight: '700', color: '#0b3d2e', marginTop: 6 },
  modalSub: { color: '#4b6b60', marginVertical: 6, textAlign: 'center' },
  modalLabel: { color: '#4b6b60', marginTop: 8 },
  input: {
    width: '60%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#d7efe6',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    backgroundColor: '#f7fbfa',
    color: '#0b3d2e',
  },
  modalBtns: { flexDirection: 'row', marginTop: 15 },
  addBtn: { backgroundColor: '#0b7f55', padding: 10, borderRadius: 10, marginHorizontal: 5 },
  addText: { color: '#fff', fontWeight: '800' },
});
