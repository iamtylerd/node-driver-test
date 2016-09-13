'use strict';

const { MongoClient } = require('mongodb')
const MONGODB_URL = 'mongodb://localhost:27017/test'
const [,, ...args] = process.argv

MongoClient
	.connect(MONGODB_URL)
	.then(db => {
		// Find is a stream = cursor
		db.collection('restaurants')
			.find({ name: RegExp(`${args}`, "i")})
			.sort({name: 1})
			// .toArray()
			.forEach(data => {
				if (data.name) {
					console.log(data.name)
				}
			},
			 () => db.close()
			)
	})
	.catch(console.error)
