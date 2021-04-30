import * as React from 'react';
import {  Modal, Upload } from 'antd';
 
export default class PallWrop extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
  };
 
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };
  render() {
    const { fileList, imgNumber,onChange } = this.props;
    const list = fileList||[]
    const { previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="http://localhost:5000/up_photo"
          listType="picture-card"
          fileList={list}
          onChange={onChange}
          onPreview={this.handlePreview}
        >
          {list.length >= imgNumber ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}