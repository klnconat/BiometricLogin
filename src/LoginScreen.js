import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import Logo from './components/Logo';
import CustomButton from './components/CustomButton';
import CustomTextInput from './components/CustomTextInput';

const rnBiometrics = new ReactNativeBiometrics();

const LoginScreen = () => {
  const [biometryType, setBiometryType] = useState(null);
  const [hasBiometricKey, setHasBiometricKey] = useState(false);
  const [publicKey, setPublicKey] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  useEffect(() => {
    checkBiometryAvailability();
    checkBiometricKey();
  }, []);

  const checkBiometryAvailability = async () => {
    const {available, biometryType} = await rnBiometrics.isSensorAvailable();
    if (available) {
      setBiometryType(biometryType);
    } else {
      setBiometryType('Unavailable');
    }
  };

  const checkBiometricKey = async () => {
    const {keysExist} = await rnBiometrics.biometricKeysExist();
    setHasBiometricKey(keysExist);
  };

  const createPublicKey = async () => {
    const {publicKey} = await rnBiometrics.createKeys();
    setPublicKey(publicKey);
    setHasBiometricKey(true);
    Alert.alert('Public Key Created', publicKey);
  };

  const deleteBiometricKeys = async () => {
    await rnBiometrics.deleteKeys();
    setPublicKey(null);
    setHasBiometricKey(false);
    Alert.alert('Keys Deleted', 'Biometric keys have been deleted.');
  };

  const createSignature = async () => {
    const payload = `user_id:123456;timestamp:${new Date().toISOString()}`;

    const {success, signature} = await rnBiometrics.createSignature({
      promptMessage: 'Signature Creation',
      payload: payload,
    });

    if (success) {
      Alert.alert('Signature Created', signature);
    } else {
      Alert.alert('Signature Failed', 'Failed to create signature');
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    Alert.alert('Login Successful', `Welcome, ${email}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Logo />
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => setSettingsModalVisible(true)}>
        <Text style={styles.settingsIconText}>⚙️</Text>
      </TouchableOpacity>

      <CustomTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <CustomTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <CustomButton title="Login" onPress={handleLogin} />

      {hasBiometricKey && (
        <CustomButton
          title={
            biometryType === BiometryTypes.FaceID
              ? 'Login with Face ID'
              : 'Login with Fingerprint'
          }
          onPress={createSignature}
          backgroundColor="#34c759"
        />
      )}

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={settingsModalVisible}
        onRequestClose={() => setSettingsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Biometric Settings</Text>
            <CustomButton title="Create Public Key" onPress={createPublicKey} />
            <CustomButton
              title="Delete Biometric Keys"
              onPress={deleteBiometricKeys}
              backgroundColor="#ff4d4d"
              disabled={!hasBiometricKey}
            />
            <CustomButton
              title="Close"
              onPress={() => setSettingsModalVisible(false)}
              backgroundColor="#333"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingsIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  settingsIconText: {
    fontSize: 24,
    color: '#007bff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  footerLink: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
});

export default LoginScreen;
