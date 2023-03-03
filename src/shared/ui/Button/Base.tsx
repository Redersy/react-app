import { IBase } from "./types";

export const Base = (props: IBase) => {
  return <button {...props}>{props.children}</button>;
};
