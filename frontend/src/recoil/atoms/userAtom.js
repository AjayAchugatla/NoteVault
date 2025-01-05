import { atom } from "recoil";

export const userAtom = atom({
    key: "userInfo",
    default: JSON.parse(localStorage.getItem("userInfo")) || {},
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet((newValue) => {
                localStorage.setItem("userInfo", JSON.stringify(newValue));
            });
        }
    ]
});