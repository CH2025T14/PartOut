import { Input, Image, Empty } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, Outlet } from "react-router";
import React from 'react';
import { getSetData, Set } from '../../services/fetchSetData';
// import { getPartData } from '../../services/fetchPartData';
import './home.css';

const { Search } = Input;

export default function Home(): React.ReactElement {
  const [setData, setSetData] = React.useState<Set | null>(null);


  const onSearch = async (value: string) => {
    if (!value || isNaN(parseInt(value))) {
      return;
    }
    setSetData(null);
    const setData = await getSetData(parseInt(value));
    if (!setData) {
      return;
    }
    setSetData(setData);
    // const partData = await getPartData(parseInt(value));
    // console.log("Part Data:");
    // console.log(partData);
  }

  return (
    <div>
      <div className="logo">
        <h1>PartOut Logo Here..</h1>
      </div>

      <Search
        placeholder="Enter your set number"
        allowClear
        enterButton
        size="large"
        onSearch={onSearch}
        className="searchInput"
      />
      <p className="dividerText">Or</p>
      <div>
        <button className="openBtn">
          Open <UploadOutlined />
        </button>
      </div>
      <div className="setDataContainer">
        {setData && (
          <div className="setDataThumbnail">
            <Link to="/set_page">
              <button className="addSetBtn"><PlusOutlined /></button>
            </Link>
            <Image
              width={200}
              src={setData.setImgUrl}
              alt={setData.name}
            />
            <div className="setDataMeta">
              <h2>{setData.name}</h2>
              <p>Released: {setData.year}</p>
              <p>{setData.numParts} parts</p>
            </div>
          </div>
        )}
      </div>
      <hr />
      <div className="projectContainer">
        <Empty />
      </div>
      <Outlet />
    </div>
  );
}
