import * as React from 'react';
import Modal from '@next/ui/atoms/Modal';
import Loading from '@next/ui/atoms/Loading';

import { StyledHelpInfo, DropdownButtons, StyledAntBtn, StyledTitleWrap, CloseModalButton } from './styled';
import { townAliases, cityColumns, cityObjectsColumns, regionObjectsColumns } from './constants';

const AdvancedTableContainer = React.lazy(() => (
  import(/* webpackChunkName: "AdvancedTableContainer" */ 'components/HelpInfo/widgets/AdvancedTableContainer')
));

type HelpInfoComponentProps = {
  alias: 'region' | 'district' | 'violation';
  objectsInfo: any;
  areaInfo: any;
  isLoading: boolean;
};

const HelpInfo: React.FC<HelpInfoComponentProps> = React.memo(
  (props) => {
    const { alias, objectsInfo, areaInfo, isLoading } = props;
    const currentAlias = townAliases[alias];
    const [objectsSelected, setObjectsSelected] = React.useState(true);
    const [isInfoHidden, setInfoHidden] = React.useState(true);

    const onBtnClick = (value: boolean) => () => setObjectsSelected(value);

    // TODO скрываем
    // const onTitleClick = () => {
    //   setInfoHidden(!isInfoHidden);
    // };

    React.useEffect(()=> {
      if (alias === 'violation') {
        setObjectsSelected(true);
      }
    }, [alias]);

    const onClose = () => setInfoHidden(true);

    const columns = React.useMemo(
      () => {
        if (alias === 'region' && !objectsSelected) {
          return cityObjectsColumns;
        } else if (alias === 'district' && !objectsSelected) {
          return regionObjectsColumns;
        } else {
          return cityColumns;
        }
      },
      [alias, objectsSelected, cityObjectsColumns, regionObjectsColumns, cityColumns],
    );

    return(
      <StyledHelpInfo isActive={!isInfoHidden}>
        <StyledTitleWrap>
          {/* TODO временно скрываем */}
          {/* <StyledTitle isActive={!isInfoHidden} onClick={onTitleClick}>
            Справочная информация по { currentAlias?.title }
          </StyledTitle> */}
        </StyledTitleWrap>
        {
          !isInfoHidden && (
            <Modal>
              <DropdownButtons>
                <StyledAntBtn type={objectsSelected? 'primary' : 'default'} onClick={onBtnClick(true)}>
                  По объектам
                </StyledAntBtn>
                {
                  currentAlias.infoTitle && (
                    <StyledAntBtn type={!objectsSelected? 'primary' : 'default'} onClick={onBtnClick(false)}>
                      По {currentAlias.infoTitle}
                    </StyledAntBtn>
                  )
                }
              </DropdownButtons>
              {
                isLoading
                  ? <Loading type="new_spinner" />
                  : (
                    <React.Suspense fallback={<Loading type="new_spinner" />} >
                      <AdvancedTableContainer 
                        columns={columns} 
                        dataSource={objectsSelected ? objectsInfo : areaInfo}
                        visibleRowsCount={5}
                        maxContainerHeight={300}
                        tableWidth={733}
                        bodyHeight={110}
                        columnHeight={45}
                        // columnWidth={145}
                        columnWidth={265}
                      />
                    </React.Suspense>
                  )
              }
              <CloseModalButton icon="close" type="default" onClick={onClose} />
            </Modal>
          )
        }
      </StyledHelpInfo>
    );
  },
);

export default HelpInfo;
