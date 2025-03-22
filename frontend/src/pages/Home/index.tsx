import { Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import './home.css';

const { Search } = Input;

export default function Home(): React.ReactElement {

  return (
    <div>
      <h1>PartOut Logo Here..</h1>
      <Search
        placeholder="Enter your set number(s)"
        allowClear
        enterButton
        size="large"
      />
      <p className="dividerText">Or</p>
      <div>
        {/* <Link to="/msclassify"> */}
          <button className="openBtn">
            Open <UploadOutlined />
          </button>
        {/* </Link> */}
      </div>
    </div>
  );
}
