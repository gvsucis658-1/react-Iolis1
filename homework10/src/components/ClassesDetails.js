import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RenderSpellcasting from './RenderSpellcasting';

const ClassDetails = () => {
const { index } = useParams();
const [details, setDetails] = useState({});
const navigate = useNavigate();

useEffect(() => {
    fetch(`https://www.dnd5eapi.co/api/classes/${index}`)
    .then(response => response.json())
    .then(data => setDetails(data))
    .catch(error => console.error('Error:', error));
}, [index]);

const handleGoBack = () => {
    navigate(-1);
    };

const handleSelectClass = () => {
    const existingCharacter = localStorage.getItem('selectedCharacter');
    let proceed = true;

    if(existingCharacter) {
        proceed = window.confirm('Wouldst thou like to abandon thy current champion?');
    }
    if (proceed){
        const character = {
            characterData: details, 
            characterName: details.name, 
            customizations: {}, 
        };
        
        localStorage.setItem('selectedCharacter', JSON.stringify(character));
        navigate('/play-character');     
    } else {
        console.log('Thy champion lives to fight another battle.');
    }
};
    
return (
    <div className="bg-gray-800 opacity-90 text-white p-2 rounded-lg shadow-lg max-w-xl mx-auto my-10">
        <h1 className="text-3xl font-bold text-red-800 mb-4">{details.name}</h1>
    <div className="mb-4">
        <h2 className="text-xl font-semibold text-pink-600">Hit Die</h2>
        <p className="text-md text-white">{details.hit_die}</p>
    </div>
    <div className="mb-4">
        <h2 className="text-xl font-semibold text-pink-600">Proficiency Choices</h2>
        {details.proficiency_choices?.map((info, index) => (
            <div key={index}>
            <ul>
                {info.from.options?.map((option, idx) => (
                <li key={idx}>{option.item?.name}</li>
                ))}
            </ul>
            </div>
        ))}
    </div>

    <div className="mb-4">
        <h2 className="text-xl font-semibold text-pink-600">Proficiencies</h2>
        <ul>
        {details.proficiencies?.map((proficiency, index) => (
            <li key={index}>{proficiency.name}</li>
        ))}
        </ul>
    </div>
    <div className="mb-4">
        <h2 className="text-xl font-semibold text-pink-600">Starting Equipment</h2>
        {details.starting_equipment_options?.map((option, index) => (
            <div key={index}>
            <ul>
                {option.from.options?.map((opt, idx) => (
                <li key={idx}>{opt.of?.name || opt.choice?.desc}</li>
                ))}
            </ul>
            </div>
        ))}
    </div>
    <div className="mb-4">
        <h2 className="text-xl font-semibold text-pink-600">Subclasses</h2>
        <ul>
        {details.subclasses?.map((subclass, index) => (
            <li key={index}>{subclass.name}</li>
        ))}
        </ul>
    </div>
    <div className="mb-4">
        {details.spellcasting && <RenderSpellcasting spellcasting={details.spellcasting} />}
    </div>
    <div className="centered space-x-4 mt-4 mx-8">
        <button onClick={handleSelectClass}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Select This Class</button>
        <button onClick={handleGoBack}
        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Go Back</button>
    </div>
    </div>
);
};

export default ClassDetails;
