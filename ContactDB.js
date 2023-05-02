/**
 * Wrapper class for the database
 */

require('dotenv').config();
const Database = require('dbcmps369');

class ContactDB{
    constructor() {
        this.db = new Database();
    }

    async initialize(){
        await this.db.connect();

        await this.db.schema('Users', [
            {name: 'id', type: 'INTEGER'},
            {name: 'firstname', type: 'TEXT'},
            {name: 'lastname', type: 'TEXT'},
            {name: 'username', type: 'TEXT'},
            {name: 'password', type: 'TEXT'}
        ], 'id');

        await this.db.schema('Contact', [
            {name: 'id', type: 'INTEGER'},
            {name: 'firstname', type: 'TEXT'},
            {name: 'lastname', type: 'TEXT'},
            {name: 'address', type: 'TEXT'},
            {name: 'phone', type: 'TEXT'},
            {name: 'email', type: 'TEXT'},
            {name: 'title', type: 'TEXT'},
            {name: 'contactbymail', type: 'INTEGER'},
            {name: 'contactbyphone', type: 'INTEGER'},
            {name: 'contactbyemail', type: 'INTEGER'},
            {name: 'lat', type: 'NUMERIC'},
            {name: 'long', type: 'NUMERIC'},
        ], 'id');
    }

    async findContactList(){
        const list = await this.db.read('Contact', []);
        return list;
    }

    async findContactByEmail(email){
        const cEmail = await this.db.read('Contact', [{column: 'Email', value: email}]);
        if(cEmail.length > 0){
            return cEmail[0];
        }else{
            return undefined;
        }
    }

    async createContact(fName, lName, address, phone, email, title, contactbymail, contactbyphone, contactbyemail, lat, long){
        const id = await this.db.create('Contact', [
            {column: 'firstname', value: fName},
            {column: 'lastname', value: lName},
            {column: 'address', value: address},
            {column: 'phone', value: phone},
            {column: 'email', value: email},
            {column: 'title', value: title},
            {column: 'contactbyemail', value: contactbyemail},
            {column: 'contactbyphone', value: contactbyphone},
            {column: 'contactbymail', value: contactbymail}
        ])
    }

}

module.exports = ContactDB;