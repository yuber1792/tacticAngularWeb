'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
   'myApp.ordenesVenta',  
  'myApp.version',
  'ngMaterial',
  'ultimateDataTableServices',
   'myApp.listaOrdenes',
   'myApp.editarOrden',
   'myApp.login',
   'ui.grid',
   'tactic.services',
    'ui.grid.selection'

]).config(['$routeProvider', '$mdThemingProvider', function($routeProvider ,$mdThemingProvider) {


     var neonRedMap = $mdThemingProvider.extendPalette('red', {
    '500': '444'
  });
      var colorNegroMap = $mdThemingProvider.extendPalette('grey', {
    '500': '555'
  });
  // Register the new color palette map with the name <code>neonRed</code>
  $mdThemingProvider.definePalette('neonRed', neonRedMap);
  $mdThemingProvider.definePalette('gris', colorNegroMap);
  // Use that theme for the primary intentions
  $mdThemingProvider.theme('default')
    .primaryPalette('neonRed')
   
  $routeProvider.otherwise({redirectTo: '/login'});

}

]);

