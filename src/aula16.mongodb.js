/* global use, db */

/**
 * The commands must be pasted in a mongosh terminal.
 * If they are run as a playground, only the last result will be shown.
 */

/**
 * Open a database. If it does not exist, 
 * create a new one.
 */
use('aula16');

/**
 * Delete the collection, so we start with an empty one.
 */
db.cities.drop();

/**
 * Access the help system
 */
db.help()

/**
 * Insert three new documents.
 */
db.cities.insertOne({
    name: 'Santo Andre',
    population: 723889,
    areamKm2: 175.8,
    polulationDensity: 4000,
    elevationM: 700,
    lastCensus: 2021,
    hdi: 0.815
})
db.cities.insertOne({
    name: 'São Bernardo do Campo',
    population: 816925,
    areamKm2: 409.51,
    polulationDensity: 2000,
    elevationM: 762,
    lastCensus: 2021,
    hdi: 0.805
})
db.cities.insertOne({
    name: 'São Caetano do Sul',
    population: 161127,
    areamKm2: 15.33,
    polulationDensity: 10509,
    elevationM: 744,
    lastCensus: 2021,
    hdi: 0.865
})

/**
 * Retrieve all documents in the collection.
 */
db.cities.find()

/**
 * The MongoShell is a JS shell, we can arbitrary
 * programas, for instance, here we define a function 
 * that iterate a result cursor.
 * 
 * @returns an array of city names
 */
function listCityNames() {
    const names = []
    const cursor = db.cities.find()

    while (cursor.hasNext()) {
        const city = cursor.next();

        names.push(city['name']);
    }

    return names;
}

/**
 * Call the newly defined function.
 */
listCityNames()

/**
 * Retrieve all cities with name "Santo Andre"
 */
db.cities.find({
    name: 'Santo Andre'
})


/**
 * Retrieve all cities which starts with "São"
 * and has a population in the interval (200000,800000).
 * Commas are logically equivalent to "and"
 */
db.cities.find({
    name: /^São/,
    population: {'$lt': 800000, '$gt': 20000}
})

/**
 * Operands in a query can be "OR-ed" by using the $or operator
 */
db.cities.find({
    $or: [
        {name: /^São/},
        {population: {'$lt': 800000, '$gt': 20000}}
    ]
})

/**
 * Sort by a specific property or combination of properties.
 * 1: ascending order; -1 descending order
 */
db.cities.find().sort({name: 1})
db.cities.find().sort({population: -1})

/**
 * Get the quantity of documents in a collection.
 */
db.cities.countDocuments()

/**
 * We have several methods that operate in a single element.
 */
db.cities.findOne({name: /^São/})

/**
 * We can update a single document with updateOne, 
 * whose first parameter is the query document and the
 * second is the update document.
 */
// change the name
db.cities.updateOne({name: 'Santo Andre'}, {$set: {name: 'Santo André'}})
// increment the population by 1000
db.cities.updateOne({name: 'São Caetano do Sul'}, {$inc: {population: 1000}})

/**
 * We can also update multiple documents with updateMany
 */
// increment the populations of all cities by 2000
db.cities.updateMany({}, {$inc: {population: 2000}})

/**
 * We can also remove a single document or multiple documents
 */
// insert dumb data
db.cities.insert({name: 'randomCity1'})
db.cities.insert({name: 'randomCity2'})
db.cities.insert({name: 'randomCity3'})
// remove one city
db.cities.deleteOne({name: 'randomCity1'})
// remove multiple cities
db.cities.deleteMany({name: /randomCity\d/})


