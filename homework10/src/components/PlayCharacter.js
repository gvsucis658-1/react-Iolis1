// Assuming RenderSpellcasting is extracted to its own file for reuse
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RenderSpellcasting from './RenderSpellcasting';

const PlayCharacter = () => {
  const [character, setCharacter] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedCharacter = JSON.parse(localStorage.getItem('selectedCharacter'));
    setCharacter(storedCharacter);
    if (storedCharacter) {
      setEditedName(storedCharacter.characterName);
    }
  }, []);

  const handleEditCharacter = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = () => {
    const updatedCharacter = { 
      ...character, 
      characterName: editedName,
    characterData: {
      ...character.characterData, 
      description: editedDescription,
    },
  };
    localStorage.setItem('selectedCharacter', JSON.stringify(updatedCharacter));
    setCharacter(updatedCharacter);
    setIsEditing(false);
  };

  const handleDeleteCharacter = () => {
    localStorage.removeItem('selectedCharacter');
    navigate('/');
  };

  if (!character) return <div className="text-black p-5">No character selected.</div>;

  return (
    <div className="bg-gray-800 text-white p-5 rounded-lg shadow-lg max-w-xl mx-auto my-10">
      {isEditing ? (
        <div className="flex flex-col space-y-3">
          <p className="text-yellow-500">What name dost thou bear?</p>
          <div>
            <label className="block">Name:</label>
            <input type="text" value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="text-gray-900" />
          </div>
          <p className="text-yellow-500"> Pray, regale me with the tales of thy origin, the winding paths that fate didst traverse to shape thee into the adventurer thou art today. </p>
          <div>
            <label className="block">Description:</label>
            <textarea value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="text-gray-900" />
          </div>
          <button onClick={handleSaveEdit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Save</button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2 text-pink-600">Playing as: {character.characterName}</h1>
          <h2 className="text-xl font-semibold text-pink-600">{character.characterData.name}</h2>
          <p className="mt-1">{character.characterData.description}</p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-pink-600">Hit Die</h2>
            <p className="mt-1">{character.characterData.hit_die}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-pink-600">Proficiency Choices</h2>
            {character.characterData.proficiency_choices?.map((info, index) => (
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
              {character.characterData.proficiencies?.map((proficiency, index) => (
                <li key={index}>{proficiency.name}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-pink-600">Starting Equipment</h2>
            {character.characterData.starting_equipment_options?.map((option, index) => (
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
            <h2 className="text-xl font-semibold">Subclasses</h2>
            <ul>
              {character.characterData.subclasses?.map((subclass, index) => (
                <li key={index}>{subclass.name}</li>
              ))}
            </ul>
          </div>

          {character.characterData.spellcasting && <RenderSpellcasting spellcasting={character.characterData.spellcasting} />}
          <div className="flex space-x-2 mt-4">
            <button
              onClick={handleEditCharacter}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Character
            </button>
            <button
              onClick={handleDeleteCharacter}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete Character
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Back to Classes List
            </button>
          </div>
          
        </>
      )}
    </div>
  );
};

export default PlayCharacter;
