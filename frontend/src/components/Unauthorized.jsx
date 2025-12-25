// Gerekli bileşeni içe aktar
import Header from "./Header"; // Sayfa başlığı bileşeni

function Unauthorized() {
    return (
        <div>
            {/* Hata mesajı başlığı */}
            <Header headerText="Hata" motto="Bu sayfaya erişim yetkiniz yok!" />
        </div>
    );
}

// Bileşeni dışa aktar
export default Unauthorized;
