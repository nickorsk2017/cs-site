import React from 'react';
import {Block} from "@ui";
import {Header, Footer} from "../../common";
import styles from './Solutions.module.css';

type Params = {}

export const Solutions = ({}: Params) => {
  
  return <div className={styles.container}>
    <Header/>

    <div className={styles.introBlock}>
      <h1>List of learning solutions</h1>
    </div>

    <Block style={{background: "#ba5af8", color: "#fff"}} videoURL="/public/videos/solutions.mp4">
      <h2>Choose your way</h2>
      <p><span className={["material-symbols-outlined", styles.icon].join(" ")}>done</span>Create your own virtual school</p>
      <p><span className={["material-symbols-outlined", styles.icon].join(" ")}>done</span>Train and manage your team</p>
      <p><span className={["material-symbols-outlined", styles.icon].join(" ")}>done</span>Solutions for private Mentors</p>
      <p><span className={["material-symbols-outlined", styles.icon].join(" ")}>done</span>Webinars</p>
    </Block>

    <Footer/>
  </div>
};
