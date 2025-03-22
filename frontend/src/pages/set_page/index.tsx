import { Tabs } from 'antd';
import { useState, useEffect } from 'react';
import './index.css';
import PartBox from '../partBox/index';
import { getPartData } from '../../services/fetchPartData';
import { getSetData } from '../../services/fetchSetData';

interface Part {
  partName: string;
  partId: string;
  targetQty: number;
  currQty: number;
  imgUrl: string;
}


interface Set {
  name: string;
  year: number;
  numParts: number;
  setImgUrl: string;
}

const set_ID = 6666;

export default function SetPage() {
  const [key, setKey] = useState('1');
  const [partData, setPartData] = useState<Part[]>([]);
  const [setData, setSetData] = useState<Set | null>(null);

  const onChange = (newKey: string) => {
    console.log(newKey);
    setKey(newKey);
  };

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


  function addCurrentPart(part: Part) {
    if (part.currQty < part.targetQty) {
        setPartData(partData.map(p => 
            p.partId === part.partId ? { ...p, currQty: p.currQty + 1 } : p
        ));
    }
}

function removeCurrentPart(part: Part) {
    if (part.currQty > 0) {
        setPartData(partData.map(p => 
            p.partId === part.partId ? { ...p, currQty: p.currQty - 1 } : p
        ));
    }
}


  useEffect(() => {
    const fetchPartData = async () => {
      console.log('fetching part data');
      const partData = await getPartData(set_ID);
      setPartData(partData);
      const setData = await getSetData(set_ID);
      if (setData) {
        setSetData(setData);
      }


    };
    fetchPartData();
  }, []);



  return (
    <div className='set-page-container'>
      

      <div className='set-page-set-info'>
        <h1>{setData?.name}</h1>
        <img src={setData?.setImgUrl} alt="set" />
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



    </div>
  );
}


