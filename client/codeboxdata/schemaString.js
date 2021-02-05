export default `
type Query {
  jfadlsjfiosadjfipuerhyg9fausdadiofjshoaerofjugaeipofjpiugvaudosjiugvdfhosaj;uipfshuapdfiojasphdso
  people: [Person!]!
  person(_id: Int!): Person!
  films: [Film!]!
  film(_id: Int!): Film!
  planets: [Planet!]!
  planet(_id: Int!): Planet!
  species: [Species!]!
  speciesByID(_id: Int!): Species!
  vessels: [Vessel!]!
  vessel(_id: Int!): Vessel!
  starshipSpecs: [StarshipSpec!]!
  starshipSpec(_id: Int!): StarshipSpec!
}

type Mutation {
  createPerson(
    gender: String,
    species_id: Int,
    homeworld_id: Int,
    height: Int,
    mass: String,
    hair_color: String,
    skin_color: String,
    eye_color: String,
    name: String!,
    birth_year: String,
  ): Person!

  updatePerson(
    gender: String,
    species_id: Int,
    homeworld_id: Int,
    height: Int,
    _id: Int!,
    mass: String,
    hair_color: String,
    skin_color: String,
    eye_color: String,
    name: String!,
    birth_year: String,
  ): Person!

  deletePerson(_id: ID!): Person!

  createFilm(
    director: String!,
    opening_crawl: String!,
    episode_id: Int!,
    title: String!,
    release_date: String!,
    producer: String!,
  ): Film!

  updateFilm(
    director: String!,
    opening_crawl: String!,
    episode_id: Int!,
    _id: Int!,
    title: String!,
    release_date: String!,
    producer: String!,
  ): Film!

  deleteFilm(_id: ID!): Film!

  createPlanet(
    orbital_period: Int,
    climate: String,
    gravity: String,
    terrain: String,
    surface_water: String,
    population: Int,
    name: String,
    rotation_period: Int,
    diameter: Int,
  ): Planet!

  updatePlanet(
    orbital_period: Int,
    climate: String,
    gravity: String,
    terrain: String,
    surface_water: String,
    population: Int,
    _id: Int!,
    name: String,
    rotation_period: Int,
    diameter: Int,
  ): Planet!

  deletePlanet(_id: ID!): Planet!

  createSpecies(
    hair_colors: String,
    name: String!,
    classification: String,
    average_height: String,
    average_lifespan: String,
    skin_colors: String,
    eye_colors: String,
    language: String,
    homeworld_id: Int,
  ): Species!

  updateSpecies(
    hair_colors: String,
    name: String!,
    classification: String,
    average_height: String,
    average_lifespan: String,
    skin_colors: String,
    eye_colors: String,
    language: String,
    homeworld_id: Int,
    _id: Int!,
  ): Species!

  deleteSpecies(_id: ID!): Species!

  createVessel(
    cost_in_credits: Int,
    length: String,
    vessel_type: String!,
    model: String,
    manufacturer: String,
    name: String!,
    vessel_class: String!,
    max_atmosphering_speed: String,
    crew: Int,
    passengers: Int,
    cargo_capacity: String,
    consumables: String,
  ): Vessel!

  updateVessel(
    cost_in_credits: Int,
    length: String,
    vessel_type: String!,
    model: String,
    manufacturer: String,
    name: String!,
    vessel_class: String!,
    max_atmosphering_speed: String,
    crew: Int,
    passengers: Int,
    cargo_capacity: String,
    consumables: String,
    _id: Int!,
  ): Vessel!

  deleteVessel(_id: ID!): Vessel!

  createStarshipSpec(
    vessel_id: Int!,
    MGLT: String,
    hyperdrive_rating: String,
  ): StarshipSpec!

  updateStarshipSpec(
    _id: Int!,
    vessel_id: Int!,
    MGLT: String,
    hyperdrive_rating: String,
  ): StarshipSpec!

  deleteStarshipSpec(_id: ID!): StarshipSpec!
}

type Person {
  _id: Int!
  gender: String
  height: Int
  mass: String
  hair_color: String
  skin_color: String
  eye_color: String
  name: String!
  birth_year: String
  films: [Film]
  vessels: [Vessel]
  species: [Species]
  planets: [Planet]
}

type Film {
  _id: Int!
  director: String!
  opening_crawl: String!
  episode_id: Int!
  title: String!
  release_date: String!
  producer: String!
  planets: [Planet]
  people: [Person]
  vessels: [Vessel]
  species: [Species]
}

type Planet {
  _id: Int!
  orbital_period: Int
  climate: String
  gravity: String
  terrain: String
  surface_water: String
  population: Int
  name: String
  rotation_period: Int
  diameter: Int
  films: [Film]
  species: [Species]
  people: [Person]
}

type Species {
  _id: Int!
  hair_colors: String
  name: String!
  classification: String
  average_height: String
  average_lifespan: String
  skin_colors: String
  eye_colors: String
  language: String
  people: [Person]
  films: [Film]
  planets: [Planet]
}

type Vessel {
  _id: Int!
  cost_in_credits: Int
  length: String
  vessel_type: String!
  model: String
  manufacturer: String
  name: String!
  vessel_class: String!
  max_atmosphering_speed: String
  crew: Int
  passengers: Int
  cargo_capacity: String
  consumables: String
  films: [Film]
  people: [Person]
  starshipSpecs: [StarshipSpec]
}

type StarshipSpec {
  _id: Int!
  MGLT: String
  hyperdrive_rating: String
  vessels: [Vessel]
}

`;
