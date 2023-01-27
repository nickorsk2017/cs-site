import React, {useRef, PropsWithChildren, useEffect} from 'react';
import {deviceType} from "@utils";
import {useIntersectionObserver} from "../../hooks";
import styles from './Block.module.css';

type Params = {
  videoURL: string;
  style?: React.CSSProperties;
}

export const Block = ({videoURL, style, children}: PropsWithChildren<Params>) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const refVideo = useRef<HTMLVideoElement | null>(null);
  const entry = useIntersectionObserver(ref, {})
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if(deviceType() === "mobile" && refVideo.current){
      //refVideo.current.style.width = document.body.offsetWidth + "px";
    }
  }, []);

  useEffect(() => {
    isVisible && refVideo.current.play();
  }, [isVisible]);
  
  return <div style={style} ref={ref} className={styles.block}>
      <div className={styles.blockLeft}>
        {children}
      </div>
      <div className={styles.blockRight}>
        <div className={styles.blockRightWrapper}>
          <video width="100%" loop muted ref={refVideo} src={videoURL}/>
        </div>
      </div>
    </div>
};
