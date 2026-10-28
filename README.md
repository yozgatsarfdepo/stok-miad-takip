# 📦 Stok & Miad Takip

Tarayıcıda çalışan stok/miad takip uygulaması. Veriler **Firebase Firestore** üzerinde tutulur, tüm kullanıcılar aynı listeyi gerçek zamanlı görür. Netlify veya Firebase Hosting ile yayınlanabilir.

## Özellikler

- ☁️ **Firestore veritabanı:** Malzemeler `stok` koleksiyonunda, doküman kimliği = `MALZEME ID`. Değişiklikler otomatik kaydedilir, diğer kullanıcılara anında yansır.
- ✏️ **Satır içi düzenleme (elle değiştirme):** Excel'deki tüm alanlar — **Malzeme Adı, MKYS Kodu, Kalan, Eksik, Fazla, RAF SKT, SKT, SKT Geçen Miktar, SKT Geçen Tarih, Açıklama** — doğrudan tablo hücresinden değiştirilir. `Enter` kaydeder, `Esc` geri alır. `3/2030` → `03/2030` (RAF SKT), `9/1/2028` → `09/01/2028` (tarihler) olarak düzeltilir.
- 🔎 **Her sütunda filtre:** Başlığın altındaki filtre satırında ID/Ad/MKYS/Açıklama için metin arama, Kalan/Eksik/Fazla/SKT Geçen Miktar için `> 0` / `= 0`, RAF SKT ve SKT için `Dolu` / `Boş` / `Geçmiş`, SKT Geçen Tarih için `Dolu` / `Boş`, Durum için `Eksik` / `Fazla` / `Normal`. `✕` tüm sütun filtrelerini temizler.
- ↕️ **Sıralama:** Sütun başlığına tıklayınca artan/azalan sıralar, üçüncü tıklama sıralamayı kaldırır.
- ➕ **Yeni malzeme / 🗑️ silme:** Elle kayıt ekleme ve satır silme (buluttan da siler).
- 🧮 **Toplam satırı:** Görünen satırların Kalan/Eksik/Fazla toplamları tablo altında.
- 📥 **Şablondan yükleme (Excel):** Var olan malzemelerin miktarları güncellenir, listede olmayan yeni malzemeler eklenir; buluttaki diğer kayıtlar korunur.
- 📤 **Excel'e yedekleme:** Tüm liste, şablon sütun düzeniyle `.xlsx` olarak indirilir.
- 💾 **Yerel mod:** Firebase ayarları boşsa uygulama tarayıcıda çalışır (veriler `localStorage`).
- İlk kurulumda bulut boşsa `StokSayimRapor.xlsx` şablonu otomatik yüklenir.
- İstatistikler, eksik kapatma, fazla kullanımı, çoklu işlemler, Excel/PDF dışa aktarma (dışa aktarma görünen/filtrelenmiş listeyi kullanır).

## 1) Firebase kurulumu

1. <https://console.firebase.google.com> → **Proje ekle**.
2. **Firestore Database** → *Veritabanı oluştur* → bölge seçin (ör. `eur3`) → **Üretim modu**.
3. **Proje ayarları → Genel → Uygulamalarınız → Web (`</>`)** ile web uygulaması ekleyin.
4. Verilen `firebaseConfig` değerlerini [firebase-config.js](./firebase-config.js) dosyasına yapıştırın:

```js
window.FIREBASE_CONFIG = {
    apiKey: "AIza...",
    authDomain: "proje-id.firebaseapp.com",
    projectId: "proje-id",
    storageBucket: "proje-id.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef"
};
window.FIREBASE_COLLECTION = "stok";
```

5. Firestore kurallarını yayınlayın (dosya: [firestore.rules](./firestore.rules)):

```powershell
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules
```

> ⚠️ `firestore.rules` içindeki kural, siteyi bilen herkesin veriyi okuyup yazmasına izin verir. Siteyi herkese açık yayınlıyorsanız **Authentication** ekleyip kuralı kullanıcı doğrulamasına bağlayın.

## 2) Yayınlama

### Netlify (app.netlify.com)

1. <https://app.netlify.com/drop> adresine giriş yapın.
2. Desktop'taki **`Stok_Miad_Takip_Netlify.zip`** dosyasını sürükleyip bırakın.
3. **Site settings → Change site name** ile adı değiştirebilirsiniz.
4. Güncelleme: yeni zip'i tekrar sürükleyin veya `npx netlify-cli deploy --prod --dir .`

### Firebase Hosting

`.firebaserc` içindeki `BURAYA_FIREBASE_PROJE_ID` değerini kendi proje kimliğinizle değiştirin, sonra:

```powershell
firebase deploy --only hosting
```

## 3) Kullanım

