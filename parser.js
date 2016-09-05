"use strict"

var csv = require("fast-csv");
var fs = require('fs')


var peoples =[]
let ID = []
let stringYaml = ""
let stringJSON = ""

let fakeID
let fakeFName
let fakeLName
let fakeEmail
let fakePhone
let fakeDate

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(person){
    this._userId = person.userId
    this._fName = person.fName
    this._lName = person.lName
    this._email = person.email
    this._phone = person.phone
    this._createdAt = person.createdAt
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  parseOn(){

  }

  get people() {
    // If we've already parsed the CSV file, don't parse it again
    // Remember: people is null by default
    if (this._people)
      return this._people

    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here
    // Save the Array in the people instance variable.
  }

  addPerson(person) {
    peoples.push(new Person (person))
  }



  save_as_yaml(stringYaml) {
      fs.writeFile("HasilKonversi.JSON", stringYaml)
  }

  save_as_json(stringJSON) {
      fs.writeFile("HasilKonversi.YAML", stringJSON)
  }
}

let parser = new PersonParser('people.csv')

csv
 .fromPath('people.csv')
 .on("data", function(data){
   peoples.push(new Person({userId: data[0], fName: data[1], lName: data[2], email: data[3], phone: data[4], createdAt: data[5]}))
 })
 .on("end", function(){

   //add new Person
   parser.addPerson({userId: 201, fName: "Andrew", lName: "Tandiawan", email: "atandiawan@andrrew.com", phone:"0813409", createdAt: new Date('2015-04-11')})
   for (let person in peoples){
     stringYaml = stringYaml + "- " +peoples[person]._userId + ":\n"
          + "       fullname: "+peoples[person]._fName + "\n"
          + "       lastname: "+peoples[person]._lName+ "\n"
          + "       email : "+peoples[person]._email + "\n"
          + "       phone : "+peoples[person]._phone + "\n"
          + "       createdDate : " +new Date(peoples[person]._createdAt) + "\n"
   }

    stringJSON +=
                "{\n"
              + "      \"Employee\":\n"
              + "       [\n"
   for (let person in peoples){
     stringJSON = stringJSON
          + "          {\n"
          + "             \"userId\": \"" +peoples[person]._userId + "\",\n"
          + "             \"fullname\": \"" +peoples[person]._fName + "\",\n"
          + "             \"lastname\": \"" +peoples[person]._lName + "\",\n"
          + "             \"email\": \"" +peoples[person]._email + "\",\n"
          + "             \"phone\": \"" +peoples[person]._phone + "\",\n"
          + "             \"createdDate\": \"" +new Date(peoples[person]._createdAt) + "\"\n"
          + "          },\n"
   }
   stringJSON +=
               "       ]\n"
             + "}\n"


   parser.save_as_yaml(stringYaml)
   parser.save_as_json(stringJSON)


   //console.log(stringCSV)
 });
//
 //console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
