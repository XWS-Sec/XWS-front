export enum ActionColor {
  BLACK,
  RED,
}

export default interface Action {
  name: string;
  execute: (params?: any) => void;
  color?: ActionColor;
}
