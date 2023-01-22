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
            <TeamUser firstName='Nikolai' lastName='Stepanov' avatar='/public/team/Nick.jpg'/>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <TeamUser style={{borderColor: "#236df9"}} firstName='Nikolai 2' lastName='Stepanov' avatar='/public/team/Nick.jpg'/>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <TeamUser style={{borderColor: "#f9238b"}} firstName='Nikolai 3' lastName='Stepanov' avatar='/public/team/Nick.jpg'/>
          </SwiperSlide>
      </Swiper>
    </div>
    <Footer/>
  </div>
};
