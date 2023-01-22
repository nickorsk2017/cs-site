import React, {PropsWithChildren} from "react";
import {makeObservable,observable, action} from "mobx";
import {uniqueId} from "@utils";

export enum ModalType {
    MODAL,
    TOOLTIP,
    NOTIFICATION,
}

type ModalComponent = ((props: any) => JSX.Element);

export type Modal = {
    id: string;
    title?: string;
    type?: ModalType;
    component?: React.FC<unknown>;
    props?: PropsWithChildren<Record<string, unknown>>;
    onConfirm?: () => void;
    onCancel?: () => void;
}

export interface IModalStore {
    list: Array<Modal>;
}

export class ModalStore implements IModalStore {
    @observable list = [
        //
    ];
    constructor() {
        makeObservable(this);
    }
    @action
    show({id, type = ModalType.MODAL, component, props, title, onConfirm, onCancel} : {
        id?: string,
        title?: string,
        type?: ModalType,
        component?: ModalComponent,
        onConfirm?: () => void;
        onCancel?: () => void;
        props?: PropsWithChildren<Record<string, unknown>> 
    }){
        const _id = id || uniqueId();
        this.list.push({
            id: _id,
            title,
            component,
            props,
            type,
            onConfirm,
            onCancel
        });
    }
    @action
    close(id: string){
        this.list = this.list.filter((_modal) => {
            return id !== _modal.id;
        });
    }
}