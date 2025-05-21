require('dotenv').config();
const { sequelize } = require('./db_conection/index');
const addRelationsToModels = require('./db_conection/model');

const Continent = require('./api/models/continent.model');
const Country = require('./api/models/country.model');
const Company = require('./api/models/company.model');
const Offer = require('./api/models/offer.model');

addRelationsToModels();

async function seed() {
  try {
    await sequelize.sync({ force: true });

    console.log('🌍 Creando continentes...');
    const continents = await Continent.bulkCreate([
      { continent: 'Europe' },
      { continent: 'Asia' },
      { continent: 'Africa' },
      { continent: 'North America' },
      { continent: 'South America' },
      { continent: 'Oceania' },
    ]);

    const [europe, asia, africa, northAmerica, southAmerica] = continents;

    console.log('🌎 Creando países...');
    const countries = await Country.bulkCreate([
      { country: 'Spain', continent_id: europe.id },
      { country: 'Colombia', continent_id: southAmerica.id },
      { country: 'USA', continent_id: northAmerica.id },
      { country: 'Morocco', continent_id: africa.id },
      { country: 'Indonesia', continent_id: asia.id },
      { country: 'Vietnam', continent_id: asia.id },
    ]);

    const [spain, colombia, usa, morocco, indonesia, vietnam] = countries;

    console.log('🏨 Creando empresas...');
    const companies = await Company.bulkCreate([
      {
        name: 'Hostel Chill Madrid',
        email: 'madrid@hostel.com',
        password: 'demo-password',
        description: 'Hostel céntrico en Madrid con buen ambiente.',
        website: 'https://hostelmadrid.com',
        role: 'company',
        continent_id: europe.id,
        country_id: spain.id,
      },
      {
        name: 'Bogotá Hostel Central',
        email: 'bogota@hostel.com',
        password: 'demo-password',
        description: 'Punto de encuentro para mochileros.',
        website: 'https://hostelbogota.com',
        role: 'company',
        continent_id: southAmerica.id,
        country_id: colombia.id,
      },
      {
        name: 'The Miami Eatery',
        email: 'miami@eatery.com',
        password: 'demo-password',
        description: 'Restaurante latino en el corazón de Miami.',
        website: 'https://miamieatery.com',
        role: 'company',
        continent_id: northAmerica.id,
        country_id: usa.id,
      },
      {
        name: 'Marrakech Garden Café',
        email: 'marrakech@cafe.com',
        password: 'demo-password',
        description: 'Café con encanto y vistas a la Medina.',
        website: 'https://gardenmarrakech.com',
        role: 'company',
        continent_id: africa.id,
        country_id: morocco.id,
      },
      {
        name: 'Bali Sunset Hostel',
        email: 'bali@sunsethostel.com',
        password: 'demo-password',
        description: 'Surf y relax en la isla de los dioses.',
        website: 'https://sunsetbali.com',
        role: 'company',
        continent_id: asia.id,
        country_id: indonesia.id,
      },
      {
        name: 'Saigon Street Kitchen',
        email: 'saigon@kitchen.com',
        password: 'demo-password',
        description: 'Comida callejera vietnamita de calidad.',
        website: 'https://saigonkitchen.com',
        role: 'company',
        continent_id: asia.id,
        country_id: vietnam.id,
      },
    ]);

    console.log('💼 Creando ofertas con ubicación real...');

    const companyLocations = {
      'Hostel Chill Madrid': [ -3.7038, 40.4168 ],
      'Bogotá Hostel Central': [ -74.0721, 4.7110 ],
      'The Miami Eatery': [ -80.1918, 25.7617 ],
      'Marrakech Garden Café': [ -7.9811, 31.6295 ],
      'Bali Sunset Hostel': [ 115.1889, -8.4095 ],
      'Saigon Street Kitchen': [ 106.6602, 10.7626 ],
    };

    const roles = [
      'Recepcionista',
      'Camarero/a',
      'Limpieza',
      'Ayudante de cocina',
      'Guía cultural',
    ];

    const commonDetails = {
      description: 'Buscamos persona comprometida y con ganas de vivir una experiencia cultural única.',
      requirements: 'Idioma local o inglés básico. Buena actitud.',
      benefits: 'Alojamiento, comida, actividades culturales.',
      start_date: '2025-07-01',
      end_date: '2025-09-30',
      photo_1: 'url1', photo_2: 'url2', photo_3: 'url3', photo_4: 'url4',
      max_volunteers: 2,
    };

    for (const company of companies) {
      const coords = companyLocations[company.name];
      for (let i = 0; i < 2; i++) {
        await Offer.create({
          title: roles[Math.floor(Math.random() * roles.length)],
          company_id: company.id,
          location: { type: 'Point', coordinates: coords },
          ...commonDetails,
        });
      }
    }

    console.log('✅ Base de datos poblada con coordenadas reales');

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await sequelize.close();
  }
}

seed();
