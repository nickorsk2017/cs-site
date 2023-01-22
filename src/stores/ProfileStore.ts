import {makeObservable, observable, action} from "mobx";
import {Profile} from '@types';

export interface ILessonsStore {
    profile: Profile
}

export type SectionType = "top-lesson" | "top-folder" | "bottom-lesson" | "bottom-folder";

export class ProfileStore implements ILessonsStore {
    @observable profile: Profile | null = null;
    constructor() {
        makeObservable(this);
    }
    @action
    fill(profile: Profile){
        this.profile = profile;
    }
}