import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import { Button, ImageContainer, TextButton } from "./styles";

interface Props extends RectButtonProps {
  text: string;
  svg: React.FC<SvgProps>;
}
export const SocialButtonSingIn = ({
  text,
  svg: Svg,
  ...rest
}: Props): JSX.Element => {
  return (
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <TextButton>{text}</TextButton>
    </Button>
  );
};
