import React from 'react';
import styles from './Logo.module.css';

export type Params = {
  size: "small" | "middle" | "large"
};

export const Logo = ({size}: Params) => {
    switch(size){
      case "large":
        return (<div className={styles.logo} >
        <span>CHARGE<img src="public/logo.svg" className={styles.logoImg} />SKILLS</span>
      </div>)
      case "small":
        return (<div className={[styles.logo, styles.small].join(" ")} >
          <span>CHARGE<img src="public/logo.svg" className={styles.logoImg} />SKILLS</span>
      </div>)
      default:
        return (<div className={[styles.logo, styles.middle].join(" ")} >
          <span>CHARGE
          <img src="public/logo.svg" className={styles.logoImg} />SKILLS</span>
        </div>)
    }
}
  