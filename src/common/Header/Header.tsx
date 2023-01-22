import React from 'react';
import {Logo} from "@ui";
import { NavLink } from "react-router-dom";
import styles from './Header.module.css';

export type Params = {};

export const Header = ({}: Params) => {
    return <div className={[styles.container].join(" ")}>
        <div>
            <NavLink
                to="/"
                exact
                className={styles.link}
                activeClassName={styles.active}
            >
                Home
            </NavLink>
            <NavLink
                to="/solutions"
                className={styles.link}
                activeClassName={styles.active}
            >
                Solutions
            </NavLink>
            <NavLink
                to="/team"
                className={styles.link}
                activeClassName={styles.active}
            >
                Team
            </NavLink>
            <NavLink
                to="/contacts"
                className={styles.link}
                activeClassName={styles.active}
            >
                Contacts
            </NavLink>
            {/*<NavLink
                to="/pricing"
                className={styles.link}
                activeClassName={styles.active}
            >
                Pricing
            </NavLink>*/}
        </div>
        <div>
            <a href="http://auth.chargeskills.com" className={styles.start}>
                <span className="material-symbols-outlined">
                    arrow_circle_right
                </span>Get started
            </a>
        </div>
        <Logo size='large'/>
    </div>
};
  