| Buton | İşlev |
|---|---|
| 🔄 Buluttan Yenile | Firestore'daki güncel listeyi çeker |
| 📥 Şablondan Yükle (Excel) | Excel/CSV şablonunu bulut listesiyle **birleştirir** |
| ☁️ Tümünü Buluta Yaz | Ekrandaki listeyi olduğu gibi Firestore'a yazar |
| 📤 Excel'e Yedekle | Güncel listeyi `.xlsx` olarak indirir |
| ➕ Yeni Malzeme | Elle tek kayıt ekler (ID + ad zorunlu) |
| 🗑 (satırda) | Malzemeyi hem listeden hem Firestore'dan siler |

### Tabloyu elle düzenleme

| İşlem | Sonuç |
|---|---|
| Hücreye tıkla → yaz → `Enter` | Değer kaydedilir, buluta yazılır, istatistikler güncellenir |
| `Esc` | Değişiklik geri alınır |
| Başlığa tıkla | Sırala (▲ artan / ▼ azalan / üçüncü tıkla kaldır) |
| Filtre satırı | Her sütun için ayrı filtre; `✕` hepsini temizler |
| Tablo altı | Görünen satırların Kalan/Eksik/Fazla/SKT Geçen Miktar toplamı |

Tablo 14 sütun içerir ve dar ekranlarda **yatay kaydırılır**; başlık + filtre satırı sabit kalır.

### Tarih alanları

- `SKT` ve `SKT GEÇEN TARİH` tabloda **GG/AA/YYYY** gösterilir, veritabanında `YYYY-MM-DD` olarak saklanır.
- Excel'den gelen tarihler saat dilimi kayması olmadan aktarılır (ör. Excel `09.01.2028` → `09/01/2028`).
- `RAF SKT` **AA/YYYY** biçimindedir.

- Miktar değişiklikleri (eksik kapat, fazla kullan) otomatik olarak buluta kaydedilir.
- İnternet yoksa değişiklikler tarayıcıda bekler; bağlantı gelince senkronize edilir.

### Şablon (Excel) sütunları

`MALZEME ID`, `MALZEME ADI`, `MKYS MALZEME KODU`, `KALAN MİKTAR`, `SKT`, `EKSİK`, `FAZLA`, `RAF SKT` (MM/YYYY), `SKT GEÇEN MİKTAR`, `SKT GEÇEN TARİH`, `AÇIKLAMA`

Zorunlu sütunlar: **MALZEME ID** ve **MALZEME ADI**. `EKSİK`/`FAZLA` yoksa 0 kabul edilir; `TAM` yazılırsa 0 sayılır.

**📤 Dışa Aktar (Excel)** çıktısı aynı 11 sütunu (+ Durum) içerir.

### Excel dosyası gerekli mi?

Çalışma zamanında **gerekmez**; veriler Firestore'da tutulur. `StokSayimRapor.xlsx` yalnızca:

- ilk kurulumda bulut boşsa otomatik doldurmak,
- yeni malzeme listesini toplu aktarmak (şablon),

için kullanılır. İstemezseniz dosyayı yayın klasöründen kaldırabilirsiniz; bu durumda ilk veriyi **📥 Şablondan Yükle** ile kendiniz seçersiniz.

## Dosyalar

| Dosya | Açıklama |
|---|---|
| `index.html` | Uygulamanın tamamı (tek sayfa) |
| `pdf-font.js` | PDF'lerde Türkçe karakter için gömülü Unicode font (Roboto, Apache-2.0) — **silinmemeli** |
| `firebase-config.js` | Firebase bağlantı ayarları (**doldurulmalı**) |
| `firestore.rules` | Firestore güvenlik kuralları |
| `StokSayimRapor.xlsx` | Örnek/başlangıç şablonu |
| `Stok_Miad_Takip.html` | Eski adres için `index.html` yönlendirmesi |
| `netlify.toml` | Netlify yayın/başlık ayarları |
| `firebase.json`, `.firebaserc` | Firebase Hosting + Firestore ayarları |

## PDF ve Türkçe karakterler

PDF çıktıları `pdf-font.js` içindeki gömülü Roboto fontuyla üretilir; **ğ, Ğ, ş, Ş, ı, İ, ç, Ç, ö, Ö, ü, Ü, ±, °, ², ½** karakterleri doğru görünür ve PDF içinde metin olarak aranabilir.

- `pdf-font.js` yayın klasöründe bulunmalıdır. Silinirse uyarı gösterilir ve PDF'ler eski (Türkçe desteksiz) Helvetica ile üretilir.
- Font dosyası alt küme (subset) hâlindedir; aksanlı harfler jsPDF'in doğru çizebilmesi için basit konturlara dönüştürülmüştür.

## Güvenlik notları

- `firebase-config.js` içindeki `apiKey` gizli değildir (web uygulamalarında normaldir); asıl koruma **Firestore kurallarıdır**.
- Hizmet hesabı JSON'u / özel anahtar **kullanılmaz**, bu klasöre koymayın.
- Verileri düzenli olarak **📤 Excel'e Yedekle** ile yedekleyin.
