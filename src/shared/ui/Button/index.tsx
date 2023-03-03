import { Base } from "./Base";
import { Styled } from "./Styled";
import { IStyled } from "./types";

const Button = (props: IStyled) => <Styled {...props} />;

Button.Base = Base;

export default Button;
