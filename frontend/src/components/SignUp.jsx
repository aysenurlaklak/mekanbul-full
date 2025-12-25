import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import VenueDataService from "../services/VenueDataService";
import { setToken } from "../services/Auth";
import Header from "./Header.jsx";

const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const onSubmit = (evt) => {
        evt.preventDefault();

        setError("");
        const name = evt.target.elements.name.value;
        const email = evt.target.elements.email.value;
        const password = evt.target.elements.password.value;
        VenueDataService.register({ name, email, password })
            .then((response) => {
                setToken(response.data.token);
                navigate("/");
            }).catch(() => {
            setError("Kayıt başarısız!");
        });
    };

    return (
        <>
            <Header headerText="Kayıt" motto="Ol"/>
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form className="form-horizontal" onSubmit={onSubmit}>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">İsim:</label>
                            <div className="col-sm-10">
                                <input className="form-control" type="text" name="name" required/>
                            </div>
                        </div>
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
                            Kayıt Ol
                        </button>
                        <NavLink to="/login" className="pull-right-href">Giriş yap</NavLink>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;