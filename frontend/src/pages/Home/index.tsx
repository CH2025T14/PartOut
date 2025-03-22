import { Input, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
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
    console.log("Set Data:");
    // const partData = await getPartData(parseInt(value));
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
        {/* <Link to="/msclassify"> */}
          <button className="openBtn">
            Open <UploadOutlined />
          </button>
        {/* </Link> */}
      </div>
      <div>
        {setData && (
          <div className="setDataThumbnail">
            <button className="addSetBtn">+</button>
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
    </div>
  );
}
