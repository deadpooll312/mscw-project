import CONSTANTS from '@next/constants';

export function saveData(blob: Blob, fileName?: string) {
  if (blob === null || fileName === null) {
    return;
  }
  if (navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(blob, fileName || 'Отчет.xls');
  } else {
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName || 'Отчет.xls';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => window.URL.revokeObjectURL(url), CONSTANTS.TIME.ONE_SECOND_IN_MS);
  }
}
