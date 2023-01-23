import React from 'react';
import {Footer, Header} from "../../common";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import {TeamUser} from "./TeamUser/TeamUser";
import styles from './Team.module.css';

type Params = {}

export const Team = ({}: Params) => {
  
  return <div className={styles.container}>
    <Header/>
    <div className={styles.introBlock}>
      <h1>Team</h1>
    </div>
    <div className={styles.sliderWrapper}>
      <Swiper
          className={styles.slider}
          slidesPerView="auto"
          centeredSlides
          loop
          speed={5000}
          autoplay = {
            {delay: 1000}
          }
          modules={[Autoplay]}
          spaceBetween={30}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
      >
          <SwiperSlide className={styles.slide}> 
            <TeamUser  firstName='Nikolai' lastName='Stepanov' avatar='/public/team/Nick.jpg'>
              <div>CTO</div>
              <div>Founder</div>
              <div>13 years in IT development</div>
            </TeamUser>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <TeamUser style={{borderColor: "#236df9"}} firstName='Andrei' lastName='Matyushchenko' avatar='/public/team/Andrei.jpg'>
              <div>CTO</div>
              <div>Founder</div>
              <div>Web developer since 2017.<br/>
                  Love well-designed apps and scalable architecture.
              </div>
            </TeamUser>
          </SwiperSlide>
      </Swiper>
    </div>
    <Footer/>
  </div>
};
