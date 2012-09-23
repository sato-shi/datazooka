
datazooka.setup({
  root: document,
  holder: '#charts'
});

datazooka.defaultRender('flights', ['time', 'delay', 'delay-time', 'time-day', 'day'], {
  filter: {'delay': [20, 150]}, given: {'delay-time': 'xc'}, filterLevels: {'delay-time': [34, 76]}
});

datazooka.definitions('flights', {
  time: {
    label: "Time of Day",
    derived: true,
    dimension: function(d) { return d.date.getHours() + d.date.getMinutes() / 60; }
  },
  delay: {
    label: "Arrival Delay (min.)",
    dimension: function(d) { return Math.max(-60, Math.min(149, d.delay)); }
  },
  distance: {
    label: "Distance (mi.)",
    dimension: function(d) { return Math.min(1999, d.distance); }
  },
  date: {
    label: "Date",
    type: function(d) { return new Date(2001, d.slice(0, 2) - 1, d.slice(2, 4), d.slice(4, 6), d.slice(6, 8)); },
    dimension: function(d) { return d3.time.day(d.date); },
    round: d3.time.day.round,
    groupIdentity: true,
    separation: 86400000,
    tickSpacing: 120,
    x: d3.time.scale().domain([new Date(2001, 0, 1), new Date(2001, 3, 1)]).range([0, 990])
  },
  day: {
    label: "Day of the Week",
    derived: true,
    dimension: function(d) { var day = d.date.getDay() - 1; if (day < 0) { return 6; } else { return day; } },
    ordinal: function(d) { return d; },
    format: function(d) { return ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][d]; }
  },
  origin: {
    label: "Origin Airport",
    dimension: function(d) { return d.origin; },
    ordinal: function(d) { return d; },
  },
  destination: {
    label: "Destination Airport",
    dimension: function(d) { return d.destination; },
    ordinal: function(d) { return d; },
  },
});

// (It's CSV, but GitHub Pages only gzip's JSON at the moment.)
d3.csv("flights-3m.json", function(flights) {
  datazooka.dataFromUntyped('flights', flights);
});

datazooka.definitions('compare-test', {
  x: {label: 'x', dimension: function(d) { return d.x; }, groupBy: 1, round: 1},
  y: {label: 'y', dimension: function(d) { return d.y; }, groupBy: 1, round: 1}
});

var data = [],
    i,
    j,
    k,
    compareLevels = 100;  // copied from config

for (i = 0; i < compareLevels; i++) {
  for (j = 0; j < i; j++) {
    for (k = 0; k < compareLevels; k++) {
      data.push({x: i, y: k});
    }
  }
}
data.push({x: 0, y: 0});

datazooka.data('compare-test', data);

