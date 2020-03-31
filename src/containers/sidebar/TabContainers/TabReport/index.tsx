import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Select, notification, Icon } from 'antd';

import { FilePicker } from 'containers/sidebar/TabContainers/TabReport/FilePicker';
import { ReportType, getReportTypes, checkReportStatus, getReportID } from 'app/api/reports';
import { Container, StyledButton, ButonsContainer, StyledSelect, DownloadButton, ReportButton, ButtonWrap, PrimaryDataButton } from './styles';
import { uploadReportFiles } from './utils';
import { ROLES } from 'app/permissions/constants';
import { DateComponent } from 'components/DatePicker';
import { ReduxState } from 'app/store/modules/@types';
import { checkRole, checkIsAdmin } from '@next/utils/checkOnPermission';
import { getCurrentMomentDate, getFormattedDashDate, dateDotFormat } from '@next/utils/dates';
import { selectUser } from 'app/store/modules/app/selectors';
import { changeDate } from 'app/store/modules/report/actions';
import { selectDate } from 'app/store/modules/report/selectors';
import CONSTANTS from '@next/constants';

const { Option } = Select;

const ACCEPT_FILES = {
  [ReportType.dayMayor]: 'application/pdf',
  [ReportType.dayPrefect]: 'application/pdf',
  [ReportType.week]: 'application/pdf',
  [ReportType.instruction]: 'application/pdf',
  [ReportType.primaryData]: '.xls, .xlsx',
};

const CONTENT_TYPES = {
  [ReportType.dayMayor]: 'application/pdf',
  [ReportType.dayPrefect]: 'application/pdf',
  [ReportType.week]: 'application/pdf',
  [ReportType.instruction]: 'application/pdf',
  [ReportType.primaryData]: 'application/vnd.ms-excel',
};

const ROLE_BUTTONS = {
  [ROLES.ROLE_DASHBORD_MER]: {
    [ReportType.primaryData]: 'Первичные данные',
    // [ReportType.dayMayor]: 'Ежедневный отчет',
    [ReportType.week]: 'Еженедельный отчет',
  },
  [ROLES.ROLE_DASHBORD_PREFEKT]: {
    [ReportType.primaryData]: 'Первичные данные',
    // [ReportType.dayPrefect]: 'Ежедневный отчет',
    [ReportType.week]: 'Еженедельный отчет',
  },
  [ROLES.UNKNOWN]: {},
  // [ROLES.ROLE_ADMIN]: {
  //   [ReportType.primaryData]: "Первичные данные",
  //   [ReportType.dayMayor]: " Ежедневный отчет для мэра",
  //   [ReportType.dayPrefect]: "Ежедневный отчет для префектуры",
  //   [ReportType.week]: "Еженедельный отчет",
  // },
  [ROLES.ROLE_DASHBORD_ADMINISTRATOR]: {
    [ReportType.primaryData]: 'Первичные данные',
    [ReportType.dayMayor]: ' Ежедневный отчет для мэра',
    [ReportType.dayPrefect]: 'Ежедневный отчет для префектуры',
    [ReportType.week]: 'Еженедельный отчет',
  },
};

type getReportButtonProps = {
  type: keyof typeof ReportType;
  name: string;
  reportsStatus: {[key: string]: boolean};
  reportTypes: {name: string; value: keyof typeof ReportType}[];
  onBtnGetReportClick: (type: keyof typeof ReportType) => () => void;
};

const getReportButton = (props: getReportButtonProps) => {
  const {
    type,
    name,
    reportTypes,
    reportsStatus,
    onBtnGetReportClick,
  } = props;

  if ( type === 'primaryData') {
    return (
      <ButtonWrap>
        <PrimaryDataButton
          disabled={!reportTypes.length || !reportsStatus[type]}
          onClick={onBtnGetReportClick(type)}
        >
          {name}
          <Icon type='download' style={{ fontSize: '20px', marginLeft: '20px' }}/>
        </PrimaryDataButton>
      </ButtonWrap>
    );
  } else {
    return (
      <ButtonWrap>
        <ReportButton
          disabled={!reportTypes.length || !reportsStatus[type]}
        >
          {name}
        </ReportButton>

        <DownloadButton
          disabled={!reportTypes.length || !reportsStatus[type]}
          onClick={onBtnGetReportClick(type)}
        >
          <Icon type="download" style={{ fontSize: '20px' }} />
        </DownloadButton>
      </ButtonWrap>
    );
  }
};

type StateProps = {
  date: ReduxState['report']['date'];
  user: ReduxState['app']['user'];
};
type DispatchProps = {
  changeDate: typeof changeDate;
};
type OwnPropsProps = {};
type Props = (
  StateProps
  & DispatchProps
  & OwnPropsProps
);

