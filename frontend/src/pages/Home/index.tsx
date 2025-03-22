import { Input, Image, Empty, message, Popover } from 'antd';
import {
  PlusOutlined,
  ProductFilled,
  CalendarOutlined,
  UnorderedListOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import { Link, Outlet } from "react-router";
import React, { useEffect } from 'react';
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
    if (!value || value.trim() === '') {
      setSetData(null);
      return;
    }
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
      number: setData.number,
      name: setData.name,
      year: setData.year,
      numParts: setData.numParts,
      setImgUrl: setData.setImgUrl,
      partUrl: "0",
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

  const initializeSetList = () => {
    let storedSetList = localStorage.getItem('setList');
    if (!storedSetList) {
      localStorage.setItem('setList', JSON.stringify([]));
      storedSetList = '[]';
    }
    const parsedSetList = JSON.parse(storedSetList);
    setSetList(parsedSetList);
  }


  // Initialize the set list when the component mounts
  useEffect(() => {
    initializeSetList();
  }, []);


  // Content for the popover
  const addProjectContent = (
    <div>
      <p>Click to add this set to your project.</p>
    </div>
  );

  const editProjectContent = (
    <div>
      <p>Click to edit this project.</p>
    </div>
  );
  const deleteProjectContent = (
    <div>
      <p>Click to delete this project.</p>
    </div>
  );


  return (
    <div className="homeContainer">
      {contextHolder}
      <div className="logoContainer">
        <ProductFilled className="mainLogo" /><h1>PartOut</h1>
      </div>

      <Search
        placeholder="Enter your set number"
        allowClear
        enterButton
        size="large"
        onSearch={onSearch}
        onChange={
          () => {
            setSetData(null);
          }
        }
        onClear={
          () => {
            setSetData(null);
          }
        }
        className="searchInput"
        style={{ width: '70%', maxWidth: '600px', margin: '0 auto' }}
      />
      <div className="setDataContainer">
        {setData && (
          <div className="setDataThumbnail">
            <Popover content={addProjectContent} title="Add to Project">
              <button
                className="addSetBtn"
                onClick={onAddSet}
              >
                <PlusOutlined className="addBtnIcon"/>
              </button>
            </Popover>
            <Image
              src={setData.setImgUrl}
              alt={setData.name}
              preview={false}
              style={{ objectFit: 'cover', maxHeight: '120px' }}
            />
            <div className="setDataMeta">
              <h2>{setData.name}</h2>
              <div className="setDataDetails">
                <div><span className="metaDataIconChip"><CalendarOutlined style={{ fontSize: '0.8rem' }} /></span> Released: {setData.year}</div>
                <div><span className="metaDataIconChip"><UnorderedListOutlined style={{ fontSize: '0.8rem' }} /></span> {setData.numParts} parts</div>
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
              <div key={index} className="projectItem">
                  <Popover content={editProjectContent} title="Edit Project">
                    <Link to={`/set_page/${set.number}/${set.partUrl}`}>
                      <EditOutlined
                        className="optionBtn editBtn"
                      />
                    </Link>
                  </Popover>
                  <div className="projectMeta">
                    <div className="projectThumbnail">
                      <Image
                        src={set.setImgUrl}
                        alt={set.name}
                        preview={false}
                        style={{ objectFit: 'cover', maxHeight: '120px' }}
                      />
                    </div>
                    <div className="projectMeta">
                      <h2>{set.name}</h2>
                    </div>
                  </div>
                  <Popover content={deleteProjectContent} title="Delete Project">
                    <DeleteOutlined
                      className="optionBtn deleteBtn"
                      onClick={() => {
                        setSetList((prevSetList) => {
                          const newSetList = prevSetList.filter((_, i) => i !== index);
                          localStorage.setItem('setList', JSON.stringify(newSetList));
                          return newSetList;
                        });
                      }}
                    />
                  </Popover>
                </div>
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
