import { Input, Image, Empty } from 'antd';
import { UploadOutlined, PlusOutlined, BorderOuterOutlined, CalendarOutlined, UnorderedListOutlined } from '@ant-design/icons';
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
    <div className="homeContainer">
      <div className="logoContainer">
        <BorderOuterOutlined className="mainLogo" /><h1>PartOut</h1>
      </div>

      <Search
        placeholder="Enter your set number"
        allowClear
        enterButton
        size="large"
        onSearch={onSearch}
        className="searchInput"
        style={{ width: '70%', maxWidth: '600px', margin: '0 auto' }}
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
              <button className="addSetBtn"><PlusOutlined className="addBtnIcon"/></button>
            </Link>
            <Image
              src={setData.setImgUrl}
              alt={setData.name}
              preview={false}
              style={{ objectFit: 'contain', maxHeight: '120px' }}
            />
            <div className="setDataMeta">
              <h2>{setData.name}</h2>
              <div className="setDataDetails">
                <p><CalendarOutlined /> Released: {setData.year}</p>
                <p><UnorderedListOutlined /> {setData.numParts} parts</p>
              </div>
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
