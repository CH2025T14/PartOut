import { Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import './home.css';

const { Search } = Input;

export default function Home(): React.ReactElement {
  const onSearch = (value: string) => {
    console.log(value);

    // add fetch logic
  }

  return (
    <div>
      <div className="logo">
        <h1>PartOut Logo Here..</h1>
      </div>

      <Search
        placeholder="Enter your set number(s)"
        allowClear
        enterButton
        size="large"
        onSearch={onSearch}
        className="searchInput"
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
