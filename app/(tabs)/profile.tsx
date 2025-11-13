import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Profile() {
  const [name, setName] = useState('Usuario');
  const [email, setEmail] = useState('usuario@metafit.com');
  const [age, setAge] = useState('25');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [dailyGoal, setDailyGoal] = useState('2000');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    if (heightInMeters > 0 && weightInKg > 0) {
      return (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return '0';
  };

  const getBMICategory = (bmi: string) => {
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return { text: 'Bajo peso', color: '#ffd700' };
    if (bmiValue < 25) return { text: 'Normal', color: '#00d9ff' };
    if (bmiValue < 30) return { text: 'Sobrepeso', color: '#ff9f43' };
    return { text: 'Obesidad', color: '#ff4757' };
  };

  const saveProfile = () => {
    setIsEditing(false);
    Alert.alert('Guardado', 'Tu perfil ha sido actualizado correctamente');
  };

  const bmi = calculateBMI();
  const bmiCategory = getBMICategory(bmi);

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <TouchableOpacity style={styles.editAvatarButton}>
            <Text style={styles.editAvatarText}>📷</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userEmail}>{email}</Text>
      </View>

      <View style={styles.bmiCard}>
        <Text style={styles.sectionTitle}>Tu IMC (Indice de Masa Corporal)</Text>
        <View style={styles.bmiContent}>
          <View style={styles.bmiCircle}>
            <Text style={styles.bmiValue}>{bmi}</Text>
            <Text style={[styles.bmiCategory, { color: bmiCategory.color }]}>
              {bmiCategory.text}
            </Text>
          </View>
          <View style={styles.bmiInfo}>
            <Text style={styles.bmiInfoText}>Peso: {weight} kg</Text>
            <Text style={styles.bmiInfoText}>Altura: {height} cm</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Informacion Personal</Text>
          <TouchableOpacity 
            onPress={() => setIsEditing(!isEditing)}
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? '✓ Guardar' : '✏️ Editar'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nombre</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            value={name}
            onChangeText={setName}
            editable={isEditing}
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Correo electronico</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            value={email}
            onChangeText={setEmail}
            editable={isEditing}
            keyboardType="email-address"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputRow}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.inputLabel}>Edad</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={age}
              onChangeText={setAge}
              editable={isEditing}
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
          </View>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.inputLabel}>Peso (kg)</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={weight}
              onChangeText={setWeight}
              editable={isEditing}
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.inputLabel}>Altura (cm)</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={height}
              onChangeText={setHeight}
              editable={isEditing}
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
          </View>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.inputLabel}>Meta diaria (cal)</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={dailyGoal}
              onChangeText={setDailyGoal}
              editable={isEditing}
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
          </View>
        </View>

        {isEditing && (
          <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
            <Text style={styles.saveButtonText}>Guardar cambios</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuracion</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>🔔</Text>
            <View>
              <Text style={styles.settingTitle}>Notificaciones</Text>
              <Text style={styles.settingDescription}>Recibe recordatorios diarios</Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#333', true: '#00d9ff' }}
            thumbColor={notificationsEnabled ? '#fff' : '#666'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>🌙</Text>
            <View>
              <Text style={styles.settingTitle}>Modo oscuro</Text>
              <Text style={styles.settingDescription}>Tema de la aplicacion</Text>
            </View>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#333', true: '#00d9ff' }}
            thumbColor={darkMode ? '#fff' : '#666'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estadisticas Generales</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>📅</Text>
            <Text style={styles.statValue}>28</Text>
            <Text style={styles.statLabel}>Dias activo</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Racha actual</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🎯</Text>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Meta cumplida</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>⚡</Text>
            <Text style={styles.statValue}>42k</Text>
            <Text style={styles.statLabel}>Cal totales</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>📖</Text>
          <Text style={styles.menuText}>Guia de uso</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>❓</Text>
          <Text style={styles.menuText}>Preguntas frecuentes</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>💬</Text>
          <Text style={styles.menuText}>Contactar soporte</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>⭐</Text>
          <Text style={styles.menuText}>Calificar app</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => Alert.alert('Cerrar sesion', '¿Estas seguro de que quieres salir?', [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Salir', style: 'destructive' }
        ])}
      >
        <Text style={styles.logoutText}>Cerrar sesion</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Version 1.0.0</Text>
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#00d9ff',
  },
  avatarText: {
    fontSize: 50,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00d9ff',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatarText: {
    fontSize: 18,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
  },
  bmiCard: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00d9ff',
  },
  bmiContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bmiCircle: {
    alignItems: 'center',
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  bmiCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  bmiInfo: {
    gap: 8,
  },
  bmiInfoText: {
    fontSize: 14,
    color: '#aaa',
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#00d9ff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  editButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: 'row',
  },
  inputLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  inputDisabled: {
    backgroundColor: '#1a1a1a',
    opacity: 0.7,
  },
  saveButton: {
    backgroundColor: '#00d9ff',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    flex: 1,
  },
  settingIcon: {
    fontSize: 24,
  },
  settingTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  settingDescription: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  menuArrow: {
    fontSize: 24,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: '#2a1a1a',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff4757',
  },
  logoutText: {
    color: '#ff4757',
    fontSize: 16,
    fontWeight: 'bold',
  },
  version: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginTop: 20,
  },
  bottomSpacer: {
    height: 100,
  },
});