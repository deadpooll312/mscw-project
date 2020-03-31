import * as React from 'react';
import Slider from 'react-slick';

import { Camera } from 'app/store/modules/semantics/types';
import { Button as AndtButton } from 'antd';
import styled from 'styles';

import Loading from '@next/ui/atoms/Loading';
import usePrevious from '@next/hooks/usePrevious';
import CameraWindow, { CameraWrapper } from '@next/ui/organisms/CameraWindow/CameraWindow';

type Props = {
  camerasData: Camera[];

  slidesToShow: number;

  camerasLinks: string[];
  activeCamera: number;

  handleHoveredCamera: (index: number) => any;
  handleSetActiveCamera: (index: number) => any;
  handleFullSizeClick: (index: number) => any;
  handleClose: () => any;
};

const iconArrow = require('static/svg/arrow-angle-l.svg');

export const CamerasSlider: React.FC<Props> = React.memo(
  (props) => {
    const refSlider = React.useRef<Slider>(null);

    const activeCameraLast = usePrevious(props.activeCamera) ?? 0;

    React.useEffect(() => {
      if (refSlider.current) {
        return;

        if (Math.abs(props.activeCamera - activeCameraLast) < 3) {
          return;
        }

        refSlider.current.slickGoTo(Math.min(props.activeCamera, Math.max(props.camerasLinks.length - 3, 0)));
      }
    }, [props.activeCamera]);

    const handleCameraWindowMouseOver = React.useCallback(
      (e) => {
        const { index } = e.currentTarget.dataset;
        props.handleHoveredCamera(Number(index));
      },
      [props.handleHoveredCamera],
    );

    const handleCameraWindowMouseOut = React.useCallback(
      () => {
        props.handleHoveredCamera(null);
      },
      [props.handleHoveredCamera],
    );

    const handleCameraWindowClick = React.useCallback(
      (e) => {
        const { index } = e.currentTarget.dataset;
        props.handleSetActiveCamera(Number(index));
      },
      [props.handleSetActiveCamera],
    );

    /* Обработка нужна только для смены слайдов по клику на стрелки */
    const handleSlideChange = React.useCallback(
      (current) => {
        const index = Number(current);
        const lengthCamerasLinks = Object.keys(props.camerasLinks).length;
        // не обрабатывается, если у нас на слайдере меньше 3 слайдов
        // или сменились на слайды, которые находятся на последней странице слайдера
        // или событие сработало уже когда активная камера сменилась
        if (lengthCamerasLinks < 4 || current > lengthCamerasLinks - 3 || index === props.activeCamera) {
          return;
        }

        props.handleSetActiveCamera(Number(current));
      },
      [props.camerasLinks, props.activeCamera, props.handleSetActiveCamera],
    );

    const handleFullSizeClick = React.useCallback(
      (e) => {
        const { index } = e.currentTarget.dataset;
        props.handleFullSizeClick(Number(index));
      },
      [props.handleFullSizeClick],
    );

    return (
      <React.Fragment>
        <CloseButton icon="close" type="default" onClick={props.handleClose} />
        <SliderStyled
          ref={refSlider}
          slidesToShow={Math.min(props.slidesToShow, 3)}
          slidesToScroll={1}
          initialSlide={0}
          infinite={false}
          speed={500}
          nextArrow={<CustomNextArrow />}
          prevArrow={<CustomPrevArrow />}
          afterChange={handleSlideChange}
          centerMode={false}
          lazyLoad="progressive"
        >
          {
            props.camerasData.map(
              (camera, index) => (
                props.camerasLinks[index]
                  ? (
                    <CameraWindow
                      key={`${camera.id}-${index}`}
                      link={props.camerasLinks[index]}
                      height={200}
                      isSelected={index === props.activeCamera}
                      index={index}
                      name={camera.name}
                      address={camera.address}
                      onClick={handleCameraWindowClick}
                      onMouseOver={handleCameraWindowMouseOver}
                      onMouseOut={handleCameraWindowMouseOut}
                      onFullSizeClick={handleFullSizeClick}
                    />
                  ) : (
                    <CameraWrapper key={`${camera.id}-${index}`} isSelected={index === props.activeCamera}>
                      <Loading type="default" />
                    </CameraWrapper>
                  )
              )
            )
          }
        </SliderStyled>
      </React.Fragment>
    );
  },
);

function CustomNextArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowWrapper
      className={className}
      style={{ right: '-40px' }}
      onClick={onClick}
    >
      <Img src={iconArrow} />
    </ArrowWrapper>
  );
}

function CustomPrevArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowWrapper
      className={className}
      style={{ left: '-40px' }}
      onClick={onClick}
    >
      <Img src={iconArrow} isRotated />
    </ArrowWrapper>
  );
}

const Img = styled.img<{ isRotated?: boolean }>`
  transform: ${({ isRotated }) => (isRotated ? 'rotate(0deg)' : 'rotate(-180deg)')};
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const ArrowWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  &.slick-disabled {
    display: none;
  }

  &::before {
    display: none;
  }
`;

const SliderStyled = styled(Slider)`
  margin: 0 50px;

  .slick-track {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CloseButton = styled(AndtButton)`
  && {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    padding: 0 !important;
    background-color: transparent;
    color: white;
    border: 0;
    z-index: 3;

    &:hover {
      color: #fff;
      background-color: transparent;
    }

    .anticon.anticon-close {
      width: 100%;
      height: 100%;
      color: #2b55e6;

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export default CamerasSlider;
