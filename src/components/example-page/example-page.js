import { register } from 'lib/register';

export const moduleName = 'app.examplePage';
var module = angular.module(moduleName, []);

class ExamplePageController {
  constructor() {

  }
}

register(moduleName).controller('ExamplePageController', [
  ExamplePageController
]);
