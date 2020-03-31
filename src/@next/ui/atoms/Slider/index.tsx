import * as React from 'react';
import ReactSlick, { Settings } from 'react-slick';
import styled from 'styled-components';
import Arrow from '@next/ui/atoms/Arrow';

type Props = {
  sliderWidth?: string;
  arrowMove?: number;
} & Settings;

const ReactSlickWrap = styled(ReactSlick)<Pick<Props, 'sliderWidth'>>`
  width: ${({ sliderWidth }) => sliderWidth ? `${sliderWidth}` : 'initial'};
  /* display: flex;
  justify-content: center;
  align-items: center; */

  .slick-track {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Slider: React.FC<Props> = React.memo(
  (props) => {
    const {
      sliderWidth,
      arrowMove,
      ...otherSettings
    } = props;

    return (
      <ReactSlickWrap
        sliderWidth={sliderWidth}
        {...otherSettings}
        slidesToShow={props.slidesToShow ?? 1}
        slidesToScroll={props.slidesToScroll ?? 1}
        initialSlide={props.initialSlide ?? 0}
        infinite={props.infinite ?? false}
        speed={props.speed ?? 500}
        nextArrow={props.nextArrow ?? <Arrow arrowMove={arrowMove} />}
        prevArrow={props.prevArrow ?? <Arrow arrowMove={arrowMove - 10} isRotated />}
      >
        {props.children}
      </ReactSlickWrap>
    );
  },
);

export default Slider;
