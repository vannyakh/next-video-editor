import { ITextDetails } from "@designcombo/types";
import TypeWriterIn from "./text-animated-types/animations-in/type-writer-in";
import BackgroundIn from "./text-animated-types/animations-in/background-in";
import SoundWaveIn from "./text-animated-types/animations-in/sound-wave-in";
import CountDownIn from "./text-animated-types/animations-in/count-down-in";
import { JSX } from "react";

type FullTextAnimationProps = {
  frame: number;
  text: string;
  details: ITextDetails;
  fps: number;
  durationInFrames: number;
  animationTextInFrames: number;
  animationTextOutFrames: number;
  animationTextLoopFrames: number;
  animationFonts: { fontFamily: string; url: string }[];
  validAnimIn: boolean;
  validAnimOut: boolean;
  textAnimationNameIn: string;
  textAnimationNameOut: string;
  textAnimationNameLoop: string;
};

export const renderFullTextAnimation = ({
  frame,
  text,
  details,
  fps,
  durationInFrames,
  animationTextInFrames,
  animationTextOutFrames,
  animationFonts,
  validAnimIn,
  validAnimOut,
  textAnimationNameIn,
  textAnimationNameOut,
  textAnimationNameLoop
}: FullTextAnimationProps): JSX.Element | null => {
  // Animaciones de entrada
  if (validAnimIn) {
    if (textAnimationNameIn === "typeWriterIn") {
      return (
        <TypeWriterIn
          frame={frame}
          durationInFrames={animationTextInFrames}
          text={text}
          style={details}
        />
      );
    }

    if (textAnimationNameIn === "backgroundAnimationIn") {
      return (
        <BackgroundIn
          text={text}
          frame={frame}
          details={details}
          animationTextInFrames={animationTextInFrames}
        />
      );
    }

    if (textAnimationNameIn === "soundWaveIn") {
      return (
        <SoundWaveIn
          text={text}
          frame={frame}
          animationTextInFrames={animationTextInFrames}
          details={details}
        />
      );
    }

    if (textAnimationNameIn === "countDownAnimationIn") {
      return (
        <CountDownIn
          text={text}
          frame={frame}
          animationTextInFrames={animationTextInFrames}
          details={details}
        />
      );
    }
  }


  return null;
};