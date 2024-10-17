
import { FaFileImport, FaFileExport } from 'react-icons/fa';

interface FileUploadButtonsProps {
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileExport: () => void;
}

const FileUploadButtons: React.FC<FileUploadButtonsProps> = ({ handleFileUpload, handleFileExport }) => (
  <div className="flex items-center space-x-5">
    <FaFileImport
      className="text-4xl cursor-pointer"
      onClick={() => document.getElementById('csvInput')?.click()}
    />
    <input
      type="file"
      id="csvInput"
      accept=".csv,.xlsx,.xls"
      onChange={handleFileUpload}
      className="hidden"
    />
    <FaFileExport
      className="text-4xl cursor-pointer"
      onClick={handleFileExport}
    />
  </div>
);

export default FileUploadButtons;
