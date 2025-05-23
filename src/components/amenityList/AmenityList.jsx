import React from "react";

const AmenidadesList = ({ amenidades }) => {
  const badgeColors = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark",
  ];

  if (!amenidades || amenidades.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        Acomodação sem amenidades.
      </div>
    );
  }

  return (
    <div>
      <label>
        <strong>Amenidades</strong>
      </label>
      <div>
        {amenidades.map((amenidade, index) => {
          const colorClass = badgeColors[index % badgeColors.length];
          return (
            <span key={amenidade.id} className={`badge bg-${colorClass} me-2`}>
              {amenidade.nome}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default AmenidadesList;
