'use strict';

angular.module('myApp.ordenesVenta', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ordenesVenta', {
    templateUrl: 'ordenesVenta/ordenesVenta.html',
    controller: 'ordenesVentaCtrl'
  });
}])



.controller('ordenesVentaCtrl', [ '$scope', '$http','datatable','$mdDialog','$mdMedia','$mdToast','$location','Scopes',function($scope  , $http ,datatable ,  $mdDialog, $mdMedia , $mdToast ,$location ,Scopes) {
	    Scopes.store('ordenesVentaCtrl', $scope);
      $scope.login = Scopes.get('loginCtrl').login ; 
      $scope.jsonRespuesta = Scopes.get('loginCtrl').jsonRespuesta ; 
      $scope.login.id  = $scope.jsonRespuesta.usuario.id;
      $scope.jsonListaOrdenes = Scopes.get('listaOrdenesCtrl').jsonListaOrdenes;
      $scope.tipoServicioData  = Scopes.get('listaOrdenesCtrl').tipoServicioData;
      console.log("idUsuario =>" + $scope.login.id);
     $scope.volver = function (){

      //$state.go('/ordenesVenta');
      $location.path('/listaOrdenes');

    }
   
     
    /*************************Loguica  para  bloqueo  y desbloqueo de  las tabs ****************************************/

    $scope.dataTabs = {};
    $scope.dataTabs.tabFacturacion = false;
    $scope.dataTabs.tabEnvio = false;
    $scope.dataTabs.tabEntrega = false;
    $scope.dataTabs.tabProductos = false;
    $scope.dataTabs.tabSoportesDocumentales = false;
    $scope.dataTabs.tabSeleccionada = 0; 
    $scope.jsonFacturacion = {};
    $scope.jsonFacturacionEnvio = [];
    $scope.jsonEnvio = {};
    $scope.jsonEnvioEnvio = [];
    $scope.jsonEntrega =[];
    $scope.jsonEntregaEnvio=[];
    $scope.jsonEntregaProducto=[];    
    $scope.productosTemporales = [];
    $scope.mostrarEditar =  0;
    $scope.mostrarEliminar =  0;
  /*$scope.productosTemporales=  $scope.productosTemporales.concat([
                                  {
                                    "producto":1, 
                                    "bodega":54456744 ,
                                     "cantidad" : 10  ,
                                     "unidad"  : "Bu" , 
                                     "lote":"123423",
                                     "notas" :"texto"
                                  }
                              ]);
*/
  $scope.jsonFacturacionEnvio = [];
    $scope.validaTabFacturacion =  function()
    {        
      $scope.jsonFacturacionEnvio =  [
                                  {
                                    idOrden :null, 
                                    tipoServicio : parseInt($scope.jsonFacturacion.tipoServicio),  
                                    cliente : parseInt($scope.jsonFacturacion.cliente),                               
                                    numeroDocumentoOrdenCliente :$scope.jsonFacturacion.numeroDocumento,
                                    segmento :parseInt($scope.jsonFacturacion.segmento),
                                    destinatario:parseInt($scope.jsonFacturacion.destinatario),
                                    nombre :$scope.jsonFacturacion.nombre,
                                    telefonos :$scope.jsonFacturacion.telefonos,
                                    email :$scope.jsonFacturacion.email,
                                    idUsuario : $scope.serverData.usuario,
                                    usuario: 'arosorio' ,
                                    estadoOrdenType : "NO_CONFIRMADA"

                                  }
                              ];
      console.log("json de facturacion");
      console.log(angular.toJson($scope.jsonFacturacionEnvio, true));
     
      console.log('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/saveDatosFacturacion' , $scope.jsonFacturacionEnvio)
       $http.post('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/saveDatosFacturacion' , $scope.jsonFacturacionEnvio)
       //$http.post('http://192.170.112.193:8080/satelite/ordenes/saveDatosFacturacion' , $scope.jsonFacturacionEnvio)
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
                //alert("**** Verificar conexion a internet ****");
                    console.log("error ===>");
                console.log(status);
                console.log(data);
                console.log(headers);
                console.log(config);
            
              })
              .then(function(response){
              
              $scope.jsonFacturacionRetorno= response.data;
               console.log("json cargado retorno  insert factura  ===> " );
               console.log($scope.jsonFacturacionRetorno);
               console.log("severidad maxima  ==>" + $scope.jsonFacturacionRetorno.mensajes.severidadMaxima);

             //  console.log("json   ===> " +$scope.jsonFacturacionRetorno.orden.datosFacturacion.estadoOrdenType);
              // console.log($scope.jsonFacturacionRetorno) ; 
              if ($scope.jsonFacturacionRetorno.mensajes.severidadMaxima != 'INFO') {
                  alert("error" + $scope.jsonFacturacionRetorno.mensajes.mensajes[0].texto )

              }else{
                   $scope.dataTabs.tabEnvio = false;
               $scope.dataTabs.tabSeleccionada =1; 

              }

                

        });    


      /* $scope.showSimpleToast = function() {
              var pinTo = $scope.getToastPosition();
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Orden creada  con el id  ')
                  .position(pinTo )
                  .hideDelay(3000)
                );
            */
  /************ejemplo quemado de retorno ***********/
 // $scope.jsonFacturacion.nombre = $scope.jsonFacturacionRetorno.nombre;
//console.log($scope.jsonFacturacionRetorno.orden.datosFacturacion.nombre);
    
      //$scope.dataTabs.tabFacturacion = true;
    }

    $scope.validaTabEnvio =  function()
    {        
       $scope.jsonEnvioEnvio =  [
                                  {
                                    idOrden :$scope.jsonFacturacionRetorno.orden.idOrden,
                                    destino : parseInt($scope.jsonEnvio.destino),
                                    bodega :1,
                                    ciudad : $scope.jsonEnvio.ciudad,
                                    nombreAlternoCiudad : ""   ,                                
                                    usuario: 2,
                                    direccion : $scope.jsonEnvio.direccion,
                                    indicacionesDireccion : $scope.jsonEnvio.indicacionesDireccion,
                                    direccionEstandarizada : "",
                                    longitud :parseInt("1213132"),
                                    latitud :parseInt("1213132"),
                                    nombre :$scope.jsonEnvio.nombre,
                                    telefonos :$scope.jsonEnvio.telefonos,
                                    email :$scope.jsonEnvio.email,
                                    idUsuario:parseInt($scope.login.id),
                                    usuario:$scope.login.usuario     
                                                                   
                                  }
                              ];
       console.log("json de envio");
       console.log(angular.toJson($scope.jsonEnvioEnvio, true));
     //  console.log($scope.jsonEnvio)
       $http.post('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/saveDestinoOrigen' , $scope.jsonEnvioEnvio)
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
               // alert("**** Verificar conexion a internet ****");
                   console.log("error ===>");
                console.log(status);
                console.log(data);
                console.log(headers);
                console.log(config);
            
              })
              .then(function(response){
              
              $scope.jsonEnvioRetorno= response.data;
               console.log("json cargado retorno  insert envio  ===> " );
               console.log($scope.jsonEnvioRetorno) ; 
              if ($scope.jsonEnvioRetorno.mensajes.severidadMaxima != 'INFO') {
                  alert("error" + $scope.jsonEnvioRetorno.mensajes.mensajes[0].texto )

              }else{
                  $scope.dataTabs.tabSeleccionada =2; 
                $scope.dataTabs.tabEntrega = false;
              }



              

        });   
     



      //$scope.dataTabs.tabEnvio = true;      
  
      
    }
    $scope.validaTabEntrega = function()
    {         
      console.log($scope.data.info);
        if(parseInt($scope.data.info) === 0 ){

            $scope.jsonEntrega.desde = $scope.jsonEntrega.soloFecha ;
            $scope.jsonEntrega.hasta = $scope.jsonEntrega.soloFecha ;

        }
        $scope.jsonEntregaEnvio =  [
                                {
                                  idOrden :$scope.jsonEnvioRetorno.orden.idOrden   ,                              
                                  estado : $scope.jsonFacturacion.estadoOrdenType,
                                 // soloFecha: $scope.jsonEntrega.soloFecha,
                                  fechaMinima: $scope.jsonEntrega.desde,
                                  fechaMaxima: $scope.jsonEntrega.hasta,
                                  jornada: $scope.jsonEntrega.jornada,
                                  horaMinima: $scope.jsonEntrega.horaMinima,
                                  horaMaxima: $scope.jsonEntrega.horaMaxima,
                                  idUsuario:parseInt($scope.login.id),
                                  usuario:$scope.login.usuario    
                                }
                              ];
        console.log("Json entrega") ;
        console.log(angular.toJson($scope.jsonEntregaEnvio, true));
        
        $http.post('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/saveDatosEntregaRecogida' , $scope.jsonEntregaEnvio)
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
               // alert("**** Verificar conexion a internet ****");
                   console.log("error ===>");
                console.log(status);
                console.log(data);
                console.log(headers);
                console.log(config);
            
              })
              .then(function(response){
              
              $scope.jsonEntregaRetorno= response.data;
               console.log("json cargado retorno  insert entrega  ===> " );
               console.log($scope.jsonEntregaRetorno) ; 

                 if ($scope.jsonEntregaRetorno.mensajes.severidadMaxima != 'INFO') {
                  alert("error" + $scope.jsonEntregaRetorno.mensajes.mensajes[0].texto )

              }else{
                  $scope.dataTabs.tabProductos = false;      
              $scope.dataTabs.tabSeleccionada =3; 
              }


               

        });   


     
      //$scope.dataTabs.tabEntrega = true;      
    }
       $scope.validaTabProductos = function()
    {        
      $scope.dataTabs.tabSoportesDocumentales = false;      
      $scope.dataTabs.tabSeleccionada =4; 
        console.log(angular.toJson($scope.productosTemporales, true));
      //$scope.dataTabs.tabProductos = true;      
    }
    




    /*************************Objeto que  alamance la  io y el  puerto al cual conectarme****************************/
    $scope.serverData = {};
    $scope.serverData.ip = hostName;
    $scope.serverData.puerto = puerto;
  //  $scope.serverData.ip = "192.170.112.187";
  //  $scope.serverData.puerto = "8080";
    $scope.serverData.usuario = 2 ;
     $scope.tipoServicioData = [];
     
    /*********************************Carga los tipos de sevicio por usaurio  ****************************************************/
        
        $scope.cargaTiposServicio= function(val){

              $http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/tipos_servicio-x-usuario?id_usuario='+$scope.login.id)
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
                      for (var i = 0 ; i < $scope.tipoServicioData.length ; i++) {
               
                        if(parseInt(val) === parseInt($scope.tipoServicioData[i].id)){
                            console.log("entro a if" + $scope.tipoServicioData[i].nombre ) ; 
                            console.log("Admite bodegas como destino = " + $scope.tipoServicioData[i].admiteBodegasComoDestino  );
                            if($scope.tipoServicioData[i].admiteBodegasComoDestino)
                            {
                              $scope.admiteBodegasDestino  = 1 ; 
                              console.log("es true");
                            }else{
                              $scope.admiteBodegasDestino  = 0 ; 
                              console.log("es false");
                            }

                        }

                     }

               });  

      }   

    //******************************Clientes por  usuario  **********************************************************/

      /*  $scope.clientes= [
                       {"id":"1", "codigo":"ENTEC" , "nombre":"ENTEC" , "numeroIdentificacion" : "1215646"},
                       {"id":"2", "codigo":"AMBEV" , "nombre":"AMBEV" , "numeroIdentificacion" : "546456"},
                       {"id":"3", "codigo":"CPA" , "nombre":"CPA" , "numeroIdentificacion" : "232342"},
                    ];
      */
      $scope.admiteBodegasDestino  = 0 ; 
      $scope.cargaClientes = function(val){
        
        $scope.jsonFacturacion.tipoServicio  = val
  
         $http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/clientes-x-usuario?id_usuario='+$scope.login.id+'&id_tipo_servicio='+$scope.jsonFacturacion.tipoServicio)
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
                //alert("**** Verificar conexion a internet ****");
                console.log("error ===>");
                console.log(status);
                console.log(data);
                console.log(headers);
                console.log(config);
            
              })
              .then(function(response){
               
               $scope.clientes = response.data;
               console.log("json cargado cliente ===> "  );
               console.log($scope.clientes) ; 
               $scope.cargaTiposServicio(val);

          });    


      }
      $scope.cargaClientes($scope.jsonListaOrdenes.tipoServicio);

     
     /********************************Combo segmentos  ***************************************************************/

      /*$scope.segmento= [
         {"id":"1", "texto":"Cliente final"}         
      ];*/
      $scope.cargaSegmentos = function (val){
         $scope.jsonFacturacion.cliente = val ; 
         $http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes//segmentos-x-cliente-x-tipo_servicio?id_cliente='+$scope.jsonFacturacion.cliente+'&id_tipo_servicio='+$scope.jsonFacturacion.tipoServicio )
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
               // alert("**** Verificar conexion a internet ****");
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
       /* $scope.destinatario= [
                   {"id":"1", "texto":"Destinatario1"},
                   {"id":"2", "texto":"aecrDestinatario1"},
                   {"id":"3", "texto":"bbbhDestinatario1"}                                            
        ];*/
        $scope.cargaDestinatarios = function (val){
          $scope.jsonFacturacion.segmento = val ; 
           $http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/destinatarios_remitentes-x-cliente?id_cliente='+$scope.jsonFacturacion.cliente+'&id_tipo_servicio='+$scope.jsonFacturacion.tipoServicio +'&id_segmento='+$scope.jsonFacturacion.segmento)
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
              //  alert("**** Verificar conexion a internet ****");
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
         
        /* $scope.ciudad= [
                   {"id":"1", "codigo":"bogota" ,"nombreAlterno" :"Bogota" ,"ordinal":"ordinal"},
                   {"id":"2", "codigo":"cali" ,"nombreAlterno" :"Cali" ,"ordinal":"ordinal2"},
                   {"id":"3", "codigo":"medellin" ,"nombreAlterno" :"Medellin" ,"ordinal":"ordinal3"},
        ];*/
        $scope.cargaCiudadEnvio = function(val){
          $scope.jsonFacturacion.destinatario = val ; 
          $http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/ciudades-x-destinatario_remitente?id_destinatario_remitente='+$scope.jsonFacturacion.destinatario+'&id_tipo_servicio='+$scope.jsonFacturacion.tipoServicio )
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
                //alert("**** Verificar conexion a internet ****");
                    console.log("error ===>");
                console.log(status);
                console.log(data);
                console.log(headers);
                console.log(config);
            
              })
              .then(function(response){
               
                $scope.ciudad= response.data;
               console.log("json cargado ciudad ===> "+$scope.destinatario[0].id   + "----" +  $scope.jsonFacturacion.destinatario );
               console.log($scope.ciudad) ; 
               for (var i = 0; i < $scope.destinatario.length; i++) {
               
           
                   if(parseInt($scope.destinatario[i].id) === parseInt($scope.jsonFacturacion.destinatario)){
                    //if(angular.equals($scope.destinatario[i].id, $scope.jsonFacturacion.destinatario)){
                   // console.log("entra" +  $scope.destinatario.numeroIdentificacion );
                      //$scope.jsonFacturacion.numeroDocumento =  $scope.destinatario[i].numeroIdentificacion;
                      $scope.jsonFacturacion.nombre  = $scope.destinatario[i].contacto.nombres +"-";
                      $scope.jsonFacturacion.telefonos  = $scope.destinatario[i].contacto.telefonos+"-";
                      $scope.jsonFacturacion.email  = $scope.destinatario[i].contacto.email+"-";

                   }
                
               };

          });    

        }
         


         /*******************************Combo destino  *********************************************/
        // DestinosOrigenes Por Destinatario Por Ciudad idDestinatarioRemitente,idCiudad,idTipoServicio
        /*$scope.destino= [
                   {"id":"1", "texto":"Destino cargado 1 "},
                   {"id":"2", "texto":"Destino cargado 2 "},
                   {"id":"3", "texto":"Destino cargado 3 "}
        ];*/
        $scope.destino = [];
        
        $scope.cargaDestinosEnvio = function (val){
          $scope.jsonEnvio.ciudad = val;
            $http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/destinos_origenes-x-destinatario_remitente-x-ciudad?id_destinatario_remitente='+$scope.jsonFacturacion.destinatario+'&id_ciudad='+$scope.jsonEnvio.ciudad+'&id_tipo_servicio='+$scope.jsonFacturacion.tipoServicio)
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
               // alert("**** Verificar conexion a internet ****");
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

        $scope.cargaInfoDestinoEnvio = function (val){
          $scope.jsonEnvio.destino = val;
          console.log("evento carga info destino" + $scope.jsonEnvio.destino); 


          for (var i = 0 ; i < $scope.destino.length; i++) {
             console.log($scope.destino[i]);
                 if(parseInt($scope.jsonEnvio.destino) === parseInt($scope.destino[i].id)){
                  console.log("ENtra");
                     $scope.jsonEnvio.direccion = $scope.destino[i].direccion.direccion;
                     $scope.jsonEnvio.nombre = $scope.destino[i].contacto.nombres+"-";
                     $scope.jsonEnvio.indicacionesDireccion = $scope.destino[i].direccion.indicacionesDireccion + "-";
                     $scope.jsonEnvio.telefonos =  $scope.destino[i].contacto.telefonos +"-";
                     $scope.jsonEnvio.email = $scope.destino[i].contacto.email +"-";


                 }
          }



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
                //alert("**** Verificar conexion a internet ****");
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
              //  alert("**** Verificar conexion a internet ****");
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
         


    /***********************Datos  para  la  tabla de productos  ******************************************/
        var test = 10  ;
        var producto  = "";
        var idLineaOrden = "";
        var bodega = "";
        var cantidad = "" ; 
        var unidad = "";
        var lote ="";
        var notas ="";
        $scope.productosTemporales= [];


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
                            enableColumnResize : true,
                            columnDefs :$scope.columnDefs

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
                        idLineaOrden =  row.entity.idLineaOrden ; 
                        producto = row.entity.nombreProducto;
                        bodega = row.entity.nombreBodega;
                        cantidad = row.entity.cantidad;
                        unidad = row.entity.nombreUnidad;
                        lote = row.entity.lote;
                        notas  = row.entity.notas ;
                       //   

                         $scope.mostrarEditar =  1;
                         $scope.mostrarEliminar =  1;
                      });
                };

          /***********************Datos  para  la  tabla de paqueteo  ******************************************/          
           $scope.columnDefsPaqueteo= [
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

      $scope.gridOptionsPaqueteo = {enableRowSelection: true, 
                            enableRowHeaderSelection: false,
                            selectedItems: $scope.selections,
                            enableRowSelection: true,
                            enableColumnResize : true,
                            columnDefs :$scope.columnDefsPaqueteo

                            };
           $scope.gridOptionsPaqueteo.multiSelect = false;
              $scope.gridOptionsPaqueteo.onRegisterApi = function( gridApi ) {
                  $scope.gridApi = gridApi;
                    $scope.gridApi.selection.on.rowSelectionChanged($scope, function(row){
                        console.log("entra");
                        console.log( row.entity.idOrden);
                        $scope.ordenSeleccionada =  row.entity ;
                        console.log(row);
                        console.log(row.entity.idLineaOrden);
                        idLineaOrden =  row.entity.idLineaOrden ; 
                        producto = row.entity.nombreProducto;
                        bodega = row.entity.nombreBodega;
                        cantidad = row.entity.cantidad;
                        unidad = row.entity.nombreUnidad;
                        lote = row.entity.lote;
                        notas  = row.entity.notas ;
                       //   

                         $scope.mostrarEditar =  1;
                         $scope.mostrarEliminar =  1;
                      });
                };





        $scope.imprimir = function (){
        $scope.productosTemporales=  $scope.productosTemporales.concat([
                                  {
                                    "nombreProducto":producto, 
                                    "nombreBodega":bodega,
                                    "cantidad" : cantidad  ,
                                    "nombreUnidad"  : unidad , 
                                    "lote":lote ,
                                    "notas" :notas
                                  }
                              ]);


     
      //console.log(angular.toJson($scope.productosTemporales, true));
      $scope.gridOptions.data = $scope.productosTemporales ;

      }

      /*********************eliminar linea ******************************/
      $scope.eliminarLinea= function ()
      {

        console.log("Entra a eliminar" + idLineaOrden);
        console.log('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/'+$scope.jsonFacturacionRetorno.orden.idOrden+'/deleteLineaOrden/'+idLineaOrden+'/'+$scope.login.usuario);
        $http.get('http://'+$scope.serverData.ip+':'+$scope.serverData.puerto+'/satelite/ordenes/'+$scope.jsonFacturacionRetorno.orden.idOrden+'/deleteLineaOrden/'+idLineaOrden+'/'+$scope.login.usuario)
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
                       gridOptions : $scope.gridOptions,
                       esEdicion:$scope.esEdicion}
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
          $scope.esEdicion = 0 ;
         }

     
        function DialogController($scope, $mdDialog ,serverData,jsonFacturacion,productosTemporales,imprimir,tabla ,jsonEntregaRetorno , login ,gridOptions  ,esEdicion ) 
        {

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
              $scope.gridOptions = gridOptions ; 
              $scope.idLineaOrden  = null;
              $scope.primeraVez = 0; 
              $scope.valor= undefined ; 
              $scope.esEdicion = esEdicion ; 

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
                   // alert("**** Verificar conexion a internet ****");
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
                     // alert("**** Verificar conexion a internet ****");
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
            $scope.cargaValorBodega = function(val){
              console.log("entra a asignar valor de bodega");
              $scope.jsonProductoAdd.bodega = val ;
            
             /**************************Carga unidades por producto*************************************************/
            }
            $scope.cargaUnidades = function (){
             $http.get('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/unidades-x-producto?id_producto='+$scope.jsonProductoAdd.producto)
                    .success(function(data, status, headers, config){
                      //alert("**** SUCCESS ****");
                     // alert(status);

                    })
                    .error(function(data, status, headers, config){
                     // alert("**** Verificar conexion a internet ****");
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
            
               console.log("data entrega en modal ");
               console.log($scope.jsonEntregaRetorno);
               
                $scope.jsonEntregaProducto=  [{

                                                   idLineaOrden: $scope.idLineaOrden,
                                                   idOrden :parseInt($scope.jsonEntregaRetorno.orden.idOrden ),
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
                     // alert("**** Verificar conexion a internet ****");
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
                          
                            //$scope.primeraVez = 1 ; 
                          //  idLineaOrden = $scope.jsonProductoRetorno.orden.lineas[0].idLineaOrden;
                           // console.log("id linea orden cargado  =>" +$scope.valor ); 

                              if ($scope.jsonProductoRetorno.mensajes.severidadMaxima != 'INFO') {
                                alert("error" + $scope.jsonProductoRetorno.mensajes.mensajes[0].texto )

                               }else{
                                     //$scope.imprimir();
                                        console.log("json cargado retorno  productos ===> ");
                                     console.log($scope.jsonProductoRetorno.orden.lineas);
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
                   });   
             
                  
            }
      }


      /*************************************Ventana modal paqueteo****************************************/


      $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');        
       $scope.showAdvancedPaqueteo = function(ev) {
        
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
          $mdDialog.show({
            controller: DialogCotrollerPaqueteo,
            templateUrl: './ordenesVenta/agregarPaqueteo.tmpl.html',
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
                       gridOptions : $scope.gridOptions,
                       esEdicion:$scope.esEdicion}
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
          $scope.esEdicion = 0 ;
         }

     
        function DialogCotrollerPaqueteo($scope, $mdDialog ,serverData,jsonFacturacion,productosTemporales,imprimir,tabla ,jsonEntregaRetorno , login ,gridOptions  ,esEdicion ) 
        {

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
              $scope.gridOptions = gridOptions ; 
              $scope.idLineaOrden  = null;
              $scope.primeraVez = 0; 
              $scope.valor= undefined ; 
              $scope.esEdicion = esEdicion ; 
               $scope.items = ["mercancia tipo 1","mercancia tipo 2","mercancia tipo 3","mercancia tipo 4"];
      $scope.selected = [];

            /*  if($scope.esEdicion === 0 )
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


              }*/



              /*  $http.get('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/productos-x-cliente?id_cliente='+ $scope.jsonFacturacion.cliente+'&id_tipo_servicio='+ $scope.jsonFacturacion.tipoServicio)
                  .success(function(data, status, headers, config){
                    //alert("**** SUCCESS ****");
                   // alert(status);

                  })
                  .error(function(data, status, headers, config){
                   // alert("**** Verificar conexion a internet ****");
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

              });   */ 


            /**************************Carga bodegas a partir de un producto*************************************************/
            /*$scope.cargaBodegas = function (val){
              $scope.jsonProductoAdd.producto = val;
             $http.get('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/bodegas-x-producto?id_producto='+$scope.jsonProductoAdd.producto)
                    .success(function(data, status, headers, config){
                      //alert("**** SUCCESS ****");
                     // alert(status);

                    })
                    .error(function(data, status, headers, config){
                     // alert("**** Verificar conexion a internet ****");
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
            $scope.cargaValorBodega = function(val){
              console.log("entra a asignar valor de bodega");
              $scope.jsonProductoAdd.bodega = val ;
            
             
            }*/
            /**************************Carga unidades por producto*************************************************/
           /* $scope.cargaUnidades = function (){
             $http.get('http://'+ $scope.serverData.ip+':'+ $scope.serverData.puerto+'/satelite/ordenes/unidades-x-producto?id_producto='+$scope.jsonProductoAdd.producto)
                    .success(function(data, status, headers, config){
                      //alert("**** SUCCESS ****");
                     // alert(status);

                    })
                    .error(function(data, status, headers, config){
                     // alert("**** Verificar conexion a internet ****");
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
*/

            $scope.cerrarModal = function (){

                $mdDialog.hide();
            }

           
            $scope.agregarProductoTemporal = function (){
                   console.log("data entrega en modal ");
                   console.log($scope.jsonEntregaRetorno);
                   
                    $scope.jsonEntregaProducto=  [{

                                                   idLineaOrden: $scope.idLineaOrden,
                                                   idOrden :parseInt($scope.jsonEntregaRetorno.orden.idOrden ),
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
                           // alert("**** Verificar conexion a internet ****");
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
                          
                            //$scope.primeraVez = 1 ; 
                          //  idLineaOrden = $scope.jsonProductoRetorno.orden.lineas[0].idLineaOrden;
                           // console.log("id linea orden cargado  =>" +$scope.valor ); 

                              if ($scope.jsonProductoRetorno.mensajes.severidadMaxima != 'INFO') {
                                alert("error" + $scope.jsonProductoRetorno.mensajes.mensajes[0].texto )

                               }else{
                                     //$scope.imprimir();
                                        console.log("json cargado retorno  productos ===> ");
                                     console.log($scope.jsonProductoRetorno.orden.lineas);
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
                   });  
            }
            
              
            
                   
             
                  
            
      }



}]);

  