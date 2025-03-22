import { Tabs } from 'antd';
import { useState } from 'react';
import './index.css';




export default function SetPage() {
  const [key, setKey] = useState('1');

  const onChange = (newKey: string) => {
    console.log(newKey);
    setKey(newKey);
  };

  const items = [
    {
      key: '1',
      label: 'parts list',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'completed parts',
      children: 'Content of Tab Pane 2',
    },
  ];

  const hard_coded_parts = 
    [
      {
        partId: '3035',
        targetQty: 1,
        currQty: 0,
        imgUrl: 'https://cdn.rebrickable.com/media/parts/elements/303526.jpg',
        partName: 'Plate 1x1'
      },
      {
        partId: '92842',
        targetQty: 1,
        currQty: 0,
        imgUrl: 'https://cdn.rebrickable.com/media/parts/elements/4599984.jpg',
        partName: 'Plate 1x2'
      },
    ];

  return (
    <div className='set-page-container'>
      <div className='set-page-tabs'>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>



      {key === '1' && <div className='set-page-parts-list'>
        {hard_coded_parts.map((part) => (
          <div key={part.partId}>{part.partName}</div>
        ))}
      </div>}

      {key === '2' && <div className='set-page-completed-parts-list'>
        {hard_coded_parts.map((part) => (
          <div key={part.partId}>{part.partName}</div>
        ))}
      </div>}



    </div>
  );
}


