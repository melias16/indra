/**
 * AdminLTE Demo Menu
 * ------------------
 * You should not use this file in production.
 * This file is for demo purposes only.
 */
$(function () {
    'use strict'
  
    /**
     * Get access to plugins
     */
    var ip="localhost";
     var anio="2019";
      var listadoProcesos=[];
       $(document).ready(function() {
  
          var date = new Date();
      
          $('#textFecCre').val( date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear()) 
  
           $.ajax({
               type:"GET",
               url: "http://"+ip+":84/Auditoria/solicitudregistro/",
               dataType: "json",
               success: function(xvr){
                   
                  
                   var tdtd="";
                  $.each(xvr,function (index,item) {
                    tdtd= tdtd + '<tr><td>' + item.asunto + '</td><td>' + item.estado + '</td><td>' + item.fecharegistro + '</td><td></td></tr>';
                  })
                  tdtd=tdtd+"";
                  $('#listasolicitud tbody').html(tdtd);
               },
               error: function(){
                   
               }
           })
          
     
  
          
          $('#popupGenerar').click(function(){
              debugger;
              if($('#textProceso').val().length==0){
                      alert('Debe seleccionar algún proceso.');
                      return false;
              }
              
              var tempObj={
                "id": 0,
                "asunto": $('#textAsunto').html(),
                "prioridad": $('#textPrioridad').val(),
                "estadoid": 0,
                "estado": $('#textEstado').val(),
                "fecharegistro": $('#textFecCre').val(),
                "motivo": $('#textMotivo').html(),
                "proceso": $('#textProceso').val(),
                "solicitante": $('#textIdSolic').val()               
              }

              tempObj = {
                    "asunto": $('#textAsunto').html(),
                    "prioridad": $('#textPrioridad').val(),
                    "proceso": {
                        "procesoId":$('#textProceso').val()
                    },
                    "solicitante":{
                        "empleadoId": $('#textIdSolic').val()
                    }
                }
              
              var jsontext=JSON.stringify(tempObj);
              $.ajax({
                       type:"POST",
                       url: "http://"+ip+":84/Auditoria/solicitudregistro",
                       dataType: "json",
                       contentType: "application/json; charset=utf-8",
                       data: jsontext,
                       success: function(xvr){
                        alert('Se registro la Solicitud satisfactoriamente (id: '+xvr.id+').');
                        location.reload()
                           
                           
                       },
                       error: function(err){
                           alert(err)
                           
                       }
                   })
              
  
          })
  
          function generarPDFO(creadopor,fechacreacion,periodo,anio,programas){
              var documentDefinition = {
                  content: [
                        {
                        text: 'Plan Anual de Auditoria ' + anio,
                        style: 'header',
                        alignment: 'center',
                        margin: [0, 20]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            {
                                text: [
                                    'Periodo: ',
                                    {text: periodo, bold: true},
                                    ]
                            },
                            {
                                text: [
                                    'Fecha de Creación: ',
                                    {text: fechacreacion, bold: true},
                                    ]
                            }
                        ],
                        margin: [0, 3]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            {
                                text: [
                                    'Generado por: ',
                                    {text: creadopor, bold: true},
                                    ]
                            }
                        ],
                        margin: [0, 20]
                    },
                    {text: 'Procesos del Plan Anual de Auditoria ' + anio, fontSize: 14, bold: true, margin: [0, 20, 0, 20]},
                    
                    {
                        style: 'tableExample',
                        table: {
                            widths: [ 60,  60, '*',  50, '*'],
                            headerRows: 1,
                            body: 
                                
                                programas
                            
                        },
                        layout: 'lightHorizontalLines'
                    }
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true
                    },
                    bigger: {
                        fontSize: 15,
                        italics: true
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 12,
                        color: 'black'
                    },
                    tableExample: {
                      fontSize: 11,
                    },
                },
                defaultStyle: {
                    columnGap: 20
                }
              };
              
              pdfMake.createPdf(documentDefinition).download('testdoc.pdf');
  
          }
          
      } );
      
      
      
  })
  