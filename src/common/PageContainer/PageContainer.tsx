import React, { ReactElement } from 'react';
import {Modal} from "@common";
import {ModalStore} from "@stores";
import {observer, inject} from "mobx-react";
import styles from './PageContainer.module.css';

export type Params = {
    modalStore?: ModalStore;
    children: ReactElement;
    className?: string;
};

export const PageContainer = inject("modalStore")(observer(({modalStore, children, className}: Params) => {

    const renderModals = () => {
        return modalStore.list.map((modal) => {
            const Component = modal.component;

            return (<Modal
                onConfirm={modal.onConfirm}
                onClose={() => modalStore.close(modal.id)}
                isOpen={true}
                title={modal.title}
                key={modal.id}>
                    <Component modalId={modal.id} {...modal.props}/>
                </Modal>
                )
        });
    }
    
    return <div  className={[styles.container, className].join(" ")}>
        <div className={styles.modals}>
            {renderModals()}
        </div>
        {children}
    </div>
}));
  