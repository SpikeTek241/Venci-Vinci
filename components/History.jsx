const History = ({ items }) => {
  return (
    <div className="history">
      <h2>📜 History</h2>
      <div className="history-grid">
        {items.map((item, idx) => (
          <img key={idx} src={item.url} alt={`history-${idx}`} width="100" />
        ))}
      </div>
    </div>
  );
};

export default History;
