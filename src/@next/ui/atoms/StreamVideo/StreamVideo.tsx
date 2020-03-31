import * as React from 'react';
import flvjs from 'flv.js';
import styled from 'styles';

import Loading from '@next/ui/atoms/Loading';

type Props = {
  link: string;
  handlePlayVideo?: (arg: boolean) => any;
};

const StreamVideo: React.FC<Props> = React.memo(
  (props) => {
    const { link } = props;
    const [isLoading, setIsLoadin] = React.useState(false);

    const refVideoWrapper = React.useRef<HTMLVideoElement>(null);

    const refPlayer = React.useRef<flvjs.Player>(null);

    React.useEffect(() => {
      if (refPlayer.current) {
        refPlayer.current.destroy();
        refPlayer.current = null;
      }
      if (refVideoWrapper.current) {
        refVideoWrapper.current.addEventListener('loadeddata', () => {
          refVideoWrapper.current.style.opacity = '1';
          refVideoWrapper.current.style.transform = 'scale(1, 1)';
          setIsLoadin(false);
          if (props.handlePlayVideo) {
            props.handlePlayVideo(true);
          }
        });
        if (flvjs.isSupported()) {
          setIsLoadin(true);

          const videoElement = refVideoWrapper.current;
          const flvPlayer = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            cors: true,
            url: link,
            hasAudio: false,
          });
          refPlayer.current = flvPlayer;
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          flvPlayer.play();
        }
      }
      return () => {

        if (refPlayer.current) {
          refPlayer.current.destroy();
          refPlayer.current = null;
        }
      };
    }, [link]);

    return (
      <React.Fragment>
        { isLoading && <Loading type="default" /> }
        <VideoWrapper ref={refVideoWrapper} autoPlay />
      </React.Fragment>
    );
  },
);

export default StreamVideo;

export const VideoWrapper = styled.video`
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: scale(0.5, 0.5);
  transition: opacity 0.5s, transform 0.5s;
`;
