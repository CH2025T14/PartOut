import { Popover, Tabs, Spin, Tag, FloatButton, Select } from 'antd';
import { ShareAltOutlined, ProductFilled, UnorderedListOutlined, CalendarOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
import PartBox from '../partBox/index';
import { getPartData } from '../../services/fetchPartData';
import { getSetData } from '../../services/fetchSetData';
import type { Part, Set } from '../../types/types';
import { useNavigate } from 'react-router-dom';




export default function SetPage() {
  const navigate = useNavigate();
  const [key, setKey] = useState('1');
  const [partData, setPartData] = useState<Part[]>([]);
  const [setData, setSetData] = useState<Set | null>(null);
  const [filterColor, setFilterColor] = useState<string | null>(null);

  const [numCompletedParts, setNumCompletedParts] = useState<number>(0);

  const [firstRender, setFirstRender] = useState<boolean>(true);

  const onChange = (newKey: string) => {
    console.log(newKey);
    setKey(newKey);
  };

  const [urlData, setUrlData] = useState<{url: string | null | undefined, partsCount: number[]} | null>(null);

  const { setNumber } = useParams<{ setNumber: string }>();
  const { partCountData } = useParams<{ partCountData: string | undefined}>();

const items = [
  {
    key: '1',
      label: 'parts list',
  },
  {
    key: '2',
      label: 'completed parts',
    },
  ];

  function generateUrlDataObject(numParts: number) {
    const urlData = {
      url: '',
      partsCount: new Array(numParts).fill(0),
    };
    setUrlData(urlData);
  }

  function generateURL(urlData: {url: string | null | undefined, partsCount: number[]} | null) {
    if (!urlData) return '';
    let url = urlData.url || '';
    for (let i = 0; i < urlData.partsCount.length; i++) {
      url = url + urlData.partsCount[i] + '-';
    }
    url = url.slice(0, -1);
    return url;
  }

  function applyUrlDataObject(partCountData: string){
    const partsCount_data = partCountData.split('-').map(Number);


    setUrlData(prev => {
      return {
        ...prev,
        url: '',
        partsCount: partsCount_data,
      };
    });
  }


  function applyURLdata2CurrentQty(){
    setPartData(prevPartData => {
      return prevPartData.map((part, index) => {
        return { ...part, currQty: urlData?.partsCount[index] || 0 };
      });
    });
  }

  function updateLocalStorage(){
    const setList = JSON.parse(localStorage.getItem('setList') || '[]');
    const setIndex = setList.findIndex((set: Set) => set.number === Number(setNumber));
    if (setIndex !== -1) {
      setList[setIndex].partUrl = generateURL(urlData);
      localStorage.setItem('setList', JSON.stringify(setList));
      console.log('updated local storage');
      console.log(setList[setIndex].partUrl);
    }
    else{
      setList.push({
        number: Number(setNumber),
        partUrl: generateURL(urlData),
        partsCount: urlData?.partsCount || [],
        setImgUrl: setData?.setImgUrl,
        name: setData?.name,
        year: setData?.year,
        numParts: setData?.numParts,
      });
      localStorage.setItem('setList', JSON.stringify(setList));
    }
  }

  // TODO: try to understand how it works
  function addCurrentPart(part: Part) {
    if (part.currQty < part.targetQty) {
      const partId = part.partId;
      const partIndex = part.partIndex;

      setPartData(prevPartData => {
        return prevPartData.map(p => {
          if (p.partId === partId && p.currQty < p.targetQty) {
            const newCurrQty = p.currQty + 1;

            if (urlData && urlData.partsCount) {
              setUrlData(prev => {
                if (!prev) return prev;
                const newPartsCount = [...prev.partsCount];
                newPartsCount[partIndex] = newCurrQty;
                return {
                  url: prev.url,
                  partsCount: newPartsCount
                };
              });
            }

          }
          return p;
        });
      });

      setNumCompletedParts(prev => prev + 1);

    }
  }


  // TODO: try to understand how it works

  function removeCurrentPart(part: Part) {
    if (part.currQty > 0) {
      const partId = part.partId;
      const partIndex = part.partIndex;

      setPartData(prevPartData => {
        return prevPartData.map(p => {
          if (p.partId === partId && p.currQty > 0) {
            const newCurrQty = p.currQty - 1;
            if (urlData && urlData.partsCount) {
              setUrlData(prev => {
                if (!prev) return prev;
                const newPartsCount = [...prev.partsCount];
                newPartsCount[partIndex] = newCurrQty;
                return {
                  ...prev,
                  partsCount: newPartsCount
                };
              });
            }

            return { ...p, currQty: newCurrQty };
          }
          return p;
        });
      });

      setNumCompletedParts(prev => prev - 1);
    }
  }

  function update_NumCompletedParts(num: number){
    setNumCompletedParts(prev => prev + num);
  }

  const handleFilterChange = (value: string | null) => {
    setFilterColor(value);
  };

  const filteredPartData = partData.filter(part => {
    if (!filterColor) return true;
    return part.colorName === filterColor;
  });

  const colorMap = new Map(
    partData.map(part => [part.colorName, part.colorRgb])
  );

  const totalPartCount = partData.reduce((acc, curr) => acc + curr.targetQty, 0);

  useEffect(() => {
    const fetchPartData = async () => {
      if (!setNumber) return;
      const partData = await getPartData(Number(setNumber));
      setPartData(partData);
      const setData = await getSetData(Number(setNumber));
      if (setData) {
        setSetData(setData);
      }
      if (!partCountData){
        generateUrlDataObject(partData.length);
      }
      else{
        applyUrlDataObject(partCountData);
      }
    };
    fetchPartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (urlData?.partsCount) {
      applyURLdata2CurrentQty();
      if (firstRender){
        update_NumCompletedParts(urlData.partsCount.reduce((acc, curr) => acc + curr, 0));

        setFirstRender(false);
      }
      updateLocalStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlData]);

  function getBaseUrl() {
    const protocol = window.location.protocol;
    const host = window.location.host; // includes port if present
    return `${protocol}//${host}`;
  }

  const baseUrl = getBaseUrl();


  const handleCopy = () => {
    navigator.clipboard.writeText(baseUrl + '/set_page/' + setData?.number + '/' + generateURL(urlData));
    alert('URL copied to clipboard');
  };

  return (
    <div className='set-page-container'>
      {!setData ? (
        <div className='set-page-loading'>
          <p>Retrieving set data...</p>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className='set-page-set-info'>
            <div className="headerLogoContainer" >
              <ProductFilled className="headerLogo" onClick={() => {navigate('/');}}/><h1 onClick={() => {navigate('/');}}>PartOut</h1>
            </div>
            <Popover content="Click to generate & copy the URL">
              <ShareAltOutlined
                className='set-page-share-icon'
                onClick={() => {
                  handleCopy();
                }}
              />
            </Popover>
          </div>
          <div style={{ width: '100%', backgroundColor: '#efefef', height: '1rem' }}>
            <div
              style={{
                width: `${(setData?.numParts > 0 ? (numCompletedParts / setData?.numParts) * 100 : 0)}%`,
                backgroundColor: '#52c597',
                height: '100%',
                transition: 'width 0.3s ease-in-out'
              }}
              role="progressbar"
              aria-valuenow={numCompletedParts}
              aria-valuemin={0}
              aria-valuemax={setData?.numParts}
            ></div>
          </div>

          <div className='set-container'>
            <a href='#' target="_blank" rel="noopener noreferrer">
              <img src={setData?.setImgUrl} alt="set" />
            </a>
            <p className='setTitle'>{setData?.name}</p>
            <div className='setMetadata'>
              <Tag bordered={false} icon={<UnorderedListOutlined />}>{setData?.numParts} parts</Tag>
              <Tag bordered={false} icon={<CalendarOutlined />}>{setData?.year}</Tag>
            </div>
            <div className='set-page-percentage-details'>
              <p>{numCompletedParts} out of {totalPartCount} parts / {Math.round((numCompletedParts / totalPartCount) * 100)}% completed</p>
            </div>
          </div>

          <div className='set-page-tabs'>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </div>

          <div className='set-page-filter'>
            <Select
              allowClear
              placeholder="Filter by color"
              onChange={handleFilterChange}
            >
              {/* TODO: Apply rgb color */}
              {Array.from(colorMap.entries()).map(([name]) => {
                return (
                  <Select.Option key={name} value={name}>
                    <span>
                      {name}
                    </span>
                  </Select.Option>
                );
              })}
            </Select>
          </div>

          {key === '1' && <div className='set-page-parts-list'>
            {filteredPartData.map((part: Part) => (
              part.currQty < part.targetQty && (
                <PartBox
                  key={part.partId}
                  part={part}
                  currQty={part.currQty}
                  addCurrentPart={addCurrentPart}
                  removeCurrentPart={removeCurrentPart}
                />
              )
            ))}
          </div>}

          {key === '2' && <div className='set-page-parts-list'>
            {filteredPartData.map((part: Part) => (
              part.currQty === part.targetQty && (
                <PartBox
                  key={part.partId}
                  part={part}
                  currQty={part.currQty}
                  addCurrentPart={addCurrentPart}
                  removeCurrentPart={removeCurrentPart}
                />
              )
            ))}
          </div>}
        </>
      )}
      <FloatButton.BackTop />
    </div>
  );
}
