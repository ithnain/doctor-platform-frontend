import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

const UploadCSVfile = ({setFile, t}) => (
    <Upload
        beforeUpload={(file) => setFile(file)}
        accept
    >
        <Button style={{ margin: 10 }} icon={<UploadOutlined />}>{t("Upload CSV File")}</Button>
    </Upload>
);
  export default UploadCSVfile;