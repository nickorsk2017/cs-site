export type SmartBoxState = {
    ghostData: {
        component: JSX.Element;
        data?: any;
        typeRecipient?: string;
        startPosition: {x: number, y: number};
        shiftLeft?: number;
        shiftTop?: number;
    } | null,
    popupData: any
};