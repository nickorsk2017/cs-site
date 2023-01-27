import React from 'react';
import {Footer, Header} from "../../common";
import {Block} from "@ui";
import styles from './Main.module.css';

type Params = {}

export const Main = ({}: Params) => {  
  return <div className={styles.container}>
    <Header/>
    <div className={styles.introBlock}>
      <h1>Interactive services for online and offline learning.</h1>
      <h2>Create, teach, find knowledges!</h2>
      <p>Services for schools, organizations, self mentors.</p>
    </div>

    <h1 className={styles.opportunities}>Opportunities</h1>

    <Block style={{backgroundImage: "linear-gradient(0deg, #7749ff, #b605e6)", color: "#fff"}} videoURL="/public/videos/desk.mp4">
      <h2>Interactive online lessons</h2>
      <p>Use online board with graphics, videos, images, stickers and more</p>
      <p>Design a course structure with flexible creation system.</p>
    </Block>

    <Block style={{background: "#fff", marginTop: "50px"}} videoURL="/public/videos/tasks.mp4">
        <h2>Boards for tasks and homework</h2>
        <p>Modern methods for managing tasks and homework. Use AGILE for teaching.</p>
    </Block>

    <Block style={{backgroundImage: "linear-gradient(0deg, #6fcc9c, #57d591)", marginTop: "50px"}} videoURL="/public/videos/invitation.mp4">
      <h2>Groups and users anywhere</h2>
      <p>Add users by link through any convenient messenger</p>
    </Block>

    <Block style={{background: "#fff", marginTop: "50px"}} videoURL="/public/videos/wiki.mp4">
      <h2>Wiki for work</h2>
      <p>Store knowledge for your students and teachers.</p>
    </Block>

    <Block style={{background: "#5a8bf8", marginTop: "50px"}} videoURL="/public/videos/">
      <h2>Messenger for learning</h2>
      <p>Write messages to a class or group in one message</p>
    </Block>
    <div className={styles.moreCommingSoon}>
      And many more coming soon!
    </div>
    <Footer/>

  </div>
};
