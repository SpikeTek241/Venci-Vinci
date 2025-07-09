const BanList = ({ banList, onUnban }) => {
    return (
    <div className="ban-list">
      <h2>❌ Ban List</h2>
      {Object.entries(banList).map(([type, values]) => (
        <div key={type}>
          <h3>{type.toUpperCase()}</h3>
          {values.map((value, idx) => (
            <p key={idx} onClick={() => onUnban(type, value)}>
              {value}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BanList;