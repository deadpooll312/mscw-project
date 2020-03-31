export type ReportContainerState = {
  selectedType: string;
};

export type FileData = {
  id: string;
  name: string;
  fileBlob: File;
  actionStatus: 'delete' | 'save' | 'uploaded';
};

export type FilePickerProps = {
  accept?: string;
  multiple?: boolean;
  // Size in bytes
  onFileChange: (files: FileData[]) => void;
  children: any;
};
