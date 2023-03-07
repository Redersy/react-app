import { InputHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface IBase extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  beforeIcon?: ReactNode;
}

export type IStyled = IBase;
