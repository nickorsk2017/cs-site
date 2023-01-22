import React from 'react';
import {Block} from "./_components/Block/Block";
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
      <p><i></i>Create your own virtual school</p>
      <p><i></i>Train and manage your team</p>
      <p><i></i>Solutions for private Mentors</p>
      <p><i></i>Webinars</p>
    </Block>

    <Footer/>
  </div>
};
