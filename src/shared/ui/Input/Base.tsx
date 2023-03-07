import { IBase } from "./types";

export const Base = (props: IBase) => {
  return <input {...props}>{props.children}</input>;
};
