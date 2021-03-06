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
  var iplocal="ec2-18-223-99-234.us-east-2.compute.amazonaws.com";
  var ip="ec2-18-223-99-234.us-east-2.compute.amazonaws.com:8081/Auditoria";
   var anio="2019";
	var listadoProcesos=[];
	var inicial;
	 $(document).ready(function() {

		var date = new Date();
	
		$('#textFecCre').val( date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear()) 

		 $.ajax({
			 type:"GET",
			 url: "http://"+ip+"/planesAnuales/init",
			 dataType: "json",
			 success: function(xvr){
				//  if(xvr==0){
						debugger;
				// 		$('#popupGenerar').hide();
				//  }
				//  else if(xvr==1){
					$('#textPeriodo').val(xvr.periodoCompleto);
					$('#textGenPor').val('Eduardo Bonilla');
					inicial=xvr;
					var opt="";
						$.each(xvr.procesos,function (index,item) {
							opt=opt+'<option texto="'+item.procesoId+'" value="'+item.procesoId+'">'+item.nombre+'</option>'
						})
						$('#txtProceso').html(opt)
				$('#popupGenerar').html('Generar a Plan Anual');

				
				//listadoProcesos.push(objTemp);
				
			


				//  }
				//  else if(xvr==2){
						
				// 		$('#popupGenerar').html('Volver a Generar Plan Anual');
				//  }
			 },
			 error: function(){
				 
			 }
		 })
		 
		$('#example').DataTable({
			"bLengthChange": false,
			"language": {	
							"info": "Total de registros : <b>_MAX_</b>",
							"infoEmpty": "",
							"infoFiltered": "",
							"search": "<span class='c-lista-ped'>Lista de Planificaciones</span><i class='search-icon'></i>",
							"searchPlaceholder": "Buscar por año....",
							"paginate": {
								"first": "<<",
								"last": ">>",
								"next": ">",
								"previous": "<"
							}
						},
		"ajax": {
				"url": "http://"+ip+"/planesAnuales",
				"dataSrc": ""
			  },
		 "columns": [
			{ data: "id" },
            { data: "creadoPor" },
            { data: "fechaCreacion" },
            { data: "periodoDescripcion" },
            { 
				data: "id",
				"render": function (data, type, row, meta) {
                    if (type === 'display') {
                        data = row.programas.length
                    }
                    return data;
                }			
			},
            { 
				data: "id",
				"render": function (data, type, row, meta) {
                    if (type === 'display') {
                        data = ""
                    }
                    return data;
                }			
			},
		 ],
		 "columnDefs": [            
            {
                "targets": -1,
                "className": "text-center"
            }
		]
		});
		
		$('#addProceso').click(function(){
			if($('#txtProceso').val()==''){
				alert('Ingrese Proceso');
				return false;
			}
			if($('#txtPrioridad').val()==''){
				alert('Ingrese Prioridad');
				return false;
			}
			if($('#txtDuracion').val()==''){
				alert('Ingrese Duración');
				return false;
			}
			
			var objTemp={
				procesoId: $('#txtProceso').val(),
				nombred: $( "#txtProceso option:selected" ).text(),
				seleccionado: true,
				prioridad: $('#txtPrioridad').val(),
				duracion: $('#txtDuracion').val()
			}
			
			listadoProcesos.push(objTemp);
			
			$('#listaProceso tbody').html('');
			var cadena="";
			 $.each(listadoProcesos,function(index, item){
				 cadena=cadena+"<tr>";
				 cadena=cadena+'<td>'+item.nombred+'</td>';
				 cadena=cadena+'<td>'+item.prioridad+'</td>';
				 cadena=cadena+'<td>'+item.duracion+'</td>';
				 cadena=cadena+'<td class="text-center"></td>';
				 cadena=cadena+"</tr>";
			 })			 
			 $('#listaProceso tbody').html(cadena)
		})
		
		$('#popupGenerar').click(function(){
			debugger;
				$('#code').modal('show');
				$('#listaProceso tbody').html('');
				listadoProcesos=[];
				$.ajax({
				type:"GET",
				url: "http://"+ip+"/planesAnuales/init",
				dataType: "json",
				success: function(xvr){
					debugger;
					if(xvr!=undefined){
						$('#textPeriodo').val(xvr.periodo);
						$('#textFecCre').val(xvr.fechaCreacion);
						$('#textGenPor').val(xvr.creadoPor);
						if(xvr.procesos.length>0){
							var std = "";
							$('#listaProceso tbody').html('');
							var cadena="";
							$.each(xvr.procesos,function(index, item){
								cadena=cadena+"<tr>";
								cadena=cadena+'<td id-proceso="'+item.procesoId+'">'+item.nombre+'</td>';
								cadena=cadena+'<td><select type="text" id="txtPrioridad" class="form-control" ><option>Alta</option><option>Media</option>	<option>Baja</option></select></td>';
								cadena=cadena+'<td><input type="number" id="txtDuracion" min="10" max="100" step="1" value="30" class="form-control" ></td>';
								cadena=cadena+'<td class="text-center"></td>';
								cadena=cadena+"</tr>";
							})			 
							$('#listaProceso tbody').html(cadena)

							var cadena="";
							$.each(xvr.procesos,function(index, item){
								cadena=cadena+'<option texto="'+item.procesoId+'" value="'+item.procesoId+'">'+item.nombre+'</option>';
							})
							$('.browsers').html(cadena)
						}
					}
					
				},
				error: function(){
					
				}
			})

			
		});
		
		$('#btnGenerarF').click(function(){
			debugger;
			$.each($('#listaProceso tbody tr'),function (index,item) {
				debugger;
				var td = $($(item)[0]).html();

				var objTemp={
					procesoId: $(item).children()[0].getAttribute('id-proceso'),
					nombred: $(item).children()[0].innerHTML,
					seleccionado: true,
					prioridad: $($(item).children()[1]).find('#txtPrioridad').val(),
					duracion: $($(item).children()[2]).find('input').val()
				}
				
				listadoProcesos.push(objTemp);
			})

			if(listadoProcesos.length==0){
					alert('Debe seleccionar algún proceso.');
					return false;
			}
			
			var tempObj={				
				periodo:anio,
				actareunion:inicial.actareunion,
				procesos:listadoProcesos
			}
			
			var jsontext=JSON.stringify(tempObj);
			$.ajax({
					 type:"POST",
					 url: "http://"+ip+"/planesAnuales",
					 dataType: "json",
					 contentType: "application/json; charset=utf-8",
					 data: jsontext,
					 success: function(xvr){
						 debugger;
						 var cadena2="";
						 var temobj=[];
						 console.log(JSON.stringify(xvr))
						 $('#example').DataTable().ajax.reload();
						 $('#code').modal('hide');
						 if(xvr.programas!=undefined){
							 if(xvr.programas.length>0){
								
								temobj.push([{text: 'Proceso', style: 'tableHeader'}, {text: 'Prioridad', style: 'tableHeader'}, {text: 'Duración', style: 'tableHeader'}, {text: 'Días', style: 'tableHeader'}, {text: 'Auditor', style: 'tableHeader'}]);
								 $.each(xvr.programas,function(index,item){
									//cadena2=cadena2+"['"+item.proceso.descripcion+"','"+item.prioridad+"','"+item.proceso.fechaInicio+"-"+item.proceso.fechaFin+"','"+item.duracion+"'],";
									//var objet=[item.proceso.descripcion,item.prioridad,item.fechaInicio+" / "+item.fechaFin,item.duracion.toString(),item.programaAuditores[0].empleado.nombres +" "+ item.programaAuditores[0].empleado.apellidos];
									var objet=[item.proceso.descripcion,item.prioridad,item.fechaInicio+" / "+item.fechaFin,item.duracion.toString(),item.auditor.nombres +" "+ item.auditor.apellidos];
									temobj.push(objet);
								 })

							 }
						 }
						 generarPDFO(xvr.creadoPor,xvr.fechaCreacionDescripcion,xvr.periodoDescripcion,xvr.periodo,temobj);
					 },
					 error: function(err){
						 alert(err)
						 $('#example').DataTable().ajax.reload();
						 $('#code').modal('hide');
						 generarPDFO('','','',[]);
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
