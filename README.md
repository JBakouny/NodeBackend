# Node Express Mongoose MongoDB Server 

## Running this backend code for integration with the React client App:

1. Make sure the MongoDB database is up and running on the path specified in [config.js](config.js) in the backend-code. To run MongoDB locally, execute the below command in a folder containing a directory named "data" :

    ```[bash]
    mongod --dbpath=data --bind_ip 127.0.0.1
    ```

2. Get the back-end's code from [the branch "react-client-integration"](https://github.com/JBakouny/NodeBackend/tree/react-client-integration) and run the Node.js REST API by executing the below command in the NodeBackend directory that will sync from GitHub:

    ```[bash]
    git clone https://github.com/JBakouny/NodeBackend
    git checkout react-client-integration
    cd NodeBackend
    npm install
    npm start
    ```

3. Follow the [instructions](https://github.com/JBakouny/React#running-the-integrated-application) to run the React client App.

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

## Certificate Management for HTTPS

### Development environment
For development environments, it is sufficient to create your own self-signed certificate:

For Linux/UNIX or Mac:

```[bash]
cd bin
openssl genrsa 1024 > private.key
openssl req -new -key private.key -out cert.csr
openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem
```

For Windows, you should first install [ssl](https://wiki.openssl.org/index.php/Binaries) and/or see the below articles:
* https://blog.didierstevens.com/2015/03/30/howto-make-your-own-cert-with-openssl-on-windows/
* https://www.faqforge.com/windows/use-openssl-on-windows/

An easy alternative is to use an [online genertor](http://www.selfsignedcertificate.com/) for self-signed certificates.
If you ever want to mimic a certification authority, see https://hohnstaedt.de/xca/

### Production environment

For a production environment, you need a valid certificate issues by a known certification authority.

A free certification authority is https://letsencrypt.org/

Hosting services like Heroku also provide [free certificates for your website]( https://devcenter.heroku.com/articles/ssl). 

[CloudFlare](https://www.cloudflare.com/) also provides an alternative, as explained [here](https://www.freecodecamp.org/news/free-https-c051ca570324/).
