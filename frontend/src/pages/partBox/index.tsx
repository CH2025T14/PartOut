import { useState, useEffect } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Part } from '../../types/types';
import './index.css';
import { Popover } from 'antd';

interface PartBoxProps {
  part: Part;
  addCurrentPart: (part: Part) => void;
  removeCurrentPart: (part: Part) => void;
  currQty: number;
}

export default function PartBox({ part, addCurrentPart, removeCurrentPart, currQty }: PartBoxProps) {
  const [currentPart, setCurrentPart] = useState(part);
  const [currentQty, setCurrentQty] = useState(currQty);

  useEffect(() => {
    setCurrentQty(currQty);
  }, [currQty]);

  function removeCurrentPartAndUpdate(part: Part) {
    removeCurrentPart(part);
    if (currentQty > 0) {
      setCurrentQty(currentQty - 1);
      part.currQty = currentQty - 1;
    }
  }

  function addCurrentPartAndUpdate(part: Part) {
    addCurrentPart(part);
    if (currentQty < part.targetQty) {
      setCurrentQty(currentQty + 1);
      part.currQty = currentQty + 1;
    }
  }


  return (
    <div className='part-box'>
      <Popover content={currentPart.partName} trigger="hover">
        <img src={currentPart.imgUrl} alt={currentPart.partName} />
      </Popover>
      <div>
        <p>{currentQty} out of {currentPart.targetQty}</p>
        <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '4px', height: '10px' }}>
          <div
            style={{
              width: `${(currentPart.targetQty > 0 ? (currentQty / currentPart.targetQty) * 100 : 0)}%`,
              backgroundColor: '#52c597',
              height: '100%',
              borderRadius: '4px',
              transition: 'width 0.3s ease-in-out'
            }}
            role="progressbar"
            aria-valuenow={currentQty}
            aria-valuemin={0}
            aria-valuemax={currentPart.targetQty}
          ></div>
        </div>
      </div>
      <div className='part-box-button-container'>
        <button className="minusBtn" onClick={() => removeCurrentPartAndUpdate(currentPart)}><MinusOutlined /></button>
        <button className="plusBtn" onClick={() => addCurrentPartAndUpdate(currentPart)}><PlusOutlined /></button>
      </div>
    </div>
  );
}


