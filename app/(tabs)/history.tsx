import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function History() {
  const [selectedDay, setSelectedDay] = useState('Hoy');
  const [historyData] = useState([
    {
      date: 'Hoy',
      meals: [
        { id: 1, name: 'Desayuno', time: '08:30', items: ['Avena con frutas', 'Cafe'], calories: 320 },
        { id: 2, name: 'Almuerzo', time: '13:45', items: ['Pollo a la plancha', 'Arroz integral', 'Ensalada'], calories: 580 },
        { id: 3, name: 'Cena', time: '19:20', items: ['Salmon', 'Vegetales al vapor'], calories: 450 },
      ],
      totalCalories: 1350,
    },
    {
      date: 'Ayer',
      meals: [
        { id: 4, name: 'Desayuno', time: '09:00', items: ['Huevos revueltos', 'Pan integral'], calories: 380 },
        { id: 5, name: 'Almuerzo', time: '14:00', items: ['Pasta con pollo'], calories: 620 },
        { id: 6, name: 'Cena', time: '20:00', items: ['Ensalada cesar'], calories: 340 },
      ],
      totalCalories: 1340,
    },
  ]);

  const currentData = historyData.find(d => d.date === selectedDay) || historyData[0];

  const deleteMeal = (mealId: number, mealName: string) => {
    Alert.alert(
      'Eliminar comida',
      `¿Seguro que quieres eliminar ${mealName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Eliminado', 'La comida ha sido eliminada');
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Historial</Text>
        <Text style={styles.subtitle}>Revisa tu progreso</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysScroll}>
        {['Hoy', 'Ayer', 'Hace 2 dias', 'Hace 3 dias'].map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.dayChip, selectedDay === day && styles.dayChipActive]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={[styles.dayChipText, selectedDay === day && styles.dayChipTextActive]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryTitle}>Resumen del dia</Text>
          <View style={styles.caloriesBadge}>
            <Text style={styles.caloriesBadgeText}>{currentData.totalCalories} cal</Text>
          </View>
        </View>
        
        <View style={styles.macrosRow}>
          <View style={styles.macroBox}>
            <Text style={styles.macroIcon}>💪</Text>
            <Text style={styles.macroValue}>85g</Text>
            <Text style={styles.macroLabel}>Proteinas</Text>
          </View>
          <View style={styles.macroBox}>
            <Text style={styles.macroIcon}>🍞</Text>
            <Text style={styles.macroValue}>145g</Text>
            <Text style={styles.macroLabel}>Carbos</Text>
          </View>
          <View style={styles.macroBox}>
            <Text style={styles.macroIcon}>🥑</Text>
            <Text style={styles.macroValue}>42g</Text>
            <Text style={styles.macroLabel}>Grasas</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.mealsContainer}>
        <Text style={styles.sectionTitle}>Comidas registradas</Text>
        
        {currentData.meals.map((meal) => (
          <View key={meal.id} style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <View>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealTime}>🕐 {meal.time}</Text>
              </View>
              <View style={styles.mealCalories}>
                <Text style={styles.mealCaloriesText}>{meal.calories}</Text>
                <Text style={styles.mealCaloriesLabel}>cal</Text>
              </View>
            </View>

            <View style={styles.mealItems}>
              {meal.items.map((item, index) => (
                <View key={index} style={styles.mealItem}>
                  <Text style={styles.mealItemDot}>•</Text>
                  <Text style={styles.mealItemText}>{item}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteMeal(meal.id, meal.name)}
            >
              <Text style={styles.deleteButtonText}>🗑️ Eliminar</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>📊 Estadisticas</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Promedio semanal</Text>
            <Text style={styles.statValue}>1,450 cal/dia</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Dias registrados</Text>
            <Text style={styles.statValue}>28 dias</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Racha actual</Text>
            <Text style={styles.statValue}>7 dias 🔥</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
  daysScroll: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dayChip: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  dayChipActive: {
    backgroundColor: '#00d9ff',
    borderColor: '#00d9ff',
  },
  dayChipText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
  },
  dayChipTextActive: {
    color: '#000',
  },
  summaryCard: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00d9ff',
    marginBottom: 20,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00d9ff',
  },
  caloriesBadge: {
    backgroundColor: '#00d9ff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  caloriesBadgeText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  macroBox: {
    alignItems: 'center',
  },
  macroIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  macroValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 12,
    color: '#888',
  },
  mealsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  mealCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  mealTime: {
    fontSize: 14,
    color: '#888',
  },
  mealCalories: {
    alignItems: 'center',
  },
  mealCaloriesText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00d9ff',
  },
  mealCaloriesLabel: {
    fontSize: 12,
    color: '#888',
  },
  mealItems: {
    marginBottom: 15,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealItemDot: {
    color: '#00d9ff',
    fontSize: 20,
    marginRight: 10,
  },
  mealItemText: {
    color: '#aaa',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#2a1a1a',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff4757',
  },
  deleteButtonText: {
    color: '#ff4757',
    fontSize: 14,
    fontWeight: '600',
  },
  statsCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
    marginBottom: 100,
    borderWidth: 1,
    borderColor: '#333',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  statLabel: {
    color: '#888',
    fontSize: 14,
  },
  statValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});