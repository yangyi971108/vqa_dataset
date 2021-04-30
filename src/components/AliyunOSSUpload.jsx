import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import CryptoJS from 'crypto-js';
import Base64 from 'base-64';
import moment from 'moment';



const accesskey = 'pmmqA7zmPcmj89KEqG0FeuKlIMyHFd'
  const policyText = {
    "expiration": "2021-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    "conditions": [
    ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
    ]
};
const policyBase64 = Base64.encode(JSON.stringify(policyText))

const bytes = CryptoJS.HmacSHA1(policyBase64, accesskey, { asBytes: true });
const signature = bytes.toString(CryptoJS.enc.Base64); 

class AliyunOSSUpload extends React.Component {
  state = {
    OSSData: {},
  };

  async componentDidMount() {
    await this.init();
  }

  init = async () => {
    try {
      const OSSData = await this.mockGetOSSData();

      this.setState({
        OSSData,
      });
    } catch (error) {
      message.error(error);
    }
  };
  
  // Mock get OSS api
  // https://help.aliyun.com/document_detail/31988.html
  mockGetOSSData = () => {
    return {
      dir: '',
      host: 'http://diagrams.oss-cn-beijing.aliyuncs.com',
      accessId: 'LTAI4GJaGvhJa8TCjU39NuXq',
      policy: policyBase64,
      signature: signature,
    };
  };

  onChange = ({ fileList }) => {
    const { onChange } = this.props;
    console.log('Aliyun OSS:', fileList);
    if (onChange) {
      onChange([...fileList]);
    }
  };

  onRemove = file => {
    const { value, onChange } = this.props;

    const files = value.filter(v => v.url !== file.url);

    if (onChange) {
      onChange(files);
    }
  };

  transformFile = file => {
    const { OSSData } = this.state;

    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file.url = OSSData.dir + filename;

    return file;
  };

  getExtraData = file => {
    const { OSSData } = this.state;

    return {
      key: file.url,
      OSSAccessKeyId: OSSData.accessId,
      policy: OSSData.policy,
      Signature: OSSData.signature,
    };
  };

  beforeUpload = async () => {
    const { OSSData } = this.state;
    const expire = OSSData.expire * 1000;

    if (expire < Date.now()) {
      await this.init();
    }
    return true;
  };

  render() {
    const { value } = this.props;
    const props = {
      name: 'file',
      fileList: value,
      action: this.state.OSSData.host,
      onChange: this.onChange,
      onRemove: this.onRemove,
      transformFile: this.transformFile,
      data: this.getExtraData,
      beforeUpload: this.beforeUpload,
    };
    return (
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    );
  }
}

export default AliyunOSSUpload;

