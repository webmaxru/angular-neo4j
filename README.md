### Neo4j Bolt driver wrapper for Angular

Use Neo4j Bolt driver for JavaScript from your Angular application. A special browser version of the driver supports connecting to Neo4j over WebSockets.

#### Installation

To install this library, run:

```bash
$ npm install angular-neo4j --save
```
```js
import { AngularNeo4jModule } from 'angular-neo4j';

@NgModule({
  imports: [
    AngularNeo4jModule
  ]
})
export class AppModule { }
```

### Usage
The module includes a service and a design-free component using this service: login form and query form. You are welcome to use this component as a foundation for your custom one.

The fastest way to test everything:

```html
  <angular-neo4j></angular-neo4j>
```

Use the service in your own component:

```javascript
  import { AngularNeo4jService } from './angular-neo4j.service';
  ...
  constructor(private neo4j: AngularNeo4jService) {}
```
- `connect( url: string, username: string, password: string, encrypted?: boolean )` - Connect to your Neo4j instance. Returns a promise with a driver instance.
```javascript

  const url = 'bolt://localhost:7687';
  const username = 'neo4j';
  const password = 'neo4j';
  const encrypted = true;

  this.neo4j
      .connect(
        url,
        username,
        password,
        encrypted
      )
      .then(driver => {
        if (driver) {
          console.log(`Successfully connected to ${url}`);
        }
      });
```
- `run( query: string, params?: object)` - Run the query with parameters. Returns a promise with array of records.
```javascript

  const query = 'MATCH (n:USER {name: {name}}) RETURN n';
  const params = { name: 'bob' };

  this.neo4j.run(query, params).then(res => {
      console.log(res);
    });
```
- `disconnect()` - Close the active driver.
```javascript
  this.neo4j.disconnect()
```

### Note on security

Do not hardcode your Neo4j username and password in the Angular app - always use login form to authenticate.

## License

MIT © [Maxim Salnikov](mailto:salnikov@gmail.com)