export const generateInfoSection = ({ name, tagline, city, country, price }) => {
  const infoSection = document.createElement('div');
  infoSection.className = 'section-info';
  infoSection.id = 'bio-info';
  infoSection.innerHTML = `
    <h1 data-label="Nom du photographe">${name}</h1>
    <p data-label="Ville, Pays">${city}, ${country}</p>
    <p data-label="Tagline">${tagline}</p>
    <p data-label="Prix">${price}€ / jour</p>
  `;
  return infoSection;
};
