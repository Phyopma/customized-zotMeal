const stationParamsId = {
  BrandyWine: {
    Compass: "32811",
    Grubb: "32801",
    TheCrossroads: "32803",
    Saute: "32807",
    Ember: "32802",
  },
  Anteatry: {
    Home: "23989",
    FireAndIce: "23997",
    NoodleBar: "23995",
    TheFarmersMarket: "23992",
    SizzleGrill: "23990",
  },
};

const stationParamsName = {
  BrandyWine: {
    32811: "Compass",
    32801: "Grubb",
    32803: "The Crossroads",
    32807: "Saute",
    32802: "Ember",
  },
  Anteatry: {
    23989: "Home",
    23997: "Fire & Ice",
    23995: "Noodle Bar",
    23992: "The Farmer's Market (Deli)",
    23990: "Sizzle Grill",
  },
};

export { stationParamsId, stationParamsName };

// make it other way around

// Anteatry’s Stations

// Home => "StationId”: “23989”
// Fire & Ice => "StationId": "23997"
// Noodle Bar => “StationId": "23995"
// The Farmer's Market (Deli) => “StationId": "23992"

// Brandy’s Stations

// Compass => 32811
// Grubb => 32801
// The Crossroads => 32803
// Saute => 32807
