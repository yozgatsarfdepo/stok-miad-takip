// Firebase Web Uygulaması ayarları (compat / global biçim)
window.FIREBASE_CONFIG = {
    apiKey: "AIzaSyDv2tpcnR9PchFdPYyxOVfpgtZ7r0lqNbo",
    authDomain: "stokmiadtakip-d38f4.firebaseapp.com",
    projectId: "stokmiadtakip-d38f4",
    storageBucket: "stokmiadtakip-d38f4.firebasestorage.app",
    messagingSenderId: "938044708434",
    appId: "1:938044708434:web:b1d50dbfdbf4e67219f18b"
};

// Firebase'i başlat (BU SATIR EKSİKTİ)
if (!firebase.apps.length) {
    firebase.initializeApp(window.FIREBASE_CONFIG);
}

// Firestore koleksiyon adı
window.FIREBASE_COLLECTION = "stok";