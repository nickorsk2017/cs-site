import React, { ReactElement, useEffect } from 'react';
import {IconFont, Logo} from "@ui";
import {AuthByTokenRequest, AuthByTokenResponse,} from "@proto";
import {authClient} from "@clients";
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
import {StatusCode} from "grpc-web";
import { observer, inject } from "mobx-react";
import {ProfileStore} from "@stores";
import { NavLink } from "react-router-dom";
import styles from './PageLayout.module.css';

export type Params = {
  pageJSX: ReactElement,
  profileStore?: ProfileStore,
};

export const PageLayout = inject("profileStore")(
  observer(({profileStore, pageJSX}: Params) => {
    const token = Cookies.get("jwt-token");
    const userId = profileStore?.profile?.id || null;
    const history = useHistory();

    const clearAndGoToAuthPage = () => {
      setTimeout(() => {
       // Cookies.remove("jwt-token");
        history.push("/");
      }, 1200);
    }
  
    useEffect(() => {
      if(!userId){
        const request = new AuthByTokenRequest();
        const meta: { [s: string]: string; } = {"Auth": token};
  
        authClient.authByToken(request, meta, (err, response: AuthByTokenResponse) => {
            const errors = response?.getErrorList();
            if(err){
              console.error(err);
              clearAndGoToAuthPage();
            } else if(errors && errors.length > 0){
              clearAndGoToAuthPage();
            } else if(response?.getStatus() === StatusCode.OK){
              setTimeout(() => {
                profileStore.fill({
                  id: response.getId(),
                  email: response.getEmail(),
                  firstName: response.getFirstName(),
                  lastName: response.getLastName(),
                  avatar: response.getAvatar(),
                });

              }, 500);
            }
        });
      }
    }, []);

    if(!profileStore?.profile?.id){
      return <div className={styles.loading}>Loading...</div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.area} >
            
            </div >
            <Logo size='large'/>
            <div className={styles.rightContainer}>
              {pageJSX}
            </div>
            <div className={styles.panel}>
              <div className={styles.panelWrapper}>
                <NavLink
                to="/profile"
                className={styles.btn}
                activeClassName={styles.active}
                >
                  <IconFont as="button" classes={['material-symbols-outlined', styles.delete]} size='15px' content="settings"/> Settings
                </NavLink>
                
                <NavLink
                to="/apps"
                className={styles.btn}
                activeClassName={styles.active}
                >
                  <IconFont as="button" classes={['material-symbols-outlined']} size='15px' content="nest_farsight_weather"/> Apps
                </NavLink>

                <NavLink
                to="/payments"
                className={styles.btn}
                activeClassName={styles.active}
                >
                  <IconFont as="button" classes={['material-symbols-outlined']} size='15px' content="local_mall"/> Payments
                </NavLink>
              </div>
            </div>
        </div>
    )
}));