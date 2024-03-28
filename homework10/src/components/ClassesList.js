import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dropdown = ({ options, onChange }) => {
    return (
    <select onChange={onChange}>
        <option value="">Select a class</option> {/* Default option */}
        {options.map(option => (
        <option key={option.index} value={option.index}>
            {option.name}
        </option>
        ))}
    </select>
    );
};

const ClassesList = () => {
const [classes, setClasses] = useState([]);
const navigate = useNavigate();

useEffect(() => {
    fetch('https://www.dnd5eapi.co/api/classes')
    .then(response => response.json())
    .then(data => setClasses(data.results))
    .catch(error => console.error('Error:', error));
}, []);

const handleClassChange = (event) => {
    const classIndex = event.target.value;
    if (classIndex) {
    navigate(`/class/${classIndex}`);
    }
};

return (
    <div>
        <h1 className="font-bold text-2xl underline text-red-500">Welcome to the Threshold of Adventure</h1>
        <p className="text-m font-bold">
            Greetings, traveler! You stand at the gateway to realms untold, where legends are born from whispers, and fates are forged in the fires of daring. Here, within these hallowed digital halls, lies the path to valor and mystery—where dragons soar through cloud-wreathed skies, dungeons await with treasures guarded by ancient curses, and characters of great courage and cunning emerge to etch their names upon the annals of history.
            Whether you're a seasoned adventurer well-versed in the art of the dice or a curious newcomer eager to learn the secrets of this storied craft, you've found your sanctuary. Within these pages, you'll discover a compendium of knowledge, a gathering of fellow souls, and the tools to bring your imaginings to life.
            Your journey begins with a choice: who will you become in this vast world of fantasy and peril? A stalwart paladin, a wily rogue, or perhaps a sorcerer with arcane secrets at your fingertips? The path is yours to choose, and countless adventures await.
            So, ready your gear, summon your courage, and step forth into the adventure of a lifetime. The stories yet unwritten beckon, and the dice await your command. Welcome, hero, to your destiny.
        </p>
        <ul>
            <Dropdown options={classes} onChange={handleClassChange} />
        </ul>

    </div>
    
);
};

export default ClassesList;
