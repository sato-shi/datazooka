
binfo.setup({
  root: document,
  holder: '#charts'
});
binfo.defaultRender('flights', ['time-delay', 'distance'], {
  filter: {distance: [200, 600]},
  given: {'time-delay': 'yc'}
});

// Randomly get the definitions before or after the data comes in.
var before = Math.random() < 0.5
console.log(before ? 'definitions first' : 'data first');

function definitions() {
  d3.json('test.json', function(jsonDefinitions) {
    binfo.definitionsFromJSON('flights', jsonDefinitions);
  });
}

if (before) definitions();

// (It's CSV, but GitHub Pages only gzip's JSON at the moment.)
d3.csv("flights-3m.json", function(flights) {
  binfo.dataFromUntyped('flights', flights);
  if (!before) definitions();
});

binfo.definitions('compare-test', {
  x: {label: 'x', dimension: function(d) { return d.x; }, groupBy: 1, round: 1},
  y: {label: 'y', dimension: function(d) { return d.y; }, groupBy: 1, round: 1}
});

var data = [],
    i,
    j,
    k;

for (i = 0; i < binfo.compareLevels; i++) {
  for (j = 0; j < i; j++) {
    for (k = 0; k < binfo.compareLevels; k++) {
      data.push({x: i, y: k});
    }
  }
}
data.push({x: 0, y: 0});

binfo.data('compare-test', data);
