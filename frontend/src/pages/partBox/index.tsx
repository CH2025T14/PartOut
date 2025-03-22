import { useState } from 'react';
import './index.css';

interface Part {
    partName: string;
    partId: string;
    targetQty: number;
    currQty: number;
    imgUrl: string;
}

interface PartBoxProps {
    part: Part;
}

export default function PartBox({ part }: PartBoxProps) {
    const [currentPart, setCurrentPart] = useState(part);

    return (
        <div className='part-box'>
            <img src={currentPart.imgUrl} alt={currentPart.partName} />
            <div>
                <h3>{currentPart.partName}</h3>
                <p>Target Quantity: {currentPart.targetQty}</p>
                <p>Current Quantity: {currentPart.currQty}</p>
            </div>
        </div>
    );
}


