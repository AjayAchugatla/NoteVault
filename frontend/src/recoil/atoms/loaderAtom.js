import { atom } from "recoil";

export const loaderAtom = atom({
    key: "loading",
    default: true,
});