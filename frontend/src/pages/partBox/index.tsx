import { useState } from 'react';
import { Part } from '../../types/types';
import './index.css';

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
        setCurrentQty(currentQty - 1);
    }

    function addCurrentPartAndUpdate(part: Part) {
        addCurrentPart(part);
        setCurrentQty(currentQty + 1);
    }



    return (
        <div className='part-box'>
            <img src={currentPart.imgUrl} alt={currentPart.partName} />
            <div>
                <h3>{currentPart.partName}</h3>
                <p>Target Quantity: {currentPart.targetQty}</p>
                <p>Current Quantity: {currentQty}</p>
            </div>
            <div className='part-box-buttons'>
                <button onClick={() => addCurrentPartAndUpdate(currentPart)}>Add</button>
                <button onClick={() => removeCurrentPartAndUpdate(currentPart)}>Remove</button>
            </div>
        </div>
    );
}


