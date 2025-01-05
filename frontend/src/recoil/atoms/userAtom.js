import { atom } from "recoil";

export const userAtom = atom({
    key: "userInfo",
    default: JSON.parse(localStorage.getItem("userInfo")) || {},
    effects_UNSTABLE: [
        ({ setSelf }) => {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if (userInfo)
                setSelf(userInfo);
            else
                setSelf({});
        }
    ]
});