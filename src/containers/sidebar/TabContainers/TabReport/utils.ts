import { FileData } from 'containers/sidebar/TabContainers/TabReport/types';
import { MomentInput } from 'moment';
import { notification } from 'antd';
import { ReportType, uploadFileReport, addReport } from 'app/api/reports';
import { ROLES, REPORT_PERMISSIONS } from 'app/permissions/constants';
import { getFormattedDashDate } from '@next/utils/dates';

export const isLocalUploadFile = (file: FileData): file is FileData => 'actionStatus' in file;

export const uploadReportFiles = async (
  files: FileData[],
  type: string,
  date: MomentInput,
  contentType: string
) => {
  const newFiles = [] as FileData[];

  files.forEach((file) => {
    if (isLocalUploadFile(file)) {
      newFiles.push(file);
    }
  });

  if (newFiles.length > 0) {
    const formData = new FormData();
    formData.append('file', newFiles[0].fileBlob);
    formData.append('name', newFiles[0].name);
    formData.append('contentType', contentType);
    try {
      const result = await uploadFileReport(formData);

      const response = await addReport({
        date: getFormattedDashDate(date),
        data: result.data,
        type,
        name: newFiles[0].name,
      });
      if (response.code && response.code === 'ERROR') {
        notification.error({
          message: `Ошибка загрузки отчета. ${response.synopsis}`,
          duration: 0,
        });
      } else {
        notification.success({
          message: 'Отчет успешно загружен',
          duration: 10,
        });
      }
    } catch (e) {
      notification.error({
        message: 'Ошибка загрузки отчета',
        duration: 0,
      });
    }
  }
};

export const getReportPermissions = (role: keyof typeof ROLES): ReportType[] => REPORT_PERMISSIONS[role];

export const checkReportButton = (component: React.ReactNode, type: ReportType, isAdmin?: boolean, permissions?: ReportType[]): React.ReactNode => {
  if (isAdmin) {
    return component;
  }
  return permissions.includes(type) ? component : null;
};
