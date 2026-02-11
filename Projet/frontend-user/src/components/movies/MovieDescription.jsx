import Button from '../common/Button';
import { useState } from 'react';

function MovieDescription({ description }) {
    const [isExpanded, setIsExpanded] = useState(false);
return (
    <div>
        <p className={isExpanded ? '' : 'line-clamp-2'}>{description} </p>
        <button onClick={() => setIsExpanded(!isExpanded)} style={{ border: '2px solid white', background: 'none', color: 'white', padding: '10px 20px', cursor: 'pointer', borderRadius: '5px' }}>
        {isExpanded ? 'Voir moins' : 'Voir plus'}</button>    
    </div>
    );
}
export default MovieDescription;