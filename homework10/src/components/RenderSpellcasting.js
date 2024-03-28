
const RenderSpellcasting = ({ spellcasting }) => {
    return (
    <div className="mb-4">
        <h2 className="text-xl font-semibold text-pink-600">Spellcasting</h2>
        {spellcasting.info?.map((info, index) => (
        <div key={index}>
            <h3>{info.name}</h3>
            {info.desc?.map((desc, idx) => (
            <p key={idx}>{desc}</p>
            ))}
        </div>
        ))}
    </div>
    );
};

export default RenderSpellcasting;