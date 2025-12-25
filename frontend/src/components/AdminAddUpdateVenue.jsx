import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VenueDataService from "../services/VenueDataService";
import { getToken } from "../services/Auth";
import useAdminTimeout from "../hooks/useAdminTimeout";
import Header from "./Header.jsx";

const emptyForm = {
    name: "",
    address: "",
    lat: "",
    long: "",
    foodanddrink: "",
    days1: "",
    open1: "",
    close1: "",
    isClosed1: false,
    days2: "",
    open2: "",
    close2: "",
    isClosed2: false,
};

const AdminAddUpdateVenue = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formState, setFormState] = useState(emptyForm);
    const [error, setError] = useState("");

    useAdminTimeout();

    useEffect(() => {
        if (id) {
            VenueDataService.getVenue(id)
                .then((response) => {
                    const venue = response.data;
                    setFormState({
                        name: venue.name || "",
                        address: venue.address || "",
                        lat: venue.coordinates?.[0] ?? "",
                        long: venue.coordinates?.[1] ?? "",
                        foodanddrink: (venue.foodanddrink || []).join(", "),
                        days1: venue.hours?.[0]?.days || "",
                        open1: venue.hours?.[0]?.open || "",
                        close1: venue.hours?.[0]?.close || "",
                        isClosed1: venue.hours?.[0]?.isClosed || false,
                        days2: venue.hours?.[1]?.days || "",
                        open2: venue.hours?.[1]?.open || "",
                        close2: venue.hours?.[1]?.close || "",
                        isClosed2: venue.hours?.[1]?.isClosed || false,
                    });
                })
                .catch(() => {
                    setError("Mekan bilgileri alınamadı");
                });
        }
    }, [id]);

    const handleChange = (evt) => {
        const { name, value, type, checked } = evt.target;
        setFormState((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const onSubmit = (evt) => {
        evt.preventDefault();

        setError("");
        const payload = {
            name: formState.name,
            address: formState.address,
            lat: formState.lat,
            long: formState.long,
            foodanddrink: formState.foodanddrink
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            days1: formState.days1,
            open1: formState.open1,
            close1: formState.close1,
            isClosed1: formState.isClosed1,
            days2: formState.days2,
            open2: formState.open2,
            close2: formState.close2,
            isClosed2: formState.isClosed2,
        };

        const token = getToken();
        const request = id
            ? VenueDataService.updateVenue(id, payload, token)
            : VenueDataService.addVenue(payload, token);

        request
            .then(() => {
                navigate("/admin");
            }).catch(() => {
            setError("Kaydetme işlemi başarısız!");
        });
    };

    return (
        <div>
            <Header headerText="Mekan" motto={id ? "Güncelle" : "Ekle"}/>
            {error && <div className="alert alert-danger">{error}</div>}
            <form className="form-horizontal" onSubmit={onSubmit}>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Mekan Adı:</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Adres:</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            name="address"
                            value={formState.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Enlem:</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            name="lat"
                            value={formState.lat}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Boylam:</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            name="long"
                            value={formState.long}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">İmkanlar:</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            name="foodanddrink"
                            value={formState.foodanddrink}
                            onChange={handleChange}
                            placeholder="Kahve, Çay, Tatlı"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Günler (1):</label>
                    <div className="col-sm-9">
                        <input
                            className="form-control"
                            name="days1"
                            value={formState.days1}
                            onChange={handleChange}
                            placeholder="Pzt-Cuma"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Açılış (1):</label>
                    <div className="col-sm-9">
                        <input
                            className="form-control"
                            name="open1"
                            value={formState.open1}
                            onChange={handleChange}
                            placeholder="09:00"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Kapanış (1):</label>
                    <div className="col-sm-9">
                        <input
                            className="form-control"
                            name="close1"
                            value={formState.close1}
                            onChange={handleChange}
                            placeholder="22:00"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Kapalı mı? (1):</label>
                    <div className="col-sm-9">
                        <input
                            type="checkbox"
                            name="isClosed1"
                            checked={formState.isClosed1}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Günler (2):</label>
                    <div className="col-sm-9">
                        <input
                            className="form-control"
                            name="days2"
                            value={formState.days2}
                            onChange={handleChange}
                            placeholder="Cumartesi-Pazar"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Açılış (2):</label>
                    <div className="col-sm-9">
                        <input
                            className="form-control"
                            name="open2"
                            value={formState.open2}
                            onChange={handleChange}
                            placeholder="09:00"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Kapanış (2):</label>
                    <div className="col-sm-9">
                        <input
                            className="form-control"
                            name="close2"
                            value={formState.close2}
                            onChange={handleChange}
                            placeholder="22:00"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Kapalı mı? (2):</label>
                    <div className="col-sm-9">
                        <input
                            type="checkbox"
                            name="isClosed2"
                            checked={formState.isClosed2}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button className="btn btn-default pull-right" type="submit">
                    Kaydet
                </button>
            </form>
        </div>
    );
};

export default AdminAddUpdateVenue;