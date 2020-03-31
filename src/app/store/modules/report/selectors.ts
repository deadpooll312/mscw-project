import { createSelector } from 'reselect';

import {
  SECOND_PAGE,
  THIRD_PAGE,
  FOURTH_PAGE,
  FIFTH_PAGE,
  SIXTH_PAGE,
  SEVENTH_PAGE,
} from 'app/store/modules/report/constants';

import { ReduxState } from 'app/store/modules/@types';
import { openObj } from '@next/utils/common';

export function selectReportModule(state: ReduxState) {
  return state.report;
}

export function selectDate(state: ReduxState) {
  return selectReportModule(state).date;
}

//select different states

export function selectData(state: ReduxState) {
  return selectReportModule(state).data;
}

export function selectHasData(state: ReduxState) {
  return Boolean(selectData(state));
}

export function selectIsLoading(state: ReduxState) {
  return selectReportModule(state).isLoading;
}

export function selectDataSemantic(state: ReduxState) {
  return selectData(state)?.semantic || null;
}

export function selectDataSemanticPageIndex(state: ReduxState) {
  return selectDataSemantic(state)?.pagesIndex;
}
export function selectDataSemanticPageIndexSecond(state: ReduxState) {
  return selectDataSemanticPageIndex(state)?.[SECOND_PAGE];
}
export function selectDataSemanticPageIndexThird(state: ReduxState) {
  return selectDataSemanticPageIndex(state)?.[THIRD_PAGE];
}
export function selectDataSemanticPageIndexFourth(state: ReduxState) {
  return selectDataSemanticPageIndex(state)?.[FOURTH_PAGE];
}
export function selectDataSemanticPageIndexFifth(state: ReduxState) {
  return selectDataSemanticPageIndex(state)?.[FIFTH_PAGE];
}
export const selectDataSemanticPageIndexRegionFifth = createSelector(
  selectDataSemanticPageIndexFifth,
  (data) => {
    return data?.regions?.reduce(
      (newArr, item) => {
        newArr.push({
          ...item,
          ...openObj('departmentalControl', item.departmentalControl),
          ...openObj('citizenControl', item.citizenControl),
          ...openObj('consolidatedControl', item.consolidatedControl),
        });

        return newArr;
      },
      [],
    );
  },
);

export function selectDataSemanticPageIndexSixth(state: ReduxState) {
  return selectDataSemanticPageIndex(state)?.[SIXTH_PAGE];
}
export function selectDataSemanticPageIndexSeventh(state: ReduxState) {
  return selectDataSemanticPageIndex(state)?.[SEVENTH_PAGE];
}

export const selectReportPageNumbers = createSelector(
  selectDataSemantic,
  (semantic) => {
    const pagesIndex = semantic?.pagesIndex || {};

    return [
      1,
      ...Object.keys(pagesIndex).map((keyPage) => Number(keyPage)),
    ];
  }

);

export function selectColorSchema(state: ReduxState) {
  return selectReportModule(state)?.data?.colorSchema;
}
export function selectColorSchemaLegent(state: ReduxState) {
  return selectColorSchema(state).legend;
}
export function selectColorSchemaColorCode(state: ReduxState) {
  return selectColorSchema(state)?.colorCode;
}
