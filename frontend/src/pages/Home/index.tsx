import { Input, Image, Empty, message, Tooltip } from 'antd';
import { UploadOutlined, PlusOutlined, BorderOuterOutlined, CalendarOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Link, Outlet } from "react-router";
import React from 'react';
import { getSetData } from '../../services/fetchSetData';
import { Set } from '../../types/types';
// import { getPartData } from '../../services/fetchPartData';
import './home.css';

const { Search } = Input;

export default function Home(): React.ReactElement {
  const [setData, setSetData] = React.useState<Set | null>(null);
  const [setList, setSetList] = React.useState<Set[]>([]);
  const [messageApi, contextHolder] = message.useMessage();


  const onSearch = async (value: string) => {
    if (!value || isNaN(parseInt(value))) {
      // Show a toast message
      messageApi.open({
        type: 'error',
        content: 'Invalid set number',
        duration: 2,
      });

      return;
    }
    setSetData(null);
    const setData = await getSetData(parseInt(value));

    // Check if setData is null
    if (!setData) {
      // Show a toast message
      messageApi.open({
        type: 'error',
        content: 'Set not found',
        duration: 2,
      });
      return;
    }
    setSetData(setData);
    // const partData = await getPartData(parseInt(value));
    // console.log("Part Data:");
    // console.log(partData);
  }

  // Add the set to the set list
  const onAddSet = async () => {
    // Check if setData is null
    if (!setData) {
      // Show a toast message
      messageApi.open({
        type: 'error',
        content: 'No set data to add',
        duration: 2,
      });
      return;
    }


    // Create a new set object
    const newSet = {
      name: setData.name,
      year: setData.year,
      numParts: setData.numParts,
      setImgUrl: setData.setImgUrl,
    };

    // Check if the set already exists in the set list
    const existingSet = setList.find(set => set.name === newSet.name);
    if (existingSet) {
      // Show a toast message
      messageApi.open({
        type: 'warning',
        content: 'Set already exists in the list',
        duration: 2,
      });
      return;
    }

    // Update the set list in state
    setSetList((prevSetList) => {
      const newSetList = [...prevSetList, newSet];
      localStorage.setItem('setList', JSON.stringify(newSetList));
      return newSetList;
    });

    // Clear the set data after adding
    setSetData(null);
  }

  return (
    <div className="homeContainer">
      {contextHolder}
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
            <Tooltip color={"#a0a0a0"} title="Add to project">
              <button
                className="addSetBtn"
                onClick={onAddSet}
              >
                <PlusOutlined className="addBtnIcon"/>
              </button>
            </Tooltip>
            <Image
              src={setData.setImgUrl}
              alt={setData.name}
              preview={false}
              style={{ objectFit: 'cover', maxHeight: '120px' }}
            />
            <div className="setDataMeta">
              <h2>{setData.name}</h2>
              <div className="setDataDetails">
                <p><div className="metaDataIconChip"><CalendarOutlined /></div> Released: {setData.year}</p>
                <p><div className="metaDataIconChip"><UnorderedListOutlined /></div> {setData.numParts} parts</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <hr />
      <div className="projectContainer">
        { setList.length > 0 ? (
          <div className="projectList">
            {setList.map((set, index) => (
              <Link to="/set_page">
                <div key={index} className="projectItem">
                  <Image
                    src={set.setImgUrl}
                    alt={set.name}
                    preview={false}
                    style={{ objectFit: 'cover', maxHeight: '120px' }}
                  />
                  <div className="projectMeta">
                    <h2>{set.name}</h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <Empty description="No sets added yet" />
        )}
      </div>
      <Outlet />
    </div>
  );
}
