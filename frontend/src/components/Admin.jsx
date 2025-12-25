import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import VenueDataService from "../services/VenueDataService";
import { getToken } from "../services/Auth";
import useAdminTimeout from "../hooks/useAdminTimeout";
import Header from "../components/Header";

const Admin = () => {
    const [venues, setVenues] = useState([]);
    const [error, setError] = useState("");

    const remainingSeconds = useAdminTimeout();

    useEffect(() => {
        const token = getToken();
        VenueDataService.listAllVenues(token)
            .then((response) => {
                setVenues(response.data);
            }).catch(() => {
                setError("Mekanlar alınamadı!");
            });
    }, []);

    const handleDelete = (id) => {
        const token = getToken();
        VenueDataService.deleteVenue(id, token)
            .then(() => {
                setVenues((prev) => prev.filter((venue) => venue._id !== id));
            }).catch(() => {
                setError("Silme işlemi başarısız!");
            });
    };

    return (
        <div>
            <Header headerText="Admin" motto={`Paneli (${remainingSeconds} sn)`} />
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="clearfix">
                <NavLink className="btn btn-primary pull-right" to="/admin/addupdate/venue/new">
                    Yeni Mekan Ekle
                </NavLink>
            </div>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Mekan</th>
                    <th>Adres</th>
                    <th>İşlemler</th>
                </tr>
                </thead>
                <tbody>
                {venues.map((venue) => (
                    <tr key={venue._id}>
                        <td>{venue.name}</td>
                        <td>{venue.address}</td>
                        <td>
                            <NavLink className="btn btn-sm btn-default" to={`/admin/addupdate/venue/${venue._id}`}>
                                Güncelle
                            </NavLink>{" "}
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(venue._id)}
                            >
                                Sil
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;