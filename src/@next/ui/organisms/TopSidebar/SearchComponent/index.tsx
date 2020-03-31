import * as React from 'react';
import { AutoComplete, Select, Input } from 'antd';
import styled from 'styles';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { AllSearchField, AllSearchStringField, AllSearchButtonField } from 'app/types';
import {
  selectModuleSidebarSearchFilterField,
  selectModuleSidebarSearchFilterValue,
  selectPrimaryFiltersWithoutTheme,
  selectSecondaryFiltersWithSearch
} from 'app/store/modules/sidebar/selectors';
import { changeSearchFilter } from 'app/store/modules/sidebar/actions';
import { getDashboardDataAction } from 'app/store/modules/dashboard/actions';
import { getIncidentsAction } from 'app/store/modules/semantics/actions';
import { getDashboardTableData } from 'app/store/modules/table/actions';
import { SidebarButton, StyledSidebarButton } from '@next/ui/atoms/SidebarButton';
import useSetSearchAndParams from '@next/hooks/useSearch/useSetSearchAndParams';
import { setViolationCardData } from 'app/store/modules/violation_card/actions';
import { SearchFilter } from 'app/store/modules/dashboard/types';

const Option = Select.Option;

const options: { key: AllSearchStringField; title: string }[] = [
  {
    key: AllSearchStringField.TICKET,
    title: 'По ID нарушения',
  },
  {
    key: AllSearchStringField.OBJECT_ID,
    title: 'По ID объекта',
  },
  {
    key: AllSearchStringField.ADDRESS,
    title: 'По адресу',
  },
  {
    key: AllSearchStringField.DEFECT_TEXT,
    title: 'По типу нарушения',
  }
];

const placeholder: Record<AllSearchStringField, string> = {
  [AllSearchStringField.TICKET]: 'Введите id',
  [AllSearchStringField.OBJECT_ID]: 'Введите id',
  [AllSearchStringField.ADDRESS]: 'Введите адрес',
  [AllSearchStringField.DEFECT_TEXT]: 'Введите нарушение',
};

enum PATHS {
  MAP = 'map',
  DASHBOARD = 'dashboard',
  TABLE = 'table'
}

const dispatchMethods = {
  [PATHS.MAP]: (primaryFiltersOwn, secondaryFiltersWithSearch) => getIncidentsAction(primaryFiltersOwn, secondaryFiltersWithSearch),
  [PATHS.DASHBOARD]: () => getDashboardDataAction(),
  [PATHS.TABLE]: () => getDashboardTableData({
    paginationData: {
      page: 0,
      size: 15,
      totalElements: 0,
      totalPages: 0,
    },
    sortData: {
      field: null,
      isReverse: false
    }
  }),
};

