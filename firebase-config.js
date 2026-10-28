// Firebase Web Uygulamasi ayarlari (compat / global bicim).
// Firebase Konsolu -> Proje ayarlari -> Genel -> Uygulamalariniz -> Web uygulamasi -> SDK kurulumu
// bolumundeki firebaseConfig degerleri asagiya yazilir.
//
// NOT: Bu dosyada "import ... from 'firebase/app'" KULLANILMAZ.
// Uygulama compat SDK'yi index.html icinde <script> ile yukler.

window.FIREBASE_CONFIG = {
    apiKey: "AIzaSyDv2tpcnR9PchFdPYyxOVfpgtZ7r0lqNbo",
    authDomain: "stokmiadtakip-d38f4.firebaseapp.com",
    projectId: "stokmiadtakip-d38f4",
    storageBucket: "stokmiadtakip-d38f4.firebasestorage.app",
    messagingSenderId: "938044708434",
    appId: "1:938044708434:web:b1d50dbfdbf4e67219f18b"
};

// Firestore koleksiyon adi (dokuman kimligi = MALZEME ID)
window.FIREBASE_COLLECTION = "stok";