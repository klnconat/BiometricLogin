# Biometric Login App

Bu proje, React Native ve `react-native-biometrics` kullanılarak geliştirilmiş bir biyometrik doğrulama uygulamasıdır. Uygulama, biyometrik doğrulama (Face ID veya parmak izi) kullanır. Ayrıca, kullanıcıya biyometrik anahtar oluşturma ve silme seçenekleri sunar.

## İçindekiler
- [Özellikler](#özellikler)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)

## Özellikler

- **Biyometrik Giriş**: Face ID veya parmak izi gibi biyometrik doğrulama seçenekleri ile güvenli giriş.
- **Anahtar Yönetimi**: Kullanıcılar, biyometrik anahtar oluşturabilir ve mevcut anahtarı silebilir.

## Kurulum

Projeyi çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

1. **Projeyi klonlayın**: git clone https://github.com/username/BiometricLoginApp.git

2. **Gerekli bağımlılıkları yükleyin**: npm install

3. **iOS için CocoaPods bağımlılıklarını yükleyin**: cd ios pod install cd ..

4. local.properties Dosyasına SDK Yolunu Ekleyin: macOS veya Linux için sdk.dir = /Users/YOUR_USERNAME/Library/Android/sdk , Windows için: sdk.dir = C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk

5. **Uygulamayı çalıştırın**:
- Android için:
  ```
  npm run-android
  ```
- iOS için:
  ```
  npm run-ios
  ```

## Kullanım

Uygulama başlatıldığında, kullanıcıya biyometrik kimlik doğrulama seçeneklerini kullanarak giriş yapma veya e-posta ve şifre ile giriş yapma imkanı tanır.

1. **Giriş Yapma**:
- Biyometrik doğrulama destekleniyorsa, "Login with Face ID" veya "Login with Fingerprint" seçeneklerini kullanabilirsiniz.

2. **Ayarlar**:
- Sağ üst köşedeki dişli simgesine tıklayarak biyometrik anahtarları yönetebileceğiniz ayarlar menüsüne ulaşabilirsiniz.
- "Create Public Key" seçeneği ile biyometrik anahtar oluşturabilir ve "Delete Biometric Keys" seçeneği ile mevcut anahtarları silebilirsiniz.