const filterOption = (inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;

type Props = {
  isDisabled: boolean;
};

const SearchComponent: React.FC<Props> = React.memo(
  (props) => {
    const dispatch = useDispatch();
    const filterField = useSelector(selectModuleSidebarSearchFilterField);
    const searchValue = useSelector(selectModuleSidebarSearchFilterValue);
    const primaryFiltersOwn = useSelector(selectPrimaryFiltersWithoutTheme);
    const secondaryFiltersWithSearch = useSelector(selectSecondaryFiltersWithSearch);
    const currentLocation = useLocation();

    const [localSearchValue, setLocalSearchValue] = React.useState<SearchFilter>({
      field: filterField,
      value: null,
      isActive: true,
      isButtonSearch: false,
      isStringSearch: true,
    });

    React.useEffect(
      () => {
        if (filterField !== localSearchValue.field) {
          const newSearchValue = {
            ...localSearchValue,
            field: filterField,
            value: null,
          };

          setLocalSearchValue(newSearchValue);

          if (searchValue) {
            dispatch(
              changeSearchFilter([newSearchValue])
            );
          }
        }
      },
      [filterField],
    );

    React.useEffect(
      () => {
        if (searchValue !== localSearchValue.value) {
          const newSearchValue = {
            ...localSearchValue,
            field: filterField,
            value: searchValue,
          };

          setLocalSearchValue(newSearchValue);
        }
      },
      [searchValue],
    );

    const {
      handleSetSearchAndParams,
    } = useSetSearchAndParams();

    const activeField = React.useMemo(() => filterField ? filterField : AllSearchField.TICKET, [filterField]);

    const currentPath = React.useMemo(
      () => currentLocation.pathname.split('/')[1] as PATHS,
      [currentLocation.pathname],
    );

    React.useEffect(
      () => {
        const dispatchedMethod = dispatchMethods[currentPath];

        if (dispatchedMethod && typeof dispatchedMethod === 'function') {
          dispatch(dispatchedMethod(primaryFiltersOwn, secondaryFiltersWithSearch));
          handleSetSearchAndParams({
            path: currentLocation.pathname,
            search: {
              violationPartialData: null,
            }
          });
          dispatch(
            setViolationCardData(null)
          );
        }
      },
      [searchValue],
    );

    const handleSelectField = React.useCallback(
      (field: AllSearchStringField | AllSearchButtonField) => {
        const newSearchValue = {
          ...localSearchValue,
          field: field,
          value: null,
        };

        dispatch(
          changeSearchFilter([newSearchValue])
        );
      },
      [],
    );

    const handleChangeFilterValue = React.useCallback(
      (value) => {
        setLocalSearchValue(
          (oldState) => {
            if (value) {
              return {
                ...oldState,
                value,
              };
            } else {
              dispatch(
                changeSearchFilter([
                  {
                    ...oldState,
                    value,
                  },
                ]),
              );
            }

            return oldState;
          },
        );
      },
      [],
    );

    const handleApplySearchFilters = React.useCallback(
      () => {
        dispatch(
          changeSearchFilter([localSearchValue]),
        );
      },
      [localSearchValue],
    );

    return (
      <StyledSearchComponent>
        <StyledSearchTitle>Поиск</StyledSearchTitle>
        <StyledSearch>
          <StyledSelect disabled={props.isDisabled} value={activeField} onSelect={handleSelectField}>
            {
              options.map(item =>  <Option key={item.key}>{item.title}</Option>)
            }
          </StyledSelect>
          <StyledAutoComplete
            allowClear
            dataSource={null}
            placeholder={placeholder[activeField]}
            filterOption={filterOption}
            value={localSearchValue.value as string}
            showClearIcon={Boolean(localSearchValue.value)}
            onChange={handleChangeFilterValue}
            disabled={props.isDisabled}
          >
            <Input onPressEnter={handleApplySearchFilters} disabled={props.isDisabled}/>
          </StyledAutoComplete>
          <SidebarButton
            title="Найти"
            value="search"
            isActive
            onClick={handleApplySearchFilters}
            disabled={props.isDisabled}
          />
        </StyledSearch>
      </StyledSearchComponent>
    );
  });

export default SearchComponent;

const StyledAutoComplete = styled(AutoComplete)<{showClearIcon?: boolean}>`
  &&& {
    width: 85%;
    margin-left: 10px;
  }
  &&& .ant-select-selection__clear {
    opacity: ${({showClearIcon}) => showClearIcon ? 1 : 0 };
  }
  z-index: 150;
`;

const StyledSelect = styled(Select)`
  && {
    width: 10%;
  }
  .ant-select-selection {
    background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground };
    border-color: ${({ theme }) => theme.colors.dashboardCard.boxShadow};
    color: ${({ theme }) => theme.colors.dashboardCard.defaultText};
  }
`;

const StyledSearch = styled.div`
  display: inline-block;
  width: 97%;
  .ant-select-selection--single{
    background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground };
  }
  .ant-select-selection__placeholder{
    color: ${({ theme }) => theme.colors.dashboardCard.boxShadow };
  }
  .ant-select-auto-complete.ant-select .ant-input{
    border-color: ${({ theme }) => theme.colors.dashboardCard.boxShadow};
  }
  ${StyledSidebarButton} {
    margin-left: 0.7%;
  }
`;

const StyledSearchTitle = styled.span`
  width: 3%;
  display: inline-block;
`;

export const StyledSearchComponent = styled.div`
  width: 100%;
  white-space: nowrap;
`;
