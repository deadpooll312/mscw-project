import * as React from 'react';
import queryString  from 'query-string';

import styled, { css } from 'styles';

import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/modules/app/selectors';
import { checkRole } from '@next/utils/checkOnPermission';
import { ViolationCardDTO } from 'app/swagger/model/violationCardDTO';
import Slider from '@next/ui/atoms/Slider';
import SwitchToFullScreen, { ButtonToggle } from '@next/ui/atoms/SwitсhToFullScreen';
import { loadViolationCardData } from 'app/api/violations';
import { getCameraStream } from 'app/api/camera';
import Loading from '@next/ui/atoms/Loading';
import FlexContainer from '@next/ui/atoms/FlexContainer';
import { SidebarButton, StyledSidebarButton } from '@next/ui/atoms/SidebarButton';
import { MAP_DATA_PERMISSIONS, MAP_PERMISSION, ROLES } from 'app/permissions/constants';
import { FullSizeCamera } from 'containers/layers/CamerasLayer/FullSizeCamera';
import { Icon } from 'antd';
import StreamVideo from '@next/ui/atoms/StreamVideo/StreamVideo';

export const checkLinkPermissions = (userRole: keyof typeof ROLES) =>
  MAP_DATA_PERMISSIONS[userRole] && (MAP_DATA_PERMISSIONS[userRole] as MAP_PERMISSION[]).includes(MAP_PERMISSION.LINKS) || null;

const icons = {
  photo: require('static/dashboard_table/icon_photo_na.png'),
  video: require('static/dashboard_table/icon_video_na.png'),
};

const iconsActive = {
  photo: require('static/dashboard_table/icon_photo_a.png'),
  video: require('static/dashboard_table/icon_video_a.png'),
};

type Props = {
  defect: {
    text: string;
    idSystemsName: string;
    hasfotovideo: boolean;
    dataToRequest: {
      ID_object: string;
      ticket: string;
      data_creation: string;
      ID: string;
      system: string;
    };
  };
};

