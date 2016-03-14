  'use strict';

  angular.module('myApp.listaOrdenes', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/listaOrdenes', {
      templateUrl: 'ordenesVenta/listaOrdenes.html',
      controller: 'listaOrdenesCtrl'
    });
  }])

  .controller('listaOrdenesCtrl', [ '$scope', 'datatable', '$location','$http','Scopes',function($scope   ,datatable ,$location ,$http ,Scopes) {
  Scopes.store('listaOrdenesCtrl', $scope);
  console.log(Scopes.get('loginCtrl').login.usuario);
  console.log(Scopes.get('loginCtrl').login.clave);
  $scope.login = Scopes.get('loginCtrl').login ; 
  $scope.jsonRespuesta = Scopes.get('loginCtrl').jsonRespuesta ; 
  $scope.usuario = $scope.jsonRespuesta.usuario ;
  $scope.datos =  {};  
  $scope.datos.seleccionado = 1 ; 
  $scope.refrescar = 0 ; 
  $scope.datos = {};
  $scope.datos.verOpciones = true;


  $scope.estadoOrden  =[
                            {"id":"NO_CONFIRMADA" , "nombre" : "NO_CONFIRMADA"},
                            {"id":"CONFIRMADA" , "nombre" : "CONFIRMADA"},
                            {"id":"ACEPTADA" , "nombre" : "ACEPTADA"},
                            {"id":"EN_EJECUCION" , "nombre" : "EN_EJECUCION"},
                            {"id":"FINALIZADA" , "nombre" : "FINALIZADA"}

                      ];



  console.log("id de usuario = " + $scope.usuario.id);
  		$scope.crearOrden = function (){

  			//$state.go('/ordenesVenta');
  			$location.path('/ordenesVenta');

  		}
  	 /****************************** metodos  para  el funcionamiento de  las datatables*******************************Scopes*/

        

          $scope.Ordenes = [];
           //Simple exemple of data
           $scope.datatableData =[];
         /* $scope.datatableData = [
                                      {
                                          "idOrden":1,                                         
                                          "tipoServicio":54456744 ,
                                          "cliente" : 10  ,
                                          "numeroDocumentoOrdenCliente"  : "Bu" ,
                                          "destinatario":"123423"                              
                                     }                              
                              ];*/


    

   $scope.ordenSeleccionada = {}; 
         $scope.cargarEdicion = function(){

            console.log("Entra a cargar edicion");
            console.log($scope.ordenSeleccionada);
            $location.path('/editarOrden');
            //$scope.seleccion = $scope.gridOptions.selection.getSelectedRows();
            //console.log($scope.selections);

         }
     

                                  /*************************Objeto que  alamance la  io y el  puerto al cual conectarme****************************/
      $scope.serverData = {};
      //$scope.serverData.ip = "inglaterra";
      //$scope.serverData.puerto = "8080";
      $scope.serverData.ip = hostName;
      $scope.serverData.puerto = puerto;
      


       /*********************************Carga los tipos de sevicio por usaurio  ****************************************************/
    console.log('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/tipos_servicio-x-usuario?id_usuario='+$scope.usuario.id)
         $http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/tipos_servicio-x-usuario?id_usuario='+$scope.usuario.id)
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
               
               $scope.tipoServicioData = response.data;
              console.log("json cargado tipos de servicio por cliente ===>");
              console.log( $scope.tipoServicioData);

         });   


            function rowTemplate() {
                  return '<div ng-dblclick="grid.appScope.rowDblClick(row)" >' +
                               '  <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                               '</div>';
                }

          $scope.rowDblClick = function( row) {
       //   alert(JSON.stringify(row.entity)); 
            $scope.cargarEdicion();
          }

        $scope.gridOptions = {enableRowSelection: true, 
                              enableRowHeaderSelection: false,
                              selectedItems: $scope.selections,
                                enableRowSelection: true,
                                 rowTemplate: rowTemplate()
                              };
        $scope.gridOptions.onRegisterApi = function( gridApi ) {
            $scope.gridApi = gridApi;
              $scope.gridApi.selection.on.rowSelectionChanged($scope, function(row){

                console.log("entra");
                console.log( row.entity.idOrden);
                $scope.ordenSeleccionada =  row.entity ;
                $scope.datos.seleccionado =  0 ; 

                console.log(row);
              });
        };
   
        $scope.toggleRowSelection = function() {
          $scope.gridApi.selection.clearSelectedRows();
          $scope.gridOptions.enableRowSelection = !$scope.gridOptions.enableRowSelection;
          $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.OPTIONS);
        };

        $scope.gridOptions.multiSelect = false;
       /* console.log('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/ordenes-x-tipo_servicio-x-estado-x-usuario?id_tipo_servicio=1&estadoOrden=NO_CONFIRMADA&id_usuario='+$scope.usuario.id);
          $http.get('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/ordenes-x-tipo_servicio-x-estado-x-usuario?id_tipo_servicio=1&estadoOrden=NO_CONFIRMADA&id_usuario='+$scope.usuario.id)

          //$http.get('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/ordenes-x-tipo_servicio-x-estado-x-usuario?id_tipo_servicio=1&estadoOrden=NO_CONFIRMADA&id_usuario=2')
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
                
                $scope.respuesta= response.data;
                 console.log("json cargado todas las ordenes ===> " );
                 console.log($scope.respuesta) ; 
                 for (var i = 0; i < $scope.respuesta.length; i++) {
                       $scope.datatableData =  $scope.datatableData.concat([{
                                       idOrden :$scope.respuesta[i].datosFacturacion.idOrden,
                                       tipoServicio: $scope.respuesta[i].datosFacturacion.nombreTipoServicio,
                                       cliente: $scope.respuesta[i].datosFacturacion.codigoCliente,
                                       numeroDocumentoOrdenCliente: $scope.respuesta[i].datosFacturacion.numeroDocumentoOrdenCliente,
                                       destinatario: $scope.respuesta[i].datosFacturacion.nombreDestinatario,
                                       nit : $scope.respuesta[i].datosFacturacion.numeroIdentificacionDestinatario,
                                       ciudad : $scope.respuesta[i].destinoOrigen.nombreAlternoCiudad,
                                       usuario : $scope.respuesta[i].destinoOrigen.usuario,
                                       fecha_actualizacion : $scope.respuesta[i].fechaActualizacion
                                   }]);



                 };
                //  console.log("json solo ordenes===> " + $scope.respuesta[0].datosFacturacion );
                 console.log( $scope.datatableData) ; 
               
                  $scope.gridOptions.data = $scope.datatableData ;
                  $scope.gridApi.core.refresh();
                 //Init the datatable with his configuration
                //$scope.datatable = datatable(datatableConfig);
                //Set the data to the datatable
                //$scope.datatable.setData($scope.datatableData);
                                   

          });    */

       $scope.jsonListaOrdenes = {};
       console.log("valor cache  estado orden  = " +window.localStorage.getItem("estadoOrdenCache"));
       if(window.localStorage.getItem("estadoOrdenCache")  === null){
          console.log("no exite cache ");
          $scope.jsonListaOrdenes.estadoOrden = "NO_CONFIRMADA";
       }else{
          console.log("Ya existe cache de  la variable ");
          $scope.jsonListaOrdenes.estadoOrden =window.localStorage.getItem("estadoOrdenCache");
       }
         
      $scope.jsonListaOrdenes.tipoServicio = 1 ;
      $scope.cargarOrdenes = function (){

            window.localStorage.setItem('estadoOrdenCache',$scope.jsonListaOrdenes.estadoOrden);
        

          console.log('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/ordenes-x-tipo_servicio-x-estado-x-usuario?id_tipo_servicio=1&estadoOrden='+$scope.jsonListaOrdenes.estadoOrden+'&id_usuario='+$scope.usuario.id);
          $http.get('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/ordenes-x-tipo_servicio-x-estado-x-usuario?id_tipo_servicio=1&estadoOrden='+$scope.jsonListaOrdenes.estadoOrden+'&id_usuario='+$scope.usuario.id)

          //$http.get('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/ordenes-x-tipo_servicio-x-estado-x-usuario?id_tipo_servicio=1&estadoOrden=NO_CONFIRMADA&id_usuario=2')
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
                
                $scope.respuesta= response.data;
                 console.log("json cargado todas las ordenes ===> " );
                 console.log($scope.respuesta) ; 
                 $scope.datatableData = [] ; 
                 for (var i = 0; i < $scope.respuesta.length; i++) {
                       $scope.datatableData =  $scope.datatableData.concat([{
                                       idOrden :$scope.respuesta[i].datosFacturacion.idOrden,
                                       tipoServicio: $scope.respuesta[i].datosFacturacion.nombreTipoServicio,
                                       cliente: $scope.respuesta[i].datosFacturacion.codigoCliente,
                                       numeroDocumentoOrdenCliente: $scope.respuesta[i].datosFacturacion.numeroDocumentoOrdenCliente,
                                       destinatario: $scope.respuesta[i].datosFacturacion.nombreDestinatario,
                                       nit : $scope.respuesta[i].datosFacturacion.numeroIdentificacionDestinatario,
                                       ciudad : $scope.respuesta[i].destinoOrigen.nombreAlternoCiudad,
                                       usuario : $scope.respuesta[i].destinoOrigen.usuario,
                                       fecha_actualizacion : $scope.respuesta[i].fechaActualizacion

                                   }]);



                 };
                  console.log("json datatable ===> " );
                 console.log( $scope.datatableData) ; 
                $scope.refrescar = 1 ; 
                  $scope.gridOptions.data = [];//$scope.datatableData ;
                   $scope.gridOptions.data = $scope.datatableData ;
                  $scope.gridApi.core.refresh();
                 //Init the datatable with his configuration
                //$scope.datatable = datatable(datatableConfig);
                //Set the data to the datatable
                //$scope.datatable.setData($scope.datatableData);
                                   

          });    


      }
      
      
      $scope.cargarOrdenes();
   

  }]);
  		