/*

Process the CSV data and load for templating. Was previously in index.html, but that's screwy.

*/

module.exports = function(grunt) {
  grunt.registerTask("process-data", function() {

  grunt.task.requires("csv");

  var findBounds = function(tests) {
    var values = tests.map(function(test) {
      return test.level;
    });
    var bounds = {
      min: Math.min.apply(null, values),
      max: Math.max.apply(null, values)
    };
    return bounds;
  };

  //process and cluster results
  var results = {};
  grunt.data.csv.levels.forEach(function(row) {
    //init each employer
    var emp = row.wadesRelated ? 1390 : row.employerID;
    if (!results[emp]) {
      results[emp] = {
        tests: [], //all tests
        known: {}, //known people or groups of people
        employerID: row.employerID,
        name: row.employer,
        address: {
          street: row.street,
          city: row.city,
          state: row.state,
          zip: row.zip,
          county: row.county
        }
      }
    }
    results[emp].tests.push(row);
  });

  var nonanon = {
    //list known people here
    // 20121127004: "Romo",
    // 20080825001: "Sanchez"
  }

  //locate all "special" results in each employer
  Object.keys(results).forEach(function(key) {
    var employer = results[key];
    //employer.tests = 
    employer.tests.filter(function(test) {
      var id = false;
      if (test.patient in nonanon) {
        id = test.patient;
      } else if (test.wadesRelated && test.employerID != 1390) {
        id = test.employerID;
      }
      if (!id) return true;
      var known = employer.known;
      if (!known[id]) {
        known[id] = {
          employee: test.employee,
          employerID: test.employerID,
          tests: [],
          name: nonanon[id] || test.employer
        }
      }
      known[id].tests.push(test);
      return false;
    });

    employer.bounds = findBounds(employer.tests);

    Object.keys(employer.known).forEach(function(key) {
      var known = employer.known[key];
      known.bounds = findBounds(known.tests);
    })
  });

  grunt.data.results = results;

  });
}

