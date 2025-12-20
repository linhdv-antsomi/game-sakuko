// Libraries
import clsx from "clsx";
import { VolumeUpIcon } from "components/icons";
import { useAudioContext } from "contexts";
import { VolumeOffIcon } from "lucide-react";
import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { useLocalStorage } from "usehooks-ts";
import { audioManager } from "utils";

interface VolumeAudioControlProps extends React.HTMLAttributes<HTMLButtonElement> {}

const VolumeButton = styled.button`
  position: absolute;
  width: 30px;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000051;
  top: var(--header-padding-top);
  left: 24px;
  color: #ffffff;
  transition: all 0.3s ease-in-out;
  z-index: 10000;
`;

export const VolumeAudioControl: React.FC<VolumeAudioControlProps> = (props) => {
  const { className, ...restProps } = props;
  const [isVolumeOn, setIsVolumeOn] = useLocalStorage("isVolumeOn", true);
  const { isMuted, toggleMute} = useAudioContext();

  const onClickVolume = useCallback(() => {
    setIsVolumeOn(!isVolumeOn);
  }, [isVolumeOn, setIsVolumeOn]);

  useEffect(() => {
    if (isVolumeOn) {
      audioManager.unmuteAllByUser();
      if (isMuted) {
        toggleMute();
      }
    } else {
      audioManager.muteAllByUser();
      if (!isMuted) {
        toggleMute();
      }
    }
  }, [isVolumeOn]);

  return (
    <VolumeButton
      className={clsx(className, {
        "opacity-50": !isVolumeOn,
      })}
      {...restProps}
      onClick={onClickVolume}
    >
      {isVolumeOn ? <VolumeUpIcon width={20} /> : <VolumeOffIcon width={20} />}
    </VolumeButton>
  );
};
