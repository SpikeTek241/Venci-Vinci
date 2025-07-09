const DisplayCard = ({ item, onBan }) => {
  const breed = item.breeds?.[0];

  return (
    <div className="card">
      <img src={item.url} alt="cat" width="300" />

      <p onClick={() => onBan("origin", breed?.origin)}>
        🌍 Origin: {breed?.origin || "Unknown"}
      </p>

      <p onClick={() => onBan("breed", breed?.name)}>
        🐾 Breed: {breed?.name || "Unknown"}
      </p>

      <p>
        📅 Lifespan: {breed?.life_span ? `${breed.life_span} years` : "Unknown"}
      </p>
    </div>
  );
};

export default DisplayCard;