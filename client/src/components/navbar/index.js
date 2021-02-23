import React from 'react'
import './navbar.sass'
import logo from '../../assets/img/logo.svg'
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar__logo">
                <img src={logo} alt="Logo tut dolshno bitb "/>
                <div className="navbar__logo__text">
                    <h1>StrikeFile</h1>
                    <p>Best cloud for your files</p>
                </div>
            </div>

            <div className="navbar__buttons">
                <Link to={"/login"} className="login">Log in</Link>
                <Link to={"/register"} className="register">Register</Link>
            </div>
        </div>
    );
};

export default Navbar;