import * as React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';
import DropdownOption from '@next/ui/organisms/ViolationCard/DefectsBlock/PickDefectBlock/DropdownOption';
import { useDispatch, useSelector } from 'react-redux';
import { selectModuleSidebarSeason } from 'app/store/modules/sidebar/selectors';
import { Season } from 'app/store/modules/@types';
import { downloadInstruction } from 'app/store/modules/app/actions';

import { CloseModalButton } from 'components/ModalMatrix/styled';
import Loading from '@next/ui/atoms/Loading';

const MatrixLazy = React.lazy(() => (
  import(/* webpackChunkName: "MatrixLazy" */ 'components/ModalMatrix')
));

const CriticalityLazy = React.lazy(() => (
  import(/* webpackChunkName: "CriticalityLazy" */ 'components/HelpInfo/ModalCriticality')
));

const helpInfoList = [
  {
    idSystemsName: 'instruction',
    text: 'Инструкция пользователя',
  },
  {
    idSystemsName: 'matrix',
    text: 'Матрица учета нарушений',
  },
  {
    idSystemsName: 'critical',
    text: 'Критичность нарушений',
  },
  {
    idSystemsName: 'techSup',
    text: 'Техподдержка',
  }
];

type HelpInfoDropdownProps = {
  visible: boolean;
  setHiddenOther(): void;
};

export const HelpInfoDropdown: React.FC<HelpInfoDropdownProps> = React.memo(
  (props) => {
    const { visible, setHiddenOther } = props;
    const dispatch = useDispatch();

    const [openMatrix, setOpenMatrix] = React.useState(false);
    const [openCriticality, setOpenCriticality] = React.useState(false);

    const seasonActive = useSelector(selectModuleSidebarSeason);

    const isMixedMonitor = React.useMemo(() => seasonActive === Season.MIXED, [seasonActive]);
    const isWinterMonitor = React.useMemo(() => seasonActive === Season.WINTER, [seasonActive]);
    const isSummerMonitor = React.useMemo(() => seasonActive === Season.ALL, [seasonActive]);

    const ref = React.useMemo(
      () => document.getElementById('main-section'),
      [],
    );

    const handleSelect = React.useCallback(
      (item) => {
        if (item.idSystemsName === 'instruction') {
          dispatch(downloadInstruction());
        }
        if (item.idSystemsName === 'matrix') {
          setOpenMatrix(true);
        }
        if (item.idSystemsName === 'critical') {
          setOpenCriticality(true);
        }
        if (item.idSystemsName === 'techSup') {
          window.open('mailto:helpdesk-monitor@mos.ru ');
        }
        setHiddenOther();
      },
      [],
    );

    const onMatrixClick = React.useCallback(
      () => {
        setOpenMatrix((oldState) => !oldState);
        setOpenCriticality(false);
      },
      [],
    );
    const onCriticalityClick = React.useCallback(
      () => {
        setOpenMatrix(false);
        setOpenCriticality((oldState) => !oldState);
      },
      [],
    );

    React.useEffect(()=> {
      if (visible) {
        setOpenCriticality(false);
        setOpenMatrix(false);
      }
    }, [visible]);

    const list = React.useMemo(
      () => {
        if (isMixedMonitor || isWinterMonitor) {
          return helpInfoList;
        }
        return helpInfoList.filter(item => item.idSystemsName !== 'critical');
      }, [seasonActive]);

    return (
      <React.Fragment>
        <OutsideClickHandler onOutsideClick={setHiddenOther}>
          <HelpInfoListContainerWrap isVisible={visible}>
            <HelpInfoListContainer isVisible={visible}>
              {
                list.map(item =>
                  <DropdownOption
                    key={item.idSystemsName}
                    item={item}
                    handleSelect={handleSelect}
                  />
                )
              }
            </HelpInfoListContainer>
          </HelpInfoListContainerWrap>
        </OutsideClickHandler>
        {
          ref
          && ReactDOM.createPortal(
            <React.Fragment>
              {
                openMatrix && (
                  <ModalMatrix>
                    <React.Suspense fallback={<Loading />}>
                      <CloseModalButton icon="close" type="default" onClick={onMatrixClick} />
                      <MatrixLazy
                        isSummerMonitor={isSummerMonitor}
                        isMixedMonitor={isMixedMonitor}
                        isWinterMonitor={isWinterMonitor}
                      />
                    </React.Suspense>
                  </ModalMatrix>
                )
              }
              {
                (isWinterMonitor || isMixedMonitor) && (
                  <React.Fragment>
                    {
                      openCriticality && (
                        <React.Fragment>
                          <ModalCriticality>
                            <React.Suspense fallback={<Loading />}>
                              <CloseModalButton icon="close" type="default" onClick={onCriticalityClick} />
                              <CriticalityLazy />
                            </React.Suspense>
                          </ModalCriticality>
                        </React.Fragment>
                      )
                    }
                  </React.Fragment>
                )
              }
            </React.Fragment>
            , ref)
        }

      </React.Fragment>
    );
  });

const HelpInfoListContainerWrap = styled.div<{ isVisible: boolean }>`
  position: absolute;
  width: 260px;
  right: -23px;
  top: 35px;
  padding: 15px 20px;
  z-index: 10;

  ${({ isVisible }) => !isVisible && css`
    z-index: -100;
    visibility: hidden;
  `}
`;

const HelpInfoListContainer = styled.div<{ isVisible: boolean }>`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.dashboardCard.boxShadow};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};
  padding: 15px 20px;

  overflow: auto;

  transform: translateY(${({ isVisible }) => isVisible ? '0' : '-100%'}) scaleY(${({ isVisible }) => isVisible ? '1' : '0'});
  transition: transform 0.1s;
  max-height: 500px;
`;

const ModalMatrix = styled.div`
  z-index: 1000;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground} !important;
  transition: background-color 0.5s;
  min-width: 700px;
  width: 70%;
  height: 500px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.dashboardCard.boxShadow};
  box-shadow: 0px 15px 15px 0 rgba(0,0,0,0.15);
  overflow-y: auto;
  @media (min-width: 1600px) and (max-width: 4000px)  {
    width: 80%;
    height: 700px;
  }
`;

const ModalCriticality = styled(ModalMatrix)`
  height: 80%;
  overflow-y: auto;
  padding: 35px 15px 15px 15px;
`;
