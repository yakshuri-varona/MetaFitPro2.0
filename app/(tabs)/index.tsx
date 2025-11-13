import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function Index() {
  const router = useRouter();
  const [dailyGoal] = useState(2000);
  const [consumed, setConsumed] = useState(850);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Buenos días');
    else if (hour < 18) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');
  }, []);

  const remaining = dailyGoal - consumed;
  const percentage = (consumed / dailyGoal) * 100;

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.userName}>Usuario</Text>
        </View>
        <View style={styles.streakBadge}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <Text style={styles.streakText}>7 días</Text>
        </View>
      </View>

      <View style={styles.mainCard}>
        <Text style={styles.cardTitle}>Calorías de Hoy</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressCircle}>
            <Text style={styles.caloriesNumber}>{consumed}</Text>
            <Text style={styles.caloriesLabel}>consumidas</Text>
          </View>
          
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min(percentage, 100)}%` }]} />
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{dailyGoal}</Text>
            <Text style={styles.statLabel}>Meta</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, remaining < 0 && styles.exceeded]}>
              {Math.abs(remaining)}
            </Text>
            <Text style={styles.statLabel}>
              {remaining >= 0 ? 'Restantes' : 'Excedidas'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.macrosCard}>
        <Text style={styles.cardTitle}>Macronutrientes</Text>
        
        <View style={styles.macroItem}>
          <View style={styles.macroInfo}>
            <Text style={styles.macroEmoji}>💪</Text>
            <Text style={styles.macroName}>Proteínas</Text>
          </View>
          <View style={styles.macroProgress}>
            <View style={[styles.macroBar, { width: '65%', backgroundColor: '#00d9ff' }]} />
            <Text style={styles.macroValue}>52g / 80g</Text>
          </View>
        </View>

        <View style={styles.macroItem}>
          <View style={styles.macroInfo}>
            <Text style={styles.macroEmoji}>🍞</Text>
            <Text style={styles.macroName}>Carbohidratos</Text>
          </View>
          <View style={styles.macroProgress}>
            <View style={[styles.macroBar, { width: '45%', backgroundColor: '#ffd700' }]} />
            <Text style={styles.macroValue}>90g / 200g</Text>
          </View>
        </View>

        <View style={styles.macroItem}>
          <View style={styles.macroInfo}>
            <Text style={styles.macroEmoji}>🥑</Text>
            <Text style={styles.macroName}>Grasas</Text>
          </View>
          <View style={styles.macroProgress}>
            <View style={[styles.macroBar, { width: '55%', backgroundColor: '#ff6b6b' }]} />
            <Text style={styles.macroValue}>33g / 60g</Text>
          </View>
        </View>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/search')}
        >
          <Text style={styles.actionEmoji}>➕</Text>
          <Text style={styles.actionText}>Agregar Comida</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/history')}
        >
          <Text style={styles.actionEmoji}>📊</Text>
          <Text style={styles.actionText}>Ver Historial</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tipsCard}>
        <Text style={styles.tipTitle}>💡 Consejo del día</Text>
        <Text style={styles.tipText}>
          Beber suficiente agua es esencial para mantener tu metabolismo activo. 
          Intenta tomar al menos 8 vasos de agua al día.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#888',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  streakBadge: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ff6b35',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  streakEmoji: {
    fontSize: 20,
  },
  streakText: {
    color: '#ff6b35',
    fontWeight: 'bold',
    fontSize: 14,
  },
  mainCard: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00d9ff',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00d9ff',
    marginBottom: 20,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressCircle: {
    alignItems: 'center',
    marginBottom: 20,
  },
  caloriesNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  caloriesLabel: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00d9ff',
    borderRadius: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  exceeded: {
    color: '#ff4757',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  macrosCard: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  macroItem: {
    marginBottom: 20,
  },
  macroInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  macroEmoji: {
    fontSize: 24,
  },
  macroName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  macroProgress: {
    position: 'relative',
  },
  macroBar: {
    height: 8,
    borderRadius: 10,
  },
  macroValue: {
    position: 'absolute',
    right: 0,
    top: -25,
    fontSize: 12,
    color: '#888',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  actionEmoji: {
    fontSize: 32,
    marginBottom: 10,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  tipsCard: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    marginBottom: 100,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ffd700',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 22,
  },
});