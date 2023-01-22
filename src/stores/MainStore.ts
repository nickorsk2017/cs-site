import {
    ProfileStore,
    ModalStore,
} from ".";

export interface IMainStore {
    modalStore: ModalStore,
    profileStore: ProfileStore,
}

export class MainStore implements IMainStore {
    profileStore: ProfileStore
    modalStore: ModalStore
    constructor(){  
        this.profileStore = new ProfileStore();
        this.modalStore = new ModalStore();
    }
}