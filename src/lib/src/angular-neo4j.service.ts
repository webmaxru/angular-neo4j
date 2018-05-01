import { Injectable } from '@angular/core';

import neo4j from 'neo4j-driver/lib/browser/neo4j-web';

@Injectable({
  providedIn: 'root'
})
export class AngularNeo4jService {
  driver;

  constructor() {}

  /**
   * Create a new driver connection
   */
  connect(url, username, password, encrypted = true) {
    return new Promise((resolve, reject) => {
      try {
        const auth = neo4j.auth.basic(username, password);

        if (username && password && encrypted) {
          this.driver = neo4j.driver(url, auth, { encrypted });
        } else if (username && password) {
          this.driver = neo4j.driver(url, auth);
        } else {
          this.driver = neo4j.driver(url);
        }

        resolve(this.driver);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Close a driver connection
   */
  disconnect() {
    if (this.driver) {
      this.driver.close();
      this.driver = null;
    }
  }

  /**
   * Get the last instantiated driver instance
   */
  getDriver() {
    if (!this.driver) {
      throw new Error(
        'A connection has not been made to Neo4j. You will need to run `connect(url, username, password)` before you can get the current driver instance'
      );
    }
    return this.driver;
  }

  /**
   * Create a new driver session
   */
  getSession() {
    if (!this.driver) {
      throw new Error(
        'A connection has not been made to Neo4j. You will need to run `connect(url, username, password)` before you can create a new session'
      );
    }

    return this.driver.session();
  }

  /**
   * Run a query on the current driver
   */
  run(query, params = null) {
    const session = this.getSession();

    return session.run(query, params).then(
      results => {
        session.close();

        return results.records.map(record => {
          return this.processRecord(record.get(0));
        });
      },
      err => {
        session.close();
        throw err;
      }
    );
  }

  private processInteger(integer) {
    if (integer.constructor.name === 'Integer') {
      return integer.toNumber();
    }
    return integer;
  }

  private processRecord(record) {
    if (record.constructor.name === 'Integer') {
      return record.toNumber();
    }

    if (record.constructor.name === 'Path') {
      record.start.identity = this.processInteger(record.start.identity);
      record.end.identity = this.processInteger(record.end.identity);
      record.segments = record.segments.map(segment => {
        segment.start.identity = this.processInteger(segment.start.identity);
        segment.end.identity = this.processInteger(segment.end.identity);

        segment.relationship.identity = this.processInteger(
          segment.relationship.identity
        );
        segment.relationship.start = this.processInteger(
          segment.relationship.start
        );
        segment.relationship.end = this.processInteger(
          segment.relationship.end
        );

        return segment;
      });
      return record;
    }

    if (record.constructor.name === 'Relationship') {
      record.identity = this.processInteger(record.identity);
      record.start = this.processInteger(record.start);
      record.end = this.processInteger(record.end);
      return record;
    }

    if (record.constructor.name === 'Node') {
      record.identity = this.processInteger(record.identity);
      return record;
    }

    return record;
  }
}