const BlockFotosVideo: React.FC<Props> = React.memo(
  (props) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [photoVideoData, setPhotoVideoData] = React.useState<ViolationCardDTO>(null);
    const [videoUrlWithoutCookie, setVideoUrlWithoutCookie] = React.useState<string>(null);
    const [fullSizeVideo, setFullSizeVideo] = React.useState<boolean>(false);

    const [someCache, setSomeCache] = React.useState<Record<string, ViolationCardDTO>>({});
    const [selectedPhotoMode, setselectedPhotoMode] = React.useState<keyof Pick<ViolationCardDTO, 'fotosBefore' | 'fotosAfter'>>('fotosBefore');
    const [selectedMode, setSelectedMode] = React.useState<'photo' | 'video'>('photo');
    const refMainSection = React.useRef(document.querySelector('#main-section'));
    const user = useSelector(selectUser);
    const userRole = React.useMemo(() => checkRole(user), [user]);

    const handleSelectPhoto = React.useCallback(
      () => {
        setSelectedMode('photo');
        setselectedPhotoMode('fotosBefore');
      },
      [],
    );
    const handleSelectVideo = React.useCallback(
      () => {
        setSelectedMode('video');
      },
      [],
    );

    const handleFullSizeBtnClick = React.useCallback(
      () => setFullSizeVideo(prevValue => !prevValue), []);

    React.useEffect(
      () => {
        handleSelectPhoto();
        const params = queryString.stringify(props.defect.dataToRequest);
        const cacheData = someCache[params];

        if (cacheData) {
          setPhotoVideoData(cacheData);
        } else {
          const loadData = async () => {
            setIsLoading(true);
            const data = await loadViolationCardData(props.defect.dataToRequest);
            setIsLoading(false);

            if (!checkLinkPermissions(userRole)) {
              delete data.video;
            }
            setPhotoVideoData(data);
            setSomeCache((oldSomeCacheData) => ({
              ...oldSomeCacheData,
              [params]: data,
            }));

          };

          loadData();
        }

      },
      [props.defect],
    );

    React.useEffect(() => {
      if (selectedMode === 'video' && photoVideoData && props.defect?.dataToRequest?.data_creation) {
        const cameraId = photoVideoData?.video?.cameraId;
        const dataCreation = props.defect?.dataToRequest?.data_creation;

        if (cameraId && dataCreation) {
          getCameraStream(cameraId, dataCreation)
            .then((response) => {
              if (response) {
                setVideoUrlWithoutCookie(response.data.urlStreamArchive);
              }
            });
        }
        return () => {
          setVideoUrlWithoutCookie(null);
        };
      }
    }, [photoVideoData, props.defect?.dataToRequest?.data_creation, selectedMode]);

    const handleChangeSetselectedPhotoMode = React.useCallback(
      (event: React.BaseSyntheticEvent<{}, {}, { value: typeof selectedPhotoMode }>) => {
        setselectedPhotoMode(event?.target?.value);
      },
      [],
    );

    const hasFotosBefore = Boolean(photoVideoData?.fotosBefore?.length);
    const hasFotosAfter = Boolean(photoVideoData?.fotosAfter?.length);
    const hasVideo = Boolean(photoVideoData?.video?.cameraId);

    const hasPhotoData = hasFotosBefore || hasFotosAfter;
    const hasSomeData = hasPhotoData || hasVideo;

    React.useEffect(
      () => {
        if (photoVideoData) {
          if (selectedPhotoMode === 'fotosBefore' && !hasFotosBefore && hasFotosAfter) {
            setselectedPhotoMode('fotosAfter');
          }
          if (selectedPhotoMode === 'fotosAfter' && !hasFotosAfter && hasFotosBefore) {
            setselectedPhotoMode('fotosBefore');
          }
        }
      },
      [photoVideoData, hasFotosBefore, hasFotosAfter, selectedPhotoMode],
    );

    return (
      <Container isLoading={isLoading}>
        {
          isLoading
            ? <Loading type="new_spinner" />
            : hasSomeData && (
              <BlockData>
                <TitleContainer>
                  <LabelData>
                    <span>Фото-/видеофиксация</span>
                    <ModeIconContainer>
                      {
                        hasPhotoData && (
                          <ModeIcon type="photo" onClick={handleSelectPhoto} isActive={selectedMode === 'photo'} />
                        )
                      }
                      {
                        hasVideo && (
                          <ModeIcon type="video" onClick={handleSelectVideo} isActive={selectedMode === 'video'}/>
                        )
                      }
                    </ModeIconContainer>
                  </LabelData>
                </TitleContainer>
                <PhotoVideoContainer>
                  {
                    selectedMode === 'photo' && (
                      <React.Fragment key={selectedPhotoMode.toString()}>
                        <Slider sliderWidth="470px" arrowMove={0} >
                          {
                              photoVideoData?.[selectedPhotoMode]?.map((foto) => (
                                <div key={foto.url}>
                                  <SwitchToFullScreen>
                                    <PhotoDiv imgSrc={foto.url} />
                                  </SwitchToFullScreen>
                                </div>
                              ))
                          }
                        </Slider>
                        <PhotoButtonContainer justifyContent="center">
                          {
                            Boolean(photoVideoData?.fotosBefore?.length) && (
                              <SidebarButton
                                onClick={handleChangeSetselectedPhotoMode}
                                value="fotosBefore"
                                title="Фото"
                                isActive={selectedPhotoMode === 'fotosBefore'}
                              />
                            )
                          }
                          {
                            Boolean(photoVideoData?.fotosAfter?.length) && (
                              <SidebarButton
                                onClick={handleChangeSetselectedPhotoMode}
                                value="fotosAfter"
                                title="Устранение"
                                isActive={selectedPhotoMode === 'fotosAfter'}
                              />
                            )
                          }
                        </PhotoButtonContainer>
                      </React.Fragment>

                    )
                  }
                  {
                    selectedMode === 'video' && (
                      <VideoWrapper>
                        <ButtonToggle onClick={handleFullSizeBtnClick}><Icon type="arrows-alt" /></ButtonToggle>
                        {
                          fullSizeVideo
                            ? (
                              <FullSizeCamera
                                link={videoUrlWithoutCookie}
                                parentContainer={refMainSection.current}
                                onFullSizeShrinkClick={handleFullSizeBtnClick}
                              />
                            )
                            : <StreamVideo link={videoUrlWithoutCookie} />
                        }
                      </VideoWrapper>
                    )
                  }
                </PhotoVideoContainer>
              </BlockData>
            )
        }
      </Container>
    );
  },
);

export default BlockFotosVideo;

const PhotoButtonContainer = styled(FlexContainer)`
  ${StyledSidebarButton} {
    margin: 2.5px 5px;
  }
`;

const Container = styled.div<{ isLoading: boolean }>`
  position: relative;
  ${({ isLoading }) => isLoading && css`
    min-height: 100px;
  `}
  max-height: 470px;

  .slick-list {
    max-height: 470px;
  }
`;

const ModeIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 -5px;
`;

const ModeIcon = styled.div<{ type: 'photo' | 'video'; isActive: boolean }>`
  content: ${({ type, isActive }) => `url(${
    !isActive
      ? icons[type]
      : iconsActive[type]
  })`
};
  width: 20px;
  margin: 0 5px;

  cursor: pointer;

  transform: scale(${({ isActive }) => isActive ? '1.25, 1.25' : '1, 1'});

  transition: transform 0.3s;
`;

const BlockData = styled.div`
  margin-bottom: 20px;
`;

const LabelData = styled.div`
  margin-bottom: 10px;

  display: flex;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  margin-bottom: 20px;
`;

const PhotoVideoContainer = styled.div`
  margin-bottom: 20px;
`;

const PhotoDiv = styled.div<{ imgSrc: string }>`
  background: url(${({ imgSrc }) => imgSrc});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 100%;
  height: 470px;
`;

const VideoWrapper = styled.div`
  position: relative;
  max-height: 470px;
`;
