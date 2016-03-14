'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'ordenesVenta/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', [ '$scope', 'datatable', '$location','$http', 'Scopes', function($scope,datatable ,$location  ,$http , Scopes) {
Scopes.store('loginCtrl', $scope);
console.log("variable global " + hostName) ;
$scope.login = {};    
    $scope.login =function(){
    $http.defaults.useXDomain = true;
        $http.get('http://'+hostName+':'+puerto+'/satelite/login?usuario='+$scope.login.usuario+'&pwd='+$scope.login.clave)
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);
              })
              .error(function(data, status, headers, config){
                console.log("error ===>");
                console.log(status);
                console.log(data);
                console.log(headers);
                console.log(config);
            
              })
              .then(function(response){
               $scope.jsonRespuesta = response.data;
                  $scope.bodegas  =   $scope.jsonRespuesta.bodegas;
               if($scope.jsonRespuesta.ok){
                 console.log("respues de  login")
                  console.log($scope.jsonRespuesta);
                  $location.path('/listaOrdenes');     

                 

                } else
               {
                 alert("Usuario  o clave  incorrecto");

               }

             
                
                
         });


//           

    }


}]);
		