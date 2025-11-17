import { ITextDetails } from "@designcombo/types";
import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import SunnyMorningsAnimationIn from "./text-animated-types/animations-in/sunny-mornings-in";
import DominoDreamsIn from "./text-animated-types/animations-in/domino-dreams-in";
import GetThinkersAnimationIn from "./text-animated-types/animations-in/great-thinkers-in";
import BeatifulQuestionAnimationIn from "./text-animated-types/animations-in/beatiful-question-in";
import MadeWithLoveAnimationIn from "./text-animated-types/animations-in/made-with-love-in";
import RealityIsBrokenAnimationIn from "./text-animated-types/animations-in/reality-is-broken-in";
import DropAnimationIn from "./text-animated-types/animations-in/drop-in";
import DescompressAnimationIn from "./text-animated-types/animations-in/descompress-in";
import { renderFullTextAnimation } from "./text-animated-full";

const animationsIn: { [key: string]: React.FC<any> } = {
  sunnyMorningsAnimationIn: SunnyMorningsAnimationIn,
  dominoDreamsIn: DominoDreamsIn,
  greatThinkersAnimationIn: GetThinkersAnimationIn,
  beautifulQuestionsAnimationIn: BeatifulQuestionAnimationIn,
  madeWithLoveAnimationIn: MadeWithLoveAnimationIn,
  realityIsBrokenAnimationIn: RealityIsBrokenAnimationIn,
  dropAnimationIn: DropAnimationIn,
  descompressAnimationIn: DescompressAnimationIn
};


const getTextLines = (
  text: string,
  width: number,
  fontSize: number
): string[] => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) return [];

  context.font = `${fontSize}px Arial`;
  const words = text.split(" ");
  let lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const textWidth = context.measureText(testLine).width;

    if (textWidth > width) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) lines.push(currentLine);

  return lines;
};

export const TextAnimated: React.FC<{
  text: string;
  fps: number;
  textAnimationNameIn: string;
  textAnimationNameOut: string;
  textAnimationNameLoop: string;
  details: ITextDetails;
  animationTextInFrames: number;
  animationTextOutFrames: number;
  animationTextLoopFrames: number;
  durationInFrames: number;
  animationFonts: { fontFamily: string; url: string }[];
}> = ({
  text,
  fps,
  textAnimationNameIn,
  textAnimationNameOut,
  textAnimationNameLoop,
  details,
  animationTextInFrames,
  animationTextOutFrames,
  animationTextLoopFrames,
  durationInFrames,
  animationFonts
}) => {
  const frame = useCurrentFrame();
  const animInFrom = animationTextInFrames;
  const animOut = durationInFrames - animationTextOutFrames;
  const validAnimIn = textAnimationNameIn ? animInFrom >= frame : false;
  const validAnimOut = textAnimationNameOut ? animOut < frame : false;
  if (!validAnimOut && !validAnimIn) {
    return (
      <div
        style={{
          whiteSpace: "pre-line",
          maxWidth: "100%"
        }}
      >
        {text}
      </div>
    );
  }

  const lines = getTextLines(text, details.width, details.fontSize);

  const fullTextAnimation = renderFullTextAnimation({
    frame,
    text,
    details,
    fps,
    durationInFrames,
    animationTextInFrames,
    animationTextOutFrames,
    animationTextLoopFrames,
    animationFonts,
    validAnimIn,
    validAnimOut,
    textAnimationNameIn,
    textAnimationNameOut,
    textAnimationNameLoop
  });

  if (fullTextAnimation) {
    return fullTextAnimation;
  }

  const maxTextLengthInLine = lines.reduce(
    (max, line) => Math.max(max, line.length),
    0
  );

  const AnimationComponentIn = animationsIn[textAnimationNameIn];

  return (
    <>
      {lines.map((line, rowIndex) => (
        <div key={rowIndex}>
          {line.split("").map((char, index) => {
            if (validAnimIn && AnimationComponentIn) {
              return (
                <AnimationComponentIn
                  key={index}
                  char={char}
                  index={index}
                  frame={frame}
                  textLength={maxTextLengthInLine}
                  fps={fps}
                  animationTextInFrames={animationTextInFrames}
                  details={details}
                />
              );
            }
 
            
            return <span key={index}>{char}</span>;
          })}
        </div>
      ))}
    </>
  );
};