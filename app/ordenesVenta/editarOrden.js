'use strict';

angular.module('myApp.editarOrden', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/editarOrden', {
    templateUrl: 'ordenesVenta/editarOrden.html',
    controller: 'editarOrdenCtrl'
  });
}])

.controller('editarOrdenCtrl',  [ '$scope', '$http','datatable','$mdDialog','$mdMedia','$mdToast','$location','Scopes',function($scope  , $http ,datatable ,  $mdDialog, $mdMedia , $mdToast ,$location ,Scopes) {
  Scopes.store('editarOrdenCtrl', $scope);

  $scope.ordenSeleccionada = Scopes.get('listaOrdenesCtrl').ordenSeleccionada ;
 console.log("orden seleccionada");
 console.log($scope.ordenSeleccionada) ;
  $scope.login = Scopes.get('loginCtrl').login ; 
  $scope.jsonRespuesta = Scopes.get('loginCtrl').jsonRespuesta ; 
  $scope.login.id = $scope.jsonRespuesta.usuario.id ; 
  $scope.mostrarEditar =  0;
  $scope.mostrarEliminar =  0;
  $scope.data = {};
  $scope.data.info = 0 ; 
  $scope.cantidadTotal  =  0 ; 


   $scope.volver = function (){

      //$state.go('/ordenesVenta');
      $location.path('/listaOrdenes');

    }




  /*************************Objeto que  alamance la  io y el  puerto al cual conectarme****************************/
    $scope.serverData = {};
    //$scope.serverData.ip = "inglaterra";    
    //$scope.serverData.puerto = "8080";
    $scope.serverData.ip = hostName;
    $scope.serverData.puerto = puerto;
    $scope.serverData.usuario = 2 ;
     
    /*********************************Carga los tipos de sevicio por usaurio  ****************************************************/
         $http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/tipos_servicio-x-usuario?id_usuario='+$scope.serverData.usuario)
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


	   $scope.jsonFacturacion = {};
    $scope.jsonFacturacionEnvio = [];
    $scope.jsonEnvio = {};
    $scope.jsonEnvioEnvio = [];
    $scope.jsonEntrega =[];
    $scope.jsonEntregaEnvio=[];
    $scope.jsonEntregaProducto=[];
    //console.log('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/'+$scope.ordenSeleccionada.idOrden);
     

/***********************Tabla edicion de productos*********************************/
      var producto  = "";
    var idLineaOrden = "";
    var bodega = "";
    var cantidad = "" ; 
    var unidad = "";
    var lote ="";
    var notas ="";
            $scope.columnDefs= [
                              {field:'numeroItem', displayName: 'Línea',visible: true , width : '5%'},
                              {field:'codigoProducto', displayName: 'Producto' ,visible: true , width : '12%'},                              
                              {field:'nombreProducto', displayName: 'Nombre producto',visible: true , width : '12%'},                              
                              {field:'codigoUnidad', displayName: 'Unidad',visible: true , width : '10%'},
                              {field:'codigoUnidadAlterno', displayName: 'Unidad alterno',visible: true, width : '16%'},                        
                              {field:'cantidad', displayName: 'Cantidad' ,visible: true , width : '8%'},                              
                              {field:'codigoBodega', displayName: 'Bodega' ,visible:true , width : '12%'}, 
                              {field:'nombreBodega', displayName: 'Nombre bodega' ,visible: true , width : '12%'},  
                              {field:'lote', displayName: 'Lote' ,visible: true , width : '12%'} ,                                                         
                              {field:'notas', displayName: 'Notas',visible: true , width : '40%'},                              
                              {field:'usuario', displayName: 'usuario',visible: true , width : '12%'},
                              {field:'fechaActualizacion', displayName: 'Fecha actualización',visible: true , width : '18%'},
                              {field:'codigoProductoAlterno', displayName: 'Producto alterno' ,visible: true, width : '16%'},
                              {field:'bodega', displayName: 'Bodega' , visible: false},                                                                                     
                              {field:'disponibilidad', displayName: 'Disponibilidad',visible: false},                            
                              {field:'idLineaOrden', displayName: 'Id linea orden' ,visible: false},
                              {field:'idOrden', displayName: 'Id  orden' ,visible: false},
                              {field:'idUsuario', displayName: 'Id  usuario' ,visible: false},                                                                                         
                              {field:'nombreUnidad', displayName: 'Nombre unidad',visible: false},                                                            
                              {field:'producto', displayName: 'producto',visible: false},
                              {field:'unidad', displayName: 'unidad',visible: false}
                              
                            ];

     $scope.gridOptions = {enableRowSelection: true, 
                enableRowHeaderSelection: false,
                selectedItems: $scope.selections,
                enableRowSelection: true,
                enableColumnResize: true,
                columnDefs : $scope.columnDefs            
                };
     $scope.gridOptions.multiSelect = false;
              $scope.gridOptions.onRegisterApi = function( gridApi ) {
                  $scope.gridApi = gridApi;
                    $scope.gridApi.selection.on.rowSelectionChanged($scope, function(row){
                        console.log("entra");
                        console.log( row.entity.idOrden);
                        $scope.ordenSeleccionada =  row.entity ; 
                        console.log(row);
                        console.log(row.entity.idLineaOrden);
                        console.log("producto seleccionado" + row.entity.nombreProducto  + "---" +row.entity.codigoProducto );
                        idLineaOrden =  row.entity.idLineaOrden ; 
                        producto = row.entity.codigoProducto;
                        bodega = row.entity.nombreBodega;
                        cantidad = row.entity.cantidad;
                        unidad = row.entity.nombreUnidad;
                       // $scope.prodCli.nombreLargo =row.entity.nombreProducto;
                        lote = row.entity.lote;
                        notas  = row.entity.notas ;
                        $scope.mostrarEditar =  1;
                        $scope.mostrarEliminar =  1;
                      });
      };




     $http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/'+$scope.ordenSeleccionada.idOrden)     
     //$http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/87')
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
              
              $scope.jsonEdicion= response.data;
             
               console.log("info de edicion == >" + $scope.jsonEdicion.datosFacturacion.nombre) ;
               console.log($scope.jsonEdicion) ; 
              
               $scope.jsonFacturacion =  $scope.jsonEdicion.datosFacturacion ;
               $scope.jsonEnvio = $scope.jsonEdicion.destinoOrigen  ; 
               $scope.jsonEntrega  = $scope.jsonEdicion.datosEntregaRecogida;
               $scope.lineas = $scope.jsonEdicion.lineas ; 
               
               if($scope.jsonEdicion.datosEntregaRecogida.fechaMaxima === $scope.jsonEdicion.datosEntregaRecogida.fechaMinima){
                  console.log("fecha  unica")
                  $scope.data.info =  0;
                  $scope.jsonEntrega.fechaMaxima =  new Date($scope.jsonEdicion.datosEntregaRecogida.fechaMaxima);
                
               }
               else if ($scope.jsonEdicion.datosEntregaRecogida.fechaMaxima != $scope.jsonEdicion.datosEntregaRecogida.fechaMinima){
                  console.log("fecha  rango fechas");
                  $scope.data.info =  1;
                  $scope.jsonEntrega.fechaMaxima =  new Date($scope.jsonEdicion.datosEntregaRecogida.fechaMaxima);
                  $scope.jsonEntrega.fechaMinima =  new Date($scope.jsonEdicion.datosEntregaRecogida.fechaMinima);
                  

               }
               else if ($scope.jsonEdicion.datosEntregaRecogida.fechaMaxima === null ||
                  $scope.jsonEdicion.datosEntregaRecogida.fechaMaxima === undefined || 
                  $scope.jsonEdicion.datosEntregaRecogida.fechaMinima == null  ||
                  $scope.jsonEdicion.datosEntregaRecogida.fechaMinima == undefined ){
                  $scope.data.info =  3;
                  console.log("fecha  no confirmada");
                 

               }

               //valore spor defecto para   la edicion
               //$scope.app.searchText.nombre = $scope.jsonFacturacion.nombreTipoServicio;
               //$scope.cli.searchText.nombre = $scope.jsonFacturacion.nombreCliente;               
               $scope.cargaClientes();
               $scope.cargaDestinatarios();
               $scope.cargaSegmentos();               
               $scope.cargaCiudadEnvio();
               $scope.cargaDestinosEnvio();
               $scope.cargaInfoDestinoEnvio();
               $scope.cargarConfiguracion();
               console.log("json entrega =>" );
               console.log($scope.jsonEntrega) ; 
               for (var i = 0; i < $scope.lineas.length ; i++) {
                 $scope.cantidadTotal += $scope.lineas[i].cantidad ; 
               }
               console.log("cantidad total  = " + $scope.cantidadTotal);
               $scope.gridOptions.data = [] ;
               $scope.gridOptions.data = $scope.lineas ;
               $scope.gridApi.core.refresh();
              // console.log("data facturacion ");
              // console.log($scope.jsonFacturacion);
              // console.log($scope.jsonFacturacion.nombre);
        });    
    /************************Carga  info de  clientes  *******************************************/
      $scope.cargaClientes = function(){
        
        console.log('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/clientes-x-usuario?id_usuario='+$scope.login.id+'&id_tipo_servicio='+$scope.jsonFacturacion.tipoServicio)
        $http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/clientes-x-usuario?id_usuario='+$scope.login.id+'&id_tipo_servicio='+$scope.jsonFacturacion.tipoServicio)
      //$http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/clientes-x-usuario?id_usuario='+$scope.login.id)
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
               
               $scope.clientes = response.data;
               console.log("json cargado cliente ===> " );
               console.log($scope.clientes) ; 

          });    
    }

      /***********************Carga json segmentos*******************************************/
      $scope.cargaSegmentos = function(){

        //$scope.jsonFacturacion.cliente = val;
       
         $http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/segmentos-x-cliente-x-tipo_servicio?id_cliente='+$scope.jsonFacturacion.cliente+'&id_tipo_servicio='+$scope.jsonFacturacion.tipoServicio )
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
                $scope.cargarConfiguracion();
                $scope.segmento= response.data;
               console.log("json cargado segmento ===> " );
               console.log($scope.segmento) ; 

        });          
    }

      /*************************Combo deestinartario por  tipo de servicio y clientes*******************************/
      $scope.destinatario = [];
        $scope.cargaDestinatarios = function (){
          console.log("entra cargar destinatarios");
          console.log('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/destinatarios_remitentes-x-cliente?id_cliente='+$scope.jsonFacturacion.cliente+'&id_tipo_servicio='+$scope.jsonFacturacion.tipoServicio +'&id_segmento='+$scope.jsonFacturacion.segmento);
           $http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/destinatarios_remitentes-x-cliente?id_cliente='+$scope.jsonFacturacion.cliente+'&id_tipo_servicio='+$scope.jsonFacturacion.tipoServicio +'&id_segmento='+$scope.jsonFacturacion.segmento)
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
               
                $scope.destinatario= response.data;
               console.log("json cargado deestinartario ===> " );
              console.log($scope.destinatario) ; 
               


           });    

        }

        /*************************Combo ciudad*******************************************/
         
        
        $scope.cargaCiudadEnvio = function(){

          $http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/ciudades-x-destinatario_remitente?id_destinatario_remitente='+$scope.jsonFacturacion.destinatario+'&id_tipo_servicio='+$scope.jsonFacturacion.tipoServicio )
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
               
                $scope.ciudad= response.data;
               //console.log("json cargado ciudad ===> "+$scope.destinatario[0].id   + "----" +  $scope.jsonFacturacion.destinatario );
               console.log($scope.ciudad) ; 
               $scope.jsonFacturacion.nombre  = $scope.jsonFacturacion.nombre ;
              $scope.jsonFacturacion.telefonos  = $scope.jsonFacturacion.telefonos;
              $scope.jsonFacturacion.email  = $scope.jsonFacturacion.email;
              /* for (var i = 0; i < $scope.destinatario.length; i++) {
               
           
                   if(parseInt($scope.destinatario[i].id) === parseInt($scope.jsonFacturacion.destinatario)){
                    //if(angular.equals($scope.destinatario[i].id, $scope.jsonFacturacion.destinatario)){
                   // console.log("entra" +  $scope.destinatario.numeroIdentificacion );
                      //$scope.jsonFacturacion.numeroDocumento =  $scope.destinatario[i].numeroIdentificacion;
                      $scope.jsonFacturacion.nombre  = $scope.destinatario[i].contacto.nombres +"-";
                      $scope.jsonFacturacion.telefonos  = $scope.destinatario[i].contacto.telefonos+"-";
                      $scope.jsonFacturacion.email  = $scope.destinatario[i].contacto.email+"-";
                       

                   }
                
               };*/

          });    

        }      
         /*******************************Combo destino  *********************************************/
   
        $scope.destino = [];
        $scope.cargaDestinosEnvio = function (){
            $http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/destinos_origenes-x-destinatario_remitente-x-ciudad?id_destinatario_remitente='+$scope.jsonFacturacion.destinatario+'&id_ciudad='+$scope.jsonEnvio.ciudad+'&id_tipo_servicio='+$scope.jsonFacturacion.tipoServicio)
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
               
               $scope.destino= response.data;
               console.log("json cargado destino ===> " );
               console.log($scope.destino) ; 

          });    

        }

        /******************************Cargar informacion destino envio***************/

        $scope.cargaInfoDestinoEnvio = function (id){
          console.log("evento carga info destino"); 
          console.log($scope.destino);
               $scope.jsonEnvio.direccion = $scope.jsonEnvio.direccion;
               $scope.jsonEnvio.nombre = $scope.jsonEnvio.nombre;
               $scope.jsonEnvio.indicacionesDireccion = $scope.jsonEnvio.indicacionesDireccion ;
               $scope.jsonEnvio.telefonos =  $scope.jsonEnvio.telefonos ;
               $scope.jsonEnvio.email = $scope.jsonEnvio.email ;


        /*  for (var i = 0 ; i < $scope.destino.length; i++) {
             console.log($scope.destino[i]);
                 if(parseInt($scope.jsonEnvio.destino) === parseInt($scope.destino[i].id)){
  
                     $scope.jsonEnvio.direccion = $scope.destino[i].direccion.direccion;
                     $scope.jsonEnvio.nombre = $scope.destino[i].nombre;
                     $scope.jsonEnvio.indicacionesDireccion = $scope.destino[i].direccion.indicacionesDireccion + "-";
                     $scope.jsonEnvio.telefonos =  $scope.destino[i].contacto.telefonos +"-";
                     $scope.jsonEnvio.email = $scope.destino[i].contacto.email +"-";


                 }
          }*/

	 }


   /*******************************Combo productos  por  cliente  *********************************************/
       $scope.productosCliente = [];

        $scope.cargarProductosCliente = function (cliente,tipoServicio){
              
            $http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/productos-x-cliente?id_cliente='+cliente+'&id_tipo_servicio='+tipoServicio)
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
               
               $scope.productosCliente= response.data;
              console.log("json cargado productos ===> " );
              console.log('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/productos-x-cliente?id_cliente='+cliente+'&id_tipo_servicio='+tipoServicio);

               console.log($scope.productosCliente) ; 

          });    

        }

      /*******************************Combo jornada  *********************************************/

    /*  $scope.jornadaEntrega= [
                   {"id":"1", "texto":"Am"},
                   {"id":"2", "texto":"Pm"},
                   {"id":"3", "texto":"Am/Pm"}                
        ];*/
       $scope.configuracionData = [];


        $scope.cargarConfiguracion = function (cliente,tipoServicio){
              
            $http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/configuracion_orden-x-tipo_servicio?id_tipo_servicio='+$scope.jsonFacturacion.tipoServicio+'&id_cliente='+$scope.jsonFacturacion.cliente)
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
               
               $scope.configuracionData= response.data;
              console.log("json cargado configuracion ===> " );
              console.log('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/configuracion_orden-x-tipo_servicio?id_tipo_servicio='+$scope.jsonFacturacion.tipoServicio+'&id_cliente='+$scope.jsonFacturacion.cliente);

               console.log($scope.configuracionData) ; 
               console.log("-----------------------------------")
              $scope.jornadaEntrega = $scope.configuracionData[0].jornadas;
              $scope.requerimientosDocumentales =  $scope.configuracionData[1].requerimientosDocumentales ; 
               console.log($scope.configuracionData[0].jornadas);
               console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
               console.log($scope.configuracionData[1].requerimientosDocumentales);

          });    

        }

         
         /*********************Cargar  hora apartir de  la  seleccion de  jornada******************************/ 
         $scope.cargaHoras = function (){
             for (var i =  0; i < $scope.jornadaEntrega.length; i++) {
                if($scope.jsonEntrega.jornada ===$scope.jornadaEntrega[i].codigo )
                {
                    console.log("Entra");
                    $scope.jsonEntrega.horaMinima = $scope.jornadaEntrega[i].horaMinima;
                    $scope.jsonEntrega.horaMaxima = $scope.jornadaEntrega[i].horaMaxima
                }
             };

         }

        $scope.estadoEntrega= [
                   {"id":"1", "texto":"En elaboracion"}
                 
        ];

         $scope.opcionEntrega= [
                   {"id":"1", "texto":"Corte mas proximo"}
                 
        ];
         
    var test = 10  ;
    var producto  = "";
    var bodega = "";
    var cantidad = "" ; 
    var unidad = "";
    var lote ="";
    var notas ="";
     $scope.productosTemporales = [];
  $scope.imprimir = function (){
      $scope.productosTemporales=  $scope.productosTemporales.concat([
                                  {
                                    "producto":producto, 
                                    "bodega":bodega,
                                     "cantidad" : cantidad  ,
                                     "unidad"  : unidad , 
                                     "lote":lote,
                                     "notas" :notas
                                  }
                              ]);
     
      //console.log(angular.toJson($scope.productosTemporales, true));
            }

     /*********************eliminar linea ******************************/
      $scope.eliminarLinea= function ()
      {

        console.log("Entra a eliminar" + idLineaOrden);
        console.log('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/'+$scope.ordenSeleccionada.idOrden+'/deleteLineaOrden/'+idLineaOrden+'/'+$scope.login.usuario);
        $http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/'+$scope.ordenSeleccionada.idOrden+'/deleteLineaOrden/'+idLineaOrden+'/'+$scope.login.usuario)
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
            //    alert("**** Verificar conexion a internet ****");
                console.log("error ===>");
                console.log(status);
                console.log(data);
                console.log(headers);
                console.log(config);
            
              })
              .then(function(response){
               
               $scope.respuestaEliminacion= response.data;
               console.log("json respuesta eliminar  linea ===> " );                 
               console.log($scope.respuestaEliminacion) ; 
               if ($scope.respuestaEliminacion.mensajes.severidadMaxima != 'INFO') {
                  alert("error" + $scope.respuestaEliminacion.mensajes.mensajes[0].texto )

                 }else{

                  $scope.gridOptions.data = [] ;
                  $scope.gridOptions.data = $scope.respuestaEliminacion.orden.lineas ;
            }

          });    


      }

            /************editar evento ********************/
      $scope.esEdicion =  0 ; 
      $scope.editarLinea = function(){
            $scope.esEdicion =  1 ; 
            $scope.showAdvanced();
            //    $scope.jsonProductoAdd.producto = "";
                //$scope.jsonProductoAdd.bodega ="" ;
                
              //  $scope.jsonProductoAdd.unidad = "";
             

      }
/**************Agregar producto**********************/
   
      $scope.agregarLinea = function(){
            $scope.esEdicion =  0 ; 
            $scope.showAdvanced();
            //    $scope.jsonProductoAdd.producto = "";
                //$scope.jsonProductoAdd.bodega ="" ;
                
              //  $scope.jsonProductoAdd.unidad = "";
             

      }

  
      /*************************Ventana  modal de agregar  producto ********************************************/
      
  

        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
       $scope.showAdvanced = function(ev) {
        
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
          $mdDialog.show({
            controller: DialogController,
            templateUrl: './ordenesVenta/agregarProducto.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen,
             locals: { serverData: $scope.serverData ,
                       jsonFacturacion :$scope.jsonFacturacion , 
                       productosTemporales :$scope.productosTemporales , 
                       imprimir  : $scope.imprimir ,   
                       tabla :$scope.datatable ,
                       jsonEntregaRetorno :  $scope.jsonEntregaRetorno,
                       login :$scope.login,
                       ordenSeleccionada :$scope.ordenSeleccionada,
                       gridOptions : $scope.gridOptions,
                       esEdicion:$scope.esEdicion,
                        cantidadTotal:$scope.cantidadTotal}
          })
          .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';

          }, function() {
            $scope.status = 'You cancelled the dialog.';
          });
          $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
          }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
          });
        };


         $scope.cerrarAdvanced = function(){
          console.log("entra");
          $mdDialog.hide()

         }

     
        function DialogController($scope, $mdDialog ,serverData,jsonFacturacion,productosTemporales,imprimir,tabla ,jsonEntregaRetorno , login,ordenSeleccionada ,gridOptions ,esEdicion,cantidadTotal ) {

              $scope.login = login ; 
              $scope.serverData =serverData;
              $scope.jsonFacturacion = jsonFacturacion;
              $scope.datatable = []
              $scope.productosTemporales  = productosTemporales;
              $scope.imprimir   =  imprimir;
              $scope.datatable = tabla;
              $scope.jsonProductoAdd = [];
              $scope.jsonProductoAdd.disponible = 275;
              $scope.jsonEntregaRetorno = jsonEntregaRetorno;
              $scope.jsonEntregaProducto = [];
              
              $scope.ordenSeleccionada = ordenSeleccionada ;
              $scope.gridOptions = gridOptions ; 
              $scope.esEdicion = esEdicion ; 
              $scope.cantidadTotal = cantidadTotal;

              if($scope.esEdicion === 0 )
              { 
                    console.log("Agregar un producto  nuevo");
                    $scope.jsonProductoAdd.producto = "";
                    $scope.jsonProductoAdd.bodega ="" ;
                    $scope.jsonProductoAdd.cantidad = "";
                    $scope.jsonProductoAdd.unidad = "";
                    $scope.jsonProductoAdd.lote ="";
                    $scope.jsonProductoAdd.notas  ="";
              


              }else{
                    $scope.idLineaOrden  =  idLineaOrden  ; 
                    $scope.jsonProductoAdd.producto = producto;
                    $scope.jsonProductoAdd.bodega =bodega ;
                    $scope.jsonProductoAdd.cantidad = cantidad;
                    $scope.jsonProductoAdd.unidad = unidad;
                    $scope.jsonProductoAdd.lote =lote;
                    $scope.jsonProductoAdd.notas  =notas;

                    console.log("Editar un producto existente ==>"  + $scope.idLineaOrden);


              }

                $http.get('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/productos-x-cliente?id_cliente='+ $scope.jsonFacturacion.cliente+'&id_tipo_servicio='+ $scope.jsonFacturacion.tipoServicio)
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
                   
                   $scope.productosCliente= response.data;
                  console.log("json cargado productos ===> " );
                  console.log('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/productos-x-cliente?id_cliente='+ $scope.jsonFacturacion.cliente+'&id_tipo_servicio='+ $scope.jsonFacturacion.tipoServicio);

                   console.log($scope.productosCliente) ; 

              });    


            /**************************Carga bodegas a partir de un producto*************************************************/
            $scope.cargaBodegas = function (val){
              $scope.jsonProductoAdd.producto = val;
             $http.get('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/bodegas-x-producto?id_producto='+$scope.jsonProductoAdd.producto)
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
                     
                     $scope.bodegasProducto= response.data;
                   //  $scope.jsonProductoAdd.nombre = item.attributes["data-nombre"].value;

                    //console.log("json cargado bodegas ===> " + item.attributes["data-nombre"].value );
                    //console.log(item.currentTarget.getAttribute("data-nombre"));
                    console.log('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'satelite/ordenes/bodegas-x-producto?id_producto='+$scope.jsonProductoAdd.producto);

                     console.log($scope.bodegasProducto) ; 

                });    
                 $scope.cargaUnidades();   
            }
             /**************************Carga unidades por producto*************************************************/
            $scope.cargaUnidades = function (){
             $http.get('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/unidades-x-producto?id_producto='+$scope.jsonProductoAdd.producto)
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
                     
                     $scope.unidadesProducto= response.data;
                    console.log("json cargado unidades producto ===> " );
                    console.log('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'satelite/ordenes/unidades-x-producto?id_producto='+$scope.jsonProductoAdd.producto);

                     console.log($scope.unidadesProducto) ; 

                });    
            }

            $scope.cerrarModal = function (){

                $mdDialog.hide();
            }
            $scope.agregarProductoTemporal = function (){

              //var dataPreview = document.getElementById('productoLista');
              //$scope.lista.nombre = dataPreview.getAttribute("data-nombre");


              //console.log("valor = " + $attrs.nombre);
                       /* datatableData =  datatableData.concat([
                                                    {
                                                      "producto":$scope.lista.nombre, 
                                                      "bodega":54456744 ,
                                                       "cantidad" : 10  ,
                                                       "unidad"  : "Bu" , 
                                                       "lote":"123423",
                                                       "notas" :"texto"
                                                    }
                                                ]);*/

                                //Init the datatable with his configuration
        //$scope.datatable = datatable(datatableConfig);
        //Set the data to the datatable
        //$scope.datatable.setData(datatableData);
         console.log("data entrega en modal ");
         console.log($scope.jsonEntregaRetorno);

          $scope.jsonEntregaProducto=  [{

                                             idLineaOrden:$scope.idLineaOrden,
                                             idOrden :parseInt($scope.ordenSeleccionada.idOrden),
                                             numeroItem : 10,
                                             producto :parseInt($scope.jsonProductoAdd.producto) ,
                                             cantidad :parseInt($scope.jsonProductoAdd.cantidad),
                                             unidad : parseInt($scope.jsonProductoAdd.unidad),
                                             bodega :parseInt($scope.jsonProductoAdd.bodega),
                                             lote :$scope.jsonProductoAdd.lote,
                                             notas :$scope.jsonProductoAdd.notas,
                                             idUsuario:parseInt($scope.login.id),
                                              usuario:$scope.login.usuario  

                                        }];
        console.log("jsonEntregaProducto  data  =>");
        console.log(angular.toJson($scope.jsonEntregaProducto, true));

      console.log('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/saveLineaOrden' , $scope.jsonEntregaProducto)
        $http.post('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/saveLineaOrden' , $scope.jsonEntregaProducto)
              
              
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
              
              $scope.jsonProductoRetorno= response.data;
              console.log("Data");
              console.log($scope.jsonProductoRetorno) ; 
                if ($scope.jsonProductoRetorno.mensajes.severidadMaxima != 'INFO') {
                  alert("error" + $scope.jsonProductoRetorno.mensajes.mensajes[0].texto )

                 }else{
                       //$scope.imprimir();
                       console.log("json cargado retorno  productos ===> ");
                       console.log($scope.jsonProductoRetorno.orden.lineas);
                       for (var i = 0; i < $scope.jsonProductoRetorno.orden.lineas.length ; i++) {
                          $scope.cantidadTotal += $scope.jsonProductoRetorno.orden.lineas[i].cantidad ; 
                       }
                        console.log("cantidad total  = " + $scope.cantidadTotal);
                       $scope.gridOptions.data = [];
                       $scope.gridOptions.data = $scope.jsonProductoRetorno.orden.lineas;
                          /* $scope.gridOptions.columnDefs[0].visible = false;
                            $scope.gridOptions.columnDefs[1].visible = false;
                            $scope.gridOptions.columnDefs[2].visible = false;
                            $scope.gridOptions.columnDefs[3].visible = false;
                            $scope.gridOptions.columnDefs[4].visible = false;*/

                          $mdDialog.hide();
                          $scope.jsonProductoAdd.producto = "";
                          $scope.jsonProductoAdd.bodega ="" ;
                          $scope.jsonProductoAdd.cantidad = "";
                          $scope.jsonProductoAdd.unidad = "";
                          $scope.jsonProductoAdd.lote ="";
                          $scope.jsonProductoAdd.notas  ="";
              }
             // $scope.idLineaOrden =  $scope.jsonProductoRetorno.lineaOrden.idlineaOrden;
               //console.log("json cargado retorno  productos ===> "  +  $scope.idLineaOrden  );
              //$scope.gridOptions.data = [] ;
              //$scope.gridOptions.data = $scope.jsonProductoRetorno.orden.lineas ;
                //$scope.dataTabs.tabEnvio = false;
               //$scope.dataTabs.tabSeleccionada =1; 

             });                           
       }
  }

      $scope.jsonEdicion = [];
      $scope.finalizarEdicion = function(){
          $scope.jsonEdicion = [{ 
                                  idOrden: parseInt($scope.ordenSeleccionada.idOrden),
                                  datosFacturacion :$scope.jsonFacturacion,
                                  destinoOrden : $scope.jsonEnvio,
                                  datosEntregaRecogida  :$scope.jsonEntrega,
                                  lineas : $scope.lineas ,
                                  usuarioActualizacion:$scope.login.usuario,
                                  idUsuarioActualizacion : parseInt($scope.login.id),
                                  nuevoEstadoOrden :$scope.jsonFacturacion.estadoOrdenType
                                 }];
          console.log("Json envio edicion");
          console.log(angular.toJson($scope.jsonEdicion, true));
          console.log('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/save',$scope.jsonEdicion);
           $http.post('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/save',$scope.jsonEdicion)
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
                     
                     $scope.edicionRetorno= response.data;
                    console.log("json edicion retorno ===> " );
                    console.log(angular.toJson($scope.edicionRetorno, true));
                     if ($scope.edicionRetorno.mensajes.severidadMaxima != 'INFO') {
                      alert("error" + $scope.edicionRetorno.mensajes.mensajes[0].texto )

                      }else{
                          $scope.volver();
                      }

                });    

      }

  $scope.jsonAceptacion = [];
      $scope.finalizarAceptacion = function(){
        if($scope.jsonFacturacion.numeroDocumentoOrdenCliente === undefined || 
          $scope.jsonFacturacion.numeroDocumentoOrdenCliente === null    ||
          $scope.jsonFacturacion.numeroDocumentoOrdenCliente === ""){
          console.log("falta numero de documento");
          alert("Se debe agregar numero de documento que acompaña la orden !!!");

        }else{
          console.log("ya tiene numero de documento");
          $scope.jsonAceptacion = [{ 
                                  idOrden: parseInt($scope.ordenSeleccionada.idOrden),
                                  datosFacturacion :$scope.jsonFacturacion,
                                  destinoOrden : $scope.jsonEnvio,
                                  datosEntregaRecogida  :$scope.jsonEntrega,
                                  lineas : $scope.lineas ,
                                  usuarioActualizacion:$scope.login.usuario,
                                  idUsuarioActualizacion : parseInt($scope.login.id),
                                  nuevoEstadoOrden :"ACEPTADA"
                                 }];
          console.log("Json envio ACEPTACION");
          console.log(angular.toJson($scope.jsonAceptacion, true));
          console.log('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/save',$scope.jsonAceptacion);
           $http.post('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/save',$scope.jsonAceptacion)
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
                     
                     $scope.aceptacionRetorno= response.data;
                    console.log("json edicion retorno ===> " );
                    console.log(angular.toJson($scope.aceptacionRetorno, true));
                     if ($scope.aceptacionRetorno.mensajes.severidadMaxima != 'INFO') {
                      alert("error" + $scope.aceptacionRetorno.mensajes.mensajes[0].texto )

                      }else{
                          $scope.volver();
                      }

                });    
        }
          
      }



}]);
		