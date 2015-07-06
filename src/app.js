import { register } from 'lib/register';
import { moduleName as examplePageModule } from 'components/example-page/example-page';

var moduleName = 'app';

var app = angular.module(moduleName, [
  'ngNewRouter',
  'ngMaterial',

  examplePageModule
]);

class AppController {
  constructor($router) {
    $router.config([
      { path: '/', redirectTo: '/example-page'},
      { path: '/example-page', component: 'examplePage'}
    ]);
  }
}

register(moduleName).controller('AppController', [
  '$router',
  AppController
]);
