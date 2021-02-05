const treeData = {
  name: 'Star Wars',
  children: [
    {
      name: 'People',
      children: [
        { name: '_id', type: 'bigint' },
        { name: 'name', type: 'varchar' },
        { name: 'mass', type: 'varchar' },
        { name: 'hair_color', type: 'varchar' },
        { name: 'skin_color', type: 'varchar' },
        { name: 'eye_color', type: 'varchar' },
        { name: 'birth_year', type: 'varchar' },
        { name: 'gender', type: 'varchar' },
        { name: 'species_id', type: 'bigint' },
        { name: 'homeworld_id', type: 'bigint' },
        { name: 'height', type: 'integer' },
      ],
    },
    {
      name: 'Vessels',
      children: [
        { name: '_id', type: 'bigint' },
        { name: 'name', type: 'varchar' },
        { name: 'manufacturer', type: 'varchar' },
        { name: 'model', type: 'varchar' },
        { name: 'vessel_type', type: 'varchar' },
        { name: 'vessel_class', type: 'varchar' },
        { name: 'cost_in_credits', type: 'bigint' },
        { name: 'length', type: 'varchar' },
        { name: 'max_atmosphering_speed', type: 'varchar' },
        { name: 'crew', type: 'integer' },
        { name: 'passengers', type: 'integer' },
        { name: 'cargo_capacity', type: 'varchar' },
        { name: 'consumables', type: 'varchar' },
      ],
    },
    {
      name: 'Species',
      children: [
        { name: '_id', type: 'bigint' },
        { name: 'name', type: 'varchar' },
        { name: 'classification', type: 'varchar' },
        { name: 'average_height', type: 'varchar' },
        { name: 'average_lifespan', type: 'varchar' },
        { name: 'hair_colors', type: 'varchar' },
        { name: 'skin_colors', type: 'varchar' },
        { name: 'eye_colors', type: 'varchar' },
        { name: 'language', type: 'varchar' },
        { name: 'homeworld_id', type: 'bigint' },
      ],
    },
    {
      name: 'Planets',
      children: [
        { name: '_id', type: 'bigint' },
        { name: 'name', type: 'varchar' },
        { name: 'rotation_period', type: 'integer' },
        { name: 'orbital_period', type: 'integer' },
        { name: 'diameter', type: 'integer' },
        { name: 'climate', type: 'varchar' },
        { name: 'gravity', type: 'varchar' },
        { name: 'terrain', type: 'varchar' },
        { name: 'surface_weather', type: 'varchar' },
        { name: 'population', type: 'bigint' },
      ],
    },
    {
      name: 'Starship_specs',
      children: [
        { name: '_id', type: 'bigint' },
        { name: 'hyperdrive_rating', type: 'varchar' },
        { name: 'MGLT', type: 'varchar' },
        { name: 'vessel_id', type: 'bigint' },
      ],
    },
    {
      name: 'Films',
      children: [
        { name: '_id', type: 'bigint' },
        { name: 'title', type: 'varchar' },
        { name: 'episode_id', type: 'integer' },
        { name: 'opening_crawl', type: 'varchar' },
        { name: 'director', type: 'varchar' },
        { name: 'producer', type: 'varchar' },
        { name: 'release_date', type: 'date' },
      ],
    },
  ],
};



export default treeData;


/*
const treeData = {
  name: 'United States',
  children: [
    {
      name: 'Arizona',
      children: [{ name: 'Arizona Airport', size: 13 }],
    },
    {
      name: 'California',
      children: [
        { name: 'San Francisco', size: 15 },
        { name: 'San Jose', size: 25 },
        { name: 'Los Angeles', size: 17 },
      ],
    },
    {
      name: 'Illinois',
      children: [
        { name: "Chicago O'Hare", size: 13 },
        { name: 'Midway', size: 18 },
      ],
    },
    {
      name: 'Colorado',
      children: [{ name: 'Denver', size: 7 }],
    },
    {
      name: 'Florida',
      size: 2,
    },
    {
      name: 'Georgia',
      size: 25,
    },
    {
      name: 'Kentucky',
      size: 2,
    },
    {
      name: 'Massachussets',
      size: 25,
    },
    {
      name: 'Michigan',
      size: 2,
    },
    {
      name: 'Minnesota',
      size: 25,
    },
    {
      name: 'Missouri',
      size: 2,
    },
    {
      name: 'North Carolina',
      size: 25,
    },
    {
      name: 'Nevada',
      size: 2,
    },
    {
      name: 'Newyork',
      size: 12,
    },
    {
      name: 'Oregon',
      size: 2,
    },
    {
      name: 'Pennsylvania',
      size: 25,
    },
    {
      name: 'Washington',
      children: [{ name: 'Seattle', size: 13 }],
    },
    {
      name: 'Hawaii',
      size: 25,
    },
    {
      name: 'Texas',
      children: [
        { name: 'Dallas', size: 9 },
        { name: 'Houston', size: 13 },
        { name: 'Austin', size: 17 },
      ],
    },
    {
      name: 'Utah',
      size: 25,
    },
    {
      name: 'Virginia',
      size: 25,
    },
  ],
};


*/