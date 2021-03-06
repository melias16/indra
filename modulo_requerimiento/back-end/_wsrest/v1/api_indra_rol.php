<?php
  require_once("api_indra_base.php");
  //
  // indra/requerimiento/rol/
  //
  class Api extends ApiBase {
   //
   public function roles() {  
    if ($_SERVER['REQUEST_METHOD'] != "GET") {  
     $this->showResponse($this->convertJson($this->returnError(1)), 405);  
    } 
    //
    $sql  = "SELECT co_id as id,tx_descripcion as descripcion FROM ".self::TBL_ROL." t1 GROUP BY id ORDER BY id";
    $this->showResponseQuery($sql);
    //
   }
   //
   public function actividad($id) {  
    if ($_SERVER['REQUEST_METHOD'] != "GET") {  
     $this->showResponse($this->convertJson($this->returnError(1)), 405);  
    } 
    if(!empty($id)){
     $sql  = "SELECT co_actividad_tipo as id,(select tx_descripcion from ".self::TBL_ACTIVIDAD_TIPO." where co_id=co_actividad_tipo) as descripcion FROM ".self::TBL_ROL_ACTIVIDAD." t1 where co_rol=$id";
     $this->showResponseQuery($sql);
    }
    //
    $this->showResponse($this->returnError(0), 404);  
   }
   //
   public function personal($id) {  
    if ($_SERVER['REQUEST_METHOD'] != "GET") {  
     $this->showResponse($this->convertJson($this->returnError(1)), 405);  
    } 
    if(!empty($id)){
     $sql  = "SELECT t1.co_id as id,concat(no_nombres,' ',no_apellidos) as Personal FROM ".self::TBL_EMPLEADO." t1 inner join ".self::TBL_ROL_ACTIVIDAD." t2 on t1.co_rol=t2.co_rol WHERE co_actividad_tipo=$id";
     $this->showResponseQuery($sql);
    }
    //
    $this->showResponse($this->returnError(0), 404);  
   }
  } 
  // 
  $api = new Api();  
  $api->processRequest(); 
  //
?>   