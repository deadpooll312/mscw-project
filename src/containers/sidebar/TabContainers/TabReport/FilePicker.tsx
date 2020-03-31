import * as React from 'react';
import { FilePickerProps, FileData } from 'containers/sidebar/TabContainers/TabReport/types';

export const initUploadFile = (file: File): FileData => ({
  id: '1',
  name: file.name,
  fileBlob: file,
  actionStatus: 'save',
});

const FilePickerComponent: React.FC<FilePickerProps> = ({ accept, multiple, onFileChange, children }) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const nativeFiles = Array.from(event.target.files || []);

    onFileChange(nativeFiles.map((file) => initUploadFile(file)));
  }, [onFileChange]);

  const handlePickerClick = React.useCallback(() => {
    if (inputRef.current && inputRef.current) {
      inputRef.current.click();
      inputRef.current.value = '';
    }
  }, [inputRef]);
  return (
    <span role="presentation" onClick={handlePickerClick}>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        style={{ display: 'none' }}
        ref={inputRef}
      />
      {children}
    </span>
  );
};

export const FilePicker = React.memo(FilePickerComponent);
