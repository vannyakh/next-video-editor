import { IAudio } from "@designcombo/types";
import { BaseSequence, SequenceItemOptions } from "../base-sequence";
import { Audio as RemotionAudio } from "remotion";

import { calculateFrames } from "@/utils/frames";

export default function Audio({
  item,
  options
}: {
  item: IAudio;
  options: SequenceItemOptions;
}) {
  const { fps } = options;
  const { details } = item;
  const playbackRate = item.playbackRate || 1;
  const { durationInFrames } = calculateFrames(item.display, fps);

  // Calculate startFrom and endAt in frames, with proper fallbacks
  const startFrom = item.trim?.from != null 
    ? (item.trim.from / 1000) * fps 
    : 0;
  const endAt = item.trim?.to != null 
    ? (item.trim.to / 1000) * fps 
    : durationInFrames || fps; // Fallback to duration or at least 1 second

  const children = (
    <RemotionAudio
      startFrom={startFrom}
      endAt={endAt}
      playbackRate={playbackRate}
      src={details.src}
      volume={(details.volume ?? 100) / 100}
    />
  );
  return BaseSequence({ item, options, children });
}
