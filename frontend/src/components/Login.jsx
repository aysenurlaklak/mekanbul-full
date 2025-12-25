import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import VenueDataService from "../services/VenueDataService";
import { setToken } from "../services/Auth";
import Header from "./Header.jsx";

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const onSubmit = (evt) => {
        evt.preventDefault();

        setError("");
        const email = evt.target.elements.email.value;
        const password = evt.target.elements.password.value;
        VenueDataService.login({ email, password })
            .then((response) => {
                setToken(response.data.token);
                navigate("/");
            }).catch(() => {
                setError("Giriş başarısız!");
            });
    };

    return (
        <>
            <Header headerText="Giriş" motto="Yap"/>
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="alert alert-info">Admin Giriş Bilgileri:<br />E-Posta: aysenur@gmail.com<br />Şifre: 12345</div>
                    <form className="form-horizontal" onSubmit={onSubmit}>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">E-posta:</label>
                            <div className="col-sm-10">
                                <input className="form-control" type="email" name="email" required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Şifre:</label>
                            <div className="col-sm-10">
                                <input className="form-control" type="password" name="password" required/>
                            </div>
                        </div>
                        <button className="btn btn-default pull-right" type="submit">
                            Giriş Yap
                        </button>
                        <NavLink to="/signup" className="pull-right-href">Kayıt Ol</NavLink>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;