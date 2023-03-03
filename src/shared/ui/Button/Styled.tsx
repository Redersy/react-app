import classNames from "classnames/bind";
import { Base } from "./Base";
import { IStyled } from "./types";
import styles from "./styles.module.scss";

const cnb = classNames.bind(styles);

export const Styled = (props: IStyled) => {
  return (
    <Base {...props} className={cnb("button")}>
      {props.children}
    </Base>
  );
};
