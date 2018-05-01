import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularNeo4jService } from './angular-neo4j.service';

@Component({
  selector: 'angular-neo4j',
  templateUrl: './angular-neo4j.component.html',
  styleUrls: ['./angular-neo4j.component.css']
})
export class AngularNeo4jComponent implements OnInit {
  loginForm: FormGroup;
  queryForm: FormGroup;
  driver: any;
  results: any;

  constructor(private fb: FormBuilder, private neo4j: AngularNeo4jService) {}

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    this.loginForm = this.fb.group({
      url: 'bolt://localhost:7687',
      username: '',
      password: '',
      encrypted: true
    });
    this.queryForm = this.fb.group({
      query: '',
      params: ''
    });
  }

  connect() {
    const formModel = this.loginForm.value;
    this.neo4j
      .connect(
        formModel.url,
        formModel.username,
        formModel.password,
        formModel.encrypted
      )
      .then(driver => {
        if (driver) {
          console.log(`Successfully connected to ${this.loginForm.value.url}`);
        }
      });
  }

  disconnect() {
    this.neo4j.disconnect();
  }

  run() {
    const formModel = this.queryForm.value;

    let params = {}

    if(formModel.params) {
      try {
        params = JSON.parse(formModel.params)
      } catch(err) {
        console.error(err);
      }
    }

    this.neo4j.run(formModel.query, params).then(res => {
      this.results = res
      console.log(res);
    });
  }

}
