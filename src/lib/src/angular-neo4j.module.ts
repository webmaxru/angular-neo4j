import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularNeo4jComponent } from './angular-neo4j.component';
import { AngularNeo4jService } from './angular-neo4j.service';
import { ReactiveFormsModule } from '@angular/forms';

export * from './angular-neo4j.component';
export * from './angular-neo4j.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AngularNeo4jComponent],
  providers: [AngularNeo4jService],
  declarations: [AngularNeo4jComponent]
})
export class AngularNeo4jModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AngularNeo4jModule,
      providers: [AngularNeo4jService]
    };
  }
}
