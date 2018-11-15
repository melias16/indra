var IconMsj  = "<b class='dark-gray'> <span class='fa-stack fa-lg'> <i class='fa fa-square-o fa-stack-2x'></i> <i class='fa fa-exclamation fa-stack-1x'></i> </span> ATENCIÓN </b>";
var IconInfo = "<b class='dark-gray'> <span class='fa-stack fa-lg'> <i class='fa fa-square-o fa-stack-2x'></i> <i class='fa fa-info fa-stack-1x'></i> </span> ATENCIÓN </b>";
var Iconload = ["<i class='fa fa-spinner fa-spin'></i>","<i class='fa fa-spinner fa-3x fa-spin'></i>","<i class='fa fa-circle-o-notch fa-3x fa-spin'></i>","<img src='dist/img/loader.gif'>"];
//
function alertJson(jqXHR){
 if(jqXHR){
  //var resp = JSON.parse(jqXHR.responseText);
  //msg = resp['msg'];
  var msg = 'Código: '+jqXHR.status+'</br> Descripción: '+jqXHR.statusText; 
  alertWindow(msg);   
 } 
}

function alertWindow(str){
 bootbox.alert(IconMsj + " <br/> <span class='dark-gray'>"+str+"</span>", function(result) {

 });
}

function getModule(id){
 var html='' ;
 switch(parseInt(id)){
  case 100: html = 'pages/auditoria.html'; break; 
  //
  case 200: html = 'pages/cambios.html'; break;
  //
  case 300: html = 'pages/portafolio.html';break;
  //
  case 401: html = 'pages/sgrq_registrar.html'; break;
  case 402: html = 'pages/sgrq_actividad.html'; break;
  case 403: html = 'pages/sgrq_recurso.html'; break;
  case 404: html = 'pages/sgrq_estimar.html'; break;
  case 405: html = 'pages/sgrq_indicador.html'; break;
  //case 406: html = 'pages/sgrq_gestionados.html'; break;
  //case 407: html = 'pages/sgrq_reporte.html'; break;
  case 406: html = 'pages/sgrq_reporte_01.html'; break;
  case 407: html = 'pages/sgrq_reporte_02.html'; break;
  case 408: html = 'pages/sgrq_reporte_03.html'; break;
  //
  case 500: html = 'pages/riesgo.html'; break;           
  default: html = ''; break;  
 }

 $("#div-content").load(html);
}

function getMenu(){
 var str = '' ;
 $('#sidebar-menu').html('');
 $.getJSON("json/menu.json", function(data) {
  for(var datos in data.module){
   str += getOptions(data.module[datos]);
  }
  str = '<li class="header">MENU</li>'+str+'<li class="header"> . </li>';
  $('#sidebar-menu').html(str);
 }); 
}

function getOptions(data){
 var icon = '<span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i></span>'; 
 var str  = (data.options ?  icon : '');
 var atr  = ''; var ul1  = ''; var ul2  = ''; var li2 = ''; 
 //
 if(data.id){
  atr =' id="'+data.id+'" onclick="getModule(this.id);" ';
 }
 var li1  = '<a href="#"'+atr+'> <i class="'+ data.icon +'"></i><span>'+ data.description +'</span>'+ str +'</a>';
 //
 if(data.options){
  var li3 = '';
  for(var index1 in data.options){
   var ul3=''; str=''; atr='';
   if(data.options[index1].id){
    atr =' id="'+data.options[index1].id+'" onclick="getModule(this.id);" ';
   }
   if(data.options[index1].options){
    str = icon; li3 ='';
    for(var index2 in data.options[index1].options){
     li3 += getOptions(data.options[index1].options[index2]);  
    }
    ul3 = '<ul class="treeview-menu">'+ li3 +'</ul>'; 
   }
   li2 += '<li class="treeview"><a href="#"'+atr+'><i class="'+data.options[index1].icon +'"></i>'+data.options[index1].description+ str +'</a>'+ ul3 +'</li>';
  } 
  ul2 = '<ul class="treeview-menu">'+ li2 +'</ul>'; 
 }    
 ul1 += '<li class="treeview">'+ li1 + ul2 +'</li>'; 

 return ul1;
}

