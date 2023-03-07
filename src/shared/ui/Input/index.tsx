import { Base } from "./Base";
import { Styled } from "./Styled";
import { IStyled } from "./types";

const Input = (props: IStyled) => <Styled {...props} />;

Input.Base = Base;

export default Input;
