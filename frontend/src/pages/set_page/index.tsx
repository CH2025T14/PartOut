import { Tabs } from 'antd';
import { useState, useEffect } from 'react';
import './index.css';
import PartBox from '../partBox/index';
import { getParts } from '../../services/fetchPartData';

interface Part {
  partName: string;
  partId: string;
  targetQty: number;
  currQty: number;
  imgUrl: string;
}

const set_ID = 6666;

export default function SetPage() {
  const [key, setKey] = useState('1');
  const [partData, setPartData] = useState<Part[]>([]);

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



  useEffect(() => {
    const fetchPartData = async () => {
      console.log('fetching part data');
      const partData = await getParts(set_ID);
      setPartData(partData);
      console.log(partData.length);
    };
    fetchPartData();
  }, []);



  return (
    <div className='set-page-container'>
      <div className='set-page-tabs'>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>


      
        {key === '1' && <div className='set-page-parts-list'>
          {partData.map((part: Part) => (
            <PartBox key={part.partId} part={part} />
          ))}
        </div>}
      

      
      {key === '2' && <div className='set-page-completed-parts-list'>
        {partData.map((part: Part) => (
          <PartBox key={part.partId} part={part} />
        ))}
      </div>}



    </div>
  );
}


