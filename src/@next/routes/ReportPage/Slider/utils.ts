import * as React from 'react';

const ReportFirstPage = React.lazy(() => (
  import(/* webpackChunkName: "@next_ReportFirstPage" */ '@next/routes/ReportPage/Slider/FirstPage')
));
const ReportSecondPage = React.lazy(() => (
  import(/* webpackChunkName: "@next_ReportSecondPage" */ '@next/routes/ReportPage/Slider/SecondPage')
));
const ReportThirdPage = React.lazy(() => (
  import(/* webpackChunkName: "@next_ReportThirdPage" */ '@next/routes/ReportPage/Slider/ThirdPage')
));
const ReportFourthPage = React.lazy(() => (
  import(/* webpackChunkName: "@next_ReportFourthPage" */ '@next/routes/ReportPage/Slider/FourthPage')
));
const ReportFifthPage = React.lazy(() => (
  import(/* webpackChunkName: "@next_ReportFifthPage" */ '@next/routes/ReportPage/Slider/FifthPage')
));
const ReportSixthPage = React.lazy(() => (
  import(/* webpackChunkName: "@next_ReportSixthPage" */ '@next/routes/ReportPage/Slider/SixthPage')
));
const ReportSeventhPage = React.lazy(() => (
  import(/* webpackChunkName: "@next_ReportSeventhPage" */ '@next/routes/ReportPage/Slider/SeventhPage')
));

type ReportPage = {
  pageNumber: number;
  Component: React.ComponentType<{}>;
};

export const getPages = (): ReportPage[] => ([
  {
    pageNumber: 1,
    Component: ReportFirstPage,
  },
  {
    pageNumber: 2,
    Component: ReportSecondPage,
  },
  {
    pageNumber: 3,
    Component: ReportThirdPage,
  },
  {
    pageNumber: 4,
    Component: ReportFourthPage,
  },
  {
    pageNumber: 5,
    Component: ReportFifthPage,
  },
  {
    pageNumber: 6,
    Component: ReportSixthPage,
  },
  {
    pageNumber: 7,
    Component: ReportSeventhPage,
  },

]);