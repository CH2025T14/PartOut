import { useState, useEffect, useRef } from 'react';
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
  const [currentQty, setCurrentQty] = useState(currQty);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  
  useEffect(() => {
    setCurrentQty(currQty);
  }, [currQty]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (currQty === part.targetQty) {
      console.log(`Target quantity reached for ${part.partName}, setting timer...`);
      
      timerRef.current = setTimeout(() => {
        console.log(`Timer complete for ${part.partName}`);
        setCurrentQty(part.currQty);
      }, 3000);
    }

    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currQty, part.targetQty]);

  function handleRemove() {
    removeCurrentPart(part);
  }

  function handleAdd() {
    addCurrentPart(part);
  }

  return (
    <div className='part-box'>
      <Popover content={part.partName} trigger="hover">
        <img src={part.imgUrl} alt={part.partName} />
      </Popover>
      <div>
        <p>{currentQty} out of {part.targetQty}</p>
        <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '4px', height: '10px' }}>
          <div
            style={{
              width: `${(part.targetQty > 0 ? (currentQty / part.targetQty) * 100 : 0)}%`,
              backgroundColor: '#52c597',
              height: '100%',
              borderRadius: '4px',
              transition: 'width 0.3s ease-in-out'
            }}
            role="progressbar"
            aria-valuenow={currentQty}
            aria-valuemin={0}
            aria-valuemax={part.targetQty}
          ></div>
        </div>
      </div>
      <div className='part-box-button-container'>
        <button 
          className="minusBtn" 
          onClick={handleRemove}
          disabled={currQty <= 0}
        >
          <MinusOutlined />
        </button>
        <button 
          className="plusBtn" 
          onClick={handleAdd}
          disabled={currQty >= part.targetQty}
        >
          <PlusOutlined />
        </button>
      </div>
    </div>
  );
}


