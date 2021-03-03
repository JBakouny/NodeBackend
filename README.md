# Node Express Mongoose MongoDB Server 

## Authentication

It is not sufficient to information on the front-end, you should protect your backend from unauthorised access!

This version implements server-side authentication for two different user roles:
* Normal/Ordinary users which can post comments and then edit (put method) or delete their own comments only.
* Admin users which can delete all comments and can also post, edit or delete dishes, leaders and promotions.
* Note that reading (get method) dishes, comments, leaders and promotions can be done without login.

Login is implemented using a JSON Web Token (JWT).

The [passport npm package](https://www.npmjs.com/package/passport) was used to implement support for user authentication using JWTs.

References include:
* [Creating JWTs using jsonwebtoken npm package](https://www.npmjs.com/package/jsonwebtoken)
* [The passport local package to support local username/password credentials](http://www.passportjs.org/packages/passport-local/) as opposed to logging in using Facebook through OAuth.
* [The passport npm package that supports JWT authentication](https://www.npmjs.com/package/passport-jwt)
* [The passport-local-mongoose package](https://www.npmjs.com/package/passport-local-mongoose) to facilitate implementing password hashing when storing them in the MongoDB database.
* [The JWT.io site](https://jwt.io/) a JSON Web Token.

## Designing the MongoDB Database Schema

Some principles for information modeling in relational database schema design can be applied for MongoDB databases. 

[This article](https://vegibit.com/mongoose-relationships-tutorial/) coule prove useful when designing the MongoDB database schema.
The main points are summarized below:
* To model relationships between connected data, you can reference a document using [Mongoose populate](https://mongoosejs.com/docs/populate.html) or embed it in another document as a sub document.
* Referencing a document does not create a “real” relationship between these two documents as does with a relational database.
* Referencing documents is also known as normalization. It is good for data consistency but creates more queries in your system.
* Embedding documents is also known as denormalization. The benefit of this approach is getting all the data you need about a document and it’s sub document(s) with a single query. Therefore, this approach is very fast. The drawback is that data may not stay as consistent in the database.

Also, Object-Oriented-style inheritance with Mongoose is possible but somewhat complicated. It uses [descriminators](https://mongoosejs.com/docs/discriminators.html).
