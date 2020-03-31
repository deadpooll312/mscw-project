import * as React from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';

const arrow = require('static/svg/arrow-angle-l.svg');

const SliderWrap = styled.div`
  position: relative;
  width: 100%;

  & .slick-prev{
    &::before{
      content: url(${arrow});
    }
  }
  & .slick-next{
    transform: rotate(180deg);
    &::before{
      content: url(${arrow});
    }
  }
`;

const settings: Settings = {
  dots: false,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: false,
};

const ReportSlider: React.FC = React.memo(
  (props) => {
    return (
      <SliderWrap>
        <Slider {...settings} >
          { props.children }
        </Slider>
      </SliderWrap>
    );
  },
);

export default ReportSlider;
