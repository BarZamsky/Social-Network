import React from "react"
import {NavLink} from "react-router-dom";
import Logo from "../Logo"
import { TiHomeOutline } from "react-icons/ti";
import { AiOutlineLogout,AiOutlineTeam } from "react-icons/ai";
import { FiUser } from "react-icons/fi";

import '../../../App.scss'

const navigationBar = () => (
        <nav className="toolbar">
            {/*<Logo />*/}
            <ul className="toolbar-ul">
                <li className="toolbar-li">
                    <NavLink
                        className="toolbar-navlink"
                        activeClassName="toolbar-navlink-selected"
                        to="/dashboard"
                        strict>
                        <TiHomeOutline className="toolbar-icon"/>
                        Home
                    </NavLink>
                </li>
                <li className="toolbar-li">
                    <NavLink
                        className="toolbar-navlink"
                        to="/network"
                        activeClassName="toolbar-navlink-selected"
                        strict>
                        <AiOutlineTeam className="toolbar-icon"/>
                        My Network
                    </NavLink>
                </li>
                <li className="toolbar-li">
                    <NavLink
                        className="toolbar-navlink"
                        to="/profile"
                        activeClassName="toolbar-navlink-selected"
                        strict>
                        <FiUser className="toolbar-icon"/>
                        Me
                    </NavLink>
                </li>
                <li className="toolbar-li">
                    <NavLink
                        className="toolbar-navlink"
                        to="/logout"
                        activeClassName="toolbar-navlink-selected"
                        strict>
                        <AiOutlineLogout className="toolbar-icon"/>
                        Logout
                    </NavLink>
                </li>
            </ul>
        </nav>
);


export default navigationBar