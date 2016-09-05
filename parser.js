"use strict"
var csv = require("basic-csv");
var yaml = require('js-yaml')
var jsonfile = require('jsonfile')
var fs = require('fs');
var list = []
var file = "people.csv"

csv.readCSV("people.csv", {
  dropHeader: true
}, function (error, rows) {

  class Person {
    constructor(rows) {
      this._people = rows
    }
  }

  class PersonParser {
    constructor(file) {
      this._file = file
      this._people = rows
      this._new_people = ""
      this._new_people_count = 0
    }

    get people() {
      if (this._people)
        return this._people
    }

    add_person(first_name, last_name, email, phone, created_at) {
      let date = new Date(created_at)
      this._new_people += (this._people.length + this._new_people_count + 1) + "," +  first_name + "," + last_name + "," + email + "," + phone + "," + date + "\n"
      this._new_people_count++
    }

    save_as_yaml() {
      try {
        var doc = yaml.safeLoad(fs.readFileSync(this._file, 'utf8'))
        let yaml_data = doc

        fs.writeFile("people.yaml", yaml_data, function(err) {
          if (err) throw 'error writing file: ' + err;
        });

        console.log(`Added data into people.yaml.`)
        this._new_people_count = 0
      } catch (e) {
        console.log(e)
      }
    }

    save_as_json() {
      let str = ""
      let json_data = {}
      for (var i = 0; i < this._people.length; i++) {
        // json_data.[i+1].id = i+1
        // json_data.[i+1].first_name = this._people[i][1]
        // json_data.[i+1].last_name = this._people[i][2]
        // json_data.[i+1].email = this._people[i][3]
        // json_data.[i+1].phone = this._people[i][4]
        // json_data.[i+1].created_at = Date(this._people[i][5])

        str += "{" +
          "id: '" + this._people[i][0] + "'," +
          "first_name: '" + this._people[i][1] + "'," +
          "last_name: '" + this._people[i][2] + "'," +
          "email: '" + this._people[i][3] + "'," +
          "phone: '" + this._people[i][4] + "'," +
          "created_at: '" + Date(this._people[i][5]) + "'}"
      }

      json_data = JSON.parse(JSON.stringify(str))

      console.log(json_data)

      var file = 'people.json'
      jsonfile.writeFile(file, json_data, function (err) {
        console.error(err)
      })
    }
  }

  // Initiate parser
  let parser = new PersonParser(file)
  // parser.save_as_yaml()
  parser.save_as_json()

});
