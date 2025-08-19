# 📚 Mini e-Kitaplık Uygulaması  

Bu proje, **Node.js**, **Express.js** ve **MongoDB** kullanılarak geliştirilmiş basit ve işlevsel bir **e-Kitaplık yönetim sistemidir**.  
Backend tarafı kitap ve kullanıcı işlemlerini güvenli şekilde yönetirken, **frontend Vue.js** ile geliştirilmiştir.  


## 🚀 Özellikler  
###  Kullanıcı Yönetimi  
- Kayıt olma ve giriş yapma işlemleri  
- JWT tabanlı kimlik doğrulama  
- Tüm kullanıcılar şimdilik admin yetkisine sahiptir  

### Kitap Yönetimi (Books API)  
- Yeni kitap ekleme (**POST**)  
- Tüm kitapları listeleme (**GET**)  
- Kitap bilgilerini güncelleme (**PUT**)  
- Kitap silme (**DELETE**)  

### Yetkilendirme Sistemi  
- Token olmadan sadece kitapları görüntüleme (**GET**) işlemi yapılabilir  
- Kitap ekleme, güncelleme ve silme işlemleri için giriş yapılması (token sahibi olunması) gerekir  

### Veritabanı  
- MongoDB üzerinde kitap ve kullanıcı koleksiyonları  
- Mongoose ile şema ve modeller  

## Kullanılan Teknolojiler  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT  
- **Frontend:** Vue.js  
- **Diğer:** dotenv, bcrypt, express-validator


  
## 🔑 Proje Akışı  
### 1️⃣ Kullanıcı Kaydı ve Giriş  
- Kullanıcılar kayıt olur ve veritabanına eklenir  
- Giriş sırasında şifre kontrolü yapılır, başarılı girişlerde **JWT token** üretilir  
- Token sonraki isteklerde kimlik doğrulama için kullanılır  

### 2️⃣ Yetkilendirme  
- Token olmadan yalnızca kitapları görüntüleme mümkündür  
- Kitap ekleme, güncelleme ve silme için giriş yapılmış olmalıdır  

### 3️⃣ Kitap İşlemleri  
- Kullanıcılar kitap ekleyebilir, güncelleyebilir, silebilir veya listeleyebilir  