const ReportContainer: React.FC<Props> = (props) => {
  const { date, changeDate, user } = props;
  const [reportTypes, setReportTypes] = React.useState<{name: string; value: keyof typeof ReportType}[]>([]);
  const [selectedType, setSelectedType] = React.useState<keyof typeof ReportType>(null);
  const [reportsStatus, setReportsStatus] = React.useState({});
  const role = React.useMemo(() => checkRole(user), [user]);
  const isAdmin = React.useMemo(() => checkIsAdmin(user), [user]);

  React.useEffect(() => {
    getReportTypes()
      .then((response) => {
        const types = Object.keys(response.data).map((key: keyof typeof ReportType) => ({
          name: ROLE_BUTTONS[ROLES.ROLE_DASHBORD_ADMINISTRATOR] && ROLE_BUTTONS[ROLES.ROLE_DASHBORD_ADMINISTRATOR][key]
            ? ROLE_BUTTONS[ROLES.ROLE_DASHBORD_ADMINISTRATOR][key] : response.data[key],
          value: key,
        }));
        setSelectedType(types[CONSTANTS.INDEX_OF_ARR.FIRST_INDEX].value);
        setReportTypes(types);
      });
  }, []);

  React.useEffect(() => {
    if (reportTypes?.length) {
      const checkdate = date || getCurrentMomentDate();
      const promiseArray = reportTypes.map((reportType) => ({ name: reportType.value, req: checkReportStatus(getFormattedDashDate(checkdate), reportType.value) }));
      const currentStatus = { ...reportsStatus };
      const array = ([]).concat(promiseArray);
      promiseArray.forEach(async (promise) => {
        try {
          const reponse = await promise.req;
          currentStatus[promise.name] = reponse.data;
        } catch (e) {
          currentStatus[promise.name] = false;
        }
        array.pop();
        if (!array.length) {
          setReportsStatus(currentStatus);
        }
      });
    }
  }, [reportTypes, date]);

  const onDateChange = React.useCallback((value) => {
    changeDate(value);
  }, []);

  const onChangeType = React.useCallback((value) => setSelectedType(value), []);

  const onFileChange = React.useCallback((files) => {
    uploadReportFiles(files, selectedType, getCurrentMomentDate(date ?? undefined), CONTENT_TYPES[selectedType]);
  }, [selectedType, date]);

  const onBtnGetReportClick = React.useCallback((type: string | null) => async () => {
    if (type) {
      try {
        const checkdate = date || getCurrentMomentDate();
        const response = await getReportID(getFormattedDashDate(checkdate), type);
        const downloadLink = document.createElement('a');
        downloadLink.href = `/egip/files/${response.data}`;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } catch (e) {
        notification.error({
          message: 'Файл не найден',
          duration: 0,
        });
      }
    }
  }, [date]);

  const dayMayorReport = React.useMemo(() => (ROLE_BUTTONS[role][ReportType.dayMayor] ? getReportButton({
    type: ReportType.dayMayor,
    name: ROLE_BUTTONS[role][ReportType.dayMayor],
    reportTypes,
    reportsStatus,
    onBtnGetReportClick,
  }) : null), [reportsStatus, reportTypes]);

  const dayPrefectReport = React.useMemo(() => (ROLE_BUTTONS[role][ReportType.dayPrefect] ? getReportButton({
    type: ReportType.dayPrefect,
    name: ROLE_BUTTONS[role][ReportType.dayPrefect],
    reportTypes,
    reportsStatus,
    onBtnGetReportClick,
  }) : null), [reportsStatus, reportTypes]);

  const weekReport = React.useMemo(() => (ROLE_BUTTONS[role][ReportType.week] ? getReportButton({
    type: ReportType.week,
    name: ROLE_BUTTONS[role][ReportType.week],
    reportTypes,
    reportsStatus,
    onBtnGetReportClick,
  }) : null), [reportsStatus, reportTypes]);

  const primaryDataReport = React.useMemo(() => (ROLE_BUTTONS[role][ReportType.primaryData] ? getReportButton({
    type: ReportType.primaryData,
    name: ROLE_BUTTONS[role][ReportType.primaryData],
    reportTypes,
    reportsStatus,
    onBtnGetReportClick,
  }) : null), [reportsStatus, reportTypes]);

  const accept = ACCEPT_FILES[selectedType];

  return (
    <Container>
      <div>
        <DateComponent
          date={date ? date : null}
          dateFormat={dateDotFormat}
          onDateChange={onDateChange}
          onTimeChange={onDateChange}
          notUseNowButton
          showDate
          isDisabled={false}
        />
        <ButonsContainer>
          {isAdmin
            ? (
              <React.Fragment>
                <StyledSelect value={selectedType} onChange={onChangeType} showArrow={true}>
                  {
                    reportTypes?.length && reportTypes.map((reportType) => (
                      <Option key={reportType.value} value={reportType.value}>{reportType.name}</Option>
                    ))
                  }
                </StyledSelect>
                <FilePicker accept={accept} onFileChange={onFileChange}>
                  <StyledButton>Загрузить отчет <Icon type='download' style={{ fontSize: '20px', marginLeft: '20px' }}/></StyledButton>
                </FilePicker>
              </React.Fragment>
            )
            : null}
          { primaryDataReport }
          { dayMayorReport }
          { dayPrefectReport }
          { weekReport }

        </ButonsContainer>
      </div>
    </Container>
  );
};

export default connect<StateProps, DispatchProps, OwnPropsProps, ReduxState>(
  (state) => ({
    date: selectDate(state),
    user: selectUser(state),
  }),
  (dispatch) => ({
    changeDate: bindActionCreators(changeDate, dispatch),
  }),
)(ReportContainer);
