import React from 'react';
import styles from './Footer.module.css';

export type Params = {};

export const Footer = ({}: Params) => {
    return <div  className={[styles.container].join(" ")}>
        <p className={styles.name}>Chargeskills 2023</p>
    </div>
};
  