import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface IBase extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  beforeIcon?: ReactNode;
}

export type IStyled = IBase;
