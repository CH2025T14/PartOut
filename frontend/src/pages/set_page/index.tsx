import { Tabs } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { useState, useEffect, use } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
import PartBox from '../partBox/index';
import { getPartData } from '../../services/fetchPartData';
import { getSetData } from '../../services/fetchSetData';
import { Part, Set } from '../../types/types';


export default function SetPage() {
  const [key, setKey] = useState('1');
  const [partData, setPartData] = useState<Part[]>([]);
  const [setData, setSetData] = useState<Set | null>(null);

  const [numCompletedParts, setNumCompletedParts] = useState<number>(0);

  const onChange = (newKey: string) => {
    console.log(newKey);
    setKey(newKey);
  };

  const [urlData, setUrlData] = useState<{url: string, partsCount: number[]} | null>(null);

  
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
    let urlData = {
      url: '',
      partsCount: new Array(numParts).fill(0),
    };
    setUrlData(urlData);
  }

  function generateURL(urlData: {url: string, partsCount: number[]}) {
    let url = urlData.url;
    for (let i = 0; i < urlData.partsCount.length; i++) {
      url = url + urlData.partsCount[i] + '-';
    }
    url = url.slice(0, -1);
    return url;
  }

  function applyUrlDataObject(partCountData: string){
    const partsCount_data = partCountData.split('-').map(Number);
    console.log(partsCount_data);

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
              urlData.partsCount[partIndex] = newCurrQty;
              return { ...p, currQty: newCurrQty };
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
              urlData.partsCount[partIndex] = newCurrQty;
            }

            console.log(partIndex, "and", newCurrQty);
            return { ...p, currQty: newCurrQty };
          }
          return p;
        });
      });

      setNumCompletedParts(prev => prev - 1);
    }
  }


  useEffect(() => {
    const fetchPartData = async () => {
      console.log('fetching part data');
      const partData = await getPartData(setNumber);
      setPartData(partData);
      const setData = await getSetData(setNumber);
      if (setData) {
        setSetData(setData);
      }
      if (!partCountData){
        generateUrlDataObject(partData.length);
      }
      else{
        console.log('retrieving url data');
        applyUrlDataObject(partCountData);
      }
    };
    fetchPartData();
  }, []);

  useEffect(() => {
    if (urlData?.partsCount) {
      console.log('urlData changed, applying to currentQty');
      console.log(urlData.partsCount);
      applyURLdata2CurrentQty();
      
    }
  }, [urlData]);



  return (
    <div className='set-page-container'>
      {!setData ? (
        <p>Retrieving set data...</p>
      ) : (
        <>
          <div className='set-page-set-info'>
            <h1>{setData?.name}</h1>
            <img src={setData?.setImgUrl} alt="set" />
            <p>Number of parts: {setData?.numParts}</p>
            <p>Number of completed parts: {numCompletedParts}</p>
            <p>Percentage of completion: {Math.round((numCompletedParts / setData?.numParts) * 100)}%</p>
            <button onClick={() => {
              console.log(generateURL(urlData));
            }}>Generate URL<LinkOutlined /></button>
          </div>

          <div className='set-page-tabs'>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </div>

          {key === '1' && <div className='set-page-parts-list'>
            {partData.map((part: Part) => (
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
            {partData.map((part: Part) => (
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
    </div>
  );
}


