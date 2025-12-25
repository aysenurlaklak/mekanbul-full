// React Router'dan NavLink bileşenini içe aktar (sayfa yönlendirme için)
import { NavLink, useNavigate } from "react-router-dom";
import { clearToken, getPayload } from "../services/Auth";

// Navigasyon çubuğu (navbar) bileşeni - Sayfa üstünde sabit menü gösterir
function NavBar() {
  const navigate = useNavigate();
  const payload = getPayload();

  const handleLogout = () => {
    clearToken();
    navigate("/");
  };

  return (
    <div className="navbar-default navbar navbar-fixed-top">
      <div className="container">
        {/* Navbar başlık bölümü */}
        <div className="navbar-header">
          {/* Ana sayfa linki - Logo/başlık olarak gösterilir */}
          <NavLink className="navbar-brand" to="/">Mekanbul</NavLink>
          
          {/* Mobil cihazlar için hamburger menü butonu */}
          <button
            className="navbar-toggle"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-main"
          >
            {/* Hamburger menü ikonu (3 çizgi) */}
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        
        {/* Menü öğeleri - Mobilde collapse (açılır/kapanır) olabilir */}
        <div id="navbar-main" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li>
              <NavLink to="/admin">Yönetici</NavLink>
            </li>
            {/* Hakkında sayfası linki */}
            <li>
              <NavLink to={"about"}>Hakkında</NavLink>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            {payload ? (
                <>
                  <li>
                    <span className="navbar-text" style={{ color: "white" }}>Merhaba, {payload.name}</span>
                  </li>
                  <li>
                    <button className="btn btn-link navbar-btn" onClick={handleLogout}>
                      Çıkış
                    </button>
                  </li>
                </>
            ) : (
                <>
                  <li>
                    <NavLink to="/login">
                      Giriş
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup">Kayıt</NavLink>
                  </li>
                </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Bileşeni dışa aktar
export default NavBar;
