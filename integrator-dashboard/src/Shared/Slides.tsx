import Slide, { SlideProps } from "@material-ui/core/Slide";

export type TransitionProps = Omit<SlideProps, "direction">;

export function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}

export function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

export function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

export function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}
