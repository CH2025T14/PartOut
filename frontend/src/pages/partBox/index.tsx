import { useState } from 'react';
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

  function removeCurrentPartAndUpdate(part: Part) {
    removeCurrentPart(part);
    if (currentQty > 0) {
      setCurrentQty(currentQty - 1);
    }
  }

  function addCurrentPartAndUpdate(part: Part) {
    addCurrentPart(part);
    if (currentQty < part.targetQty) {
      setCurrentQty(currentQty + 1);
    }
  }


  return (
    <div className='part-box'>
      <Popover content={currentPart.partName} trigger="hover">
        <img src={currentPart.imgUrl} alt={currentPart.partName} />
      </Popover>
      <div>
        {/* <h3>{currentPart.partName}</h3> */}
        <p>{currentQty} out of {currentPart.targetQty}</p>
        {/* TODO: Add progress bar */}
      </div>
      <div className='part-box-button-container'>
        <button className="plusBtn" onClick={() => addCurrentPartAndUpdate(currentPart)}><PlusOutlined /></button>
        <button className="minusBtn" onClick={() => removeCurrentPartAndUpdate(currentPart)}><MinusOutlined /></button>
      </div>
    </div>
  );
}


