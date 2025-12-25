// Gerekli bileşenleri içe aktar
import InputWithLabel from "./InputWithLabel"; // Arama kutusu bileşeni
import VenueList from "./VenueList"; // Mekan listesi bileşeni
import Header from "./Header"; // Başlık bileşeni
import React, { useState } from "react"; // React ve state hook'u
import {useSelector,useDispatch} from "react-redux";
import VenueDataService from "../services/VenueDataService";
// Ana sayfa bileşeni
const Home = () => {
  const dispatch = useDispatch();
  const venues = useSelector((state) => state.data);
  const isLoading = useSelector((state) => state.isLoading);
  const isError = useSelector((state) => state. isError);
  const isSuccess = useSelector((state) => state. isSuccess) ;
  const [coordinate,setCoordinate] = useState({lat:37,long:35});

  // Arama metni için state tanımla
  const [searchVenue, setSearchVenue] = useState("");

  // Arama kutusuna yazıldığında çalışan fonksiyon
  const search = (event) => {
    setSearchVenue(event.target.value);
  };

  // Bileşen yüklendiğinde çalışacak (şu an boş)
  // Boş dizi [] = Bu effect sadece bileşen ilk yüklendiğinde 1 kez çalışır
  // Eğer dizi içinde değişken olsaydı, o değişken her değiştiğinde tekrar çalışırdı
  React.useEffect(() => {
    if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(function(position){
        setCoordinate({lat:position.coords.latitude,long:position.coords.longitude});
      });
    }
  }, []);

  React.useEffect(() => {
    dispatch({type:"FETCH_INIT"});
    VenueDataService.nearbyVenues(coordinate.lat,coordinate.long)
    .then((response)=>{
      dispatch({type:"FETCH_SUCCESS",payload:response.data});
    }).catch(()=>{
      dispatch({type:"FETCH_FAILURE"});
    });
  }, [coordinate.lat,coordinate.long]);

  // Mekanları arama metnine göre filtrele
  // Mekan adı, arama metnini içeriyorsa listede göster
  const filteredVenues = Array.isArray(venues) ? venues.filter((venue) =>
      venue.name.toLowerCase().includes(searchVenue.toLowerCase()) ||
      venue.address.toLowerCase().includes(searchVenue.toLowerCase())
  ) : [];

  return (
    <div>
      {/* Sayfa başlığı ve slogan */}
      <Header
        headerText="Mekanbul"
        motto="Civarınızdaki Mekanlarınızı Keşfedin!"
      />

      {/* Arama kutusu */}
      <InputWithLabel
        id="arama"
        label="Mekan Ara:"
        type="text"
        isFocused
        onInputChange={search}
        value={searchVenue}
      />

      <hr />

      {/* Mekan listesi */}
      <div className="row">
        {isError ? (
            <p>
              <strong>Birşeyler ters gitti! ...</strong>
            </p>
        ) : isLoading ? (
            <p>
              <strong>Mekanlar Yükleniyor ...</strong>
            </p>
        ) : (
            isSuccess && (
                <div className="row">
                  <VenueList venues={filteredVenues} />
                </div>
            )
        )}
      </div>

    </div>
  );
};

// Bileşeni dışa aktar
export default Home;
