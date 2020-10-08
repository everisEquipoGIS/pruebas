
/**********************************************************
 * PLUGIN PLG_HOR_NAVIGATION
 **********************************************************/

const barraNavegacion = new M.plugin.PLG_Hor_Navigation({
    "measureLength": true,
    "measureArea": true,
    "geocalc": false,
    "identify": {
      "all": false
    },
    "catastroSearch": {
      "add": false,
      "config": null
    },
    "scale": {
      "add": true,
      "config": {
      "scales": [1000, 2500, 5000, 10000, 20000, 25000, 50000, 100000, 150000, 250000, 500000, 1000000]
      }							
    },
    "coordinatesZoom": true,
    "addControls": {
      "add": false,
      "controls": []
    }
  });
map.addPlugin(barraNavegacion);


/**********************************************************
 * PLUGIN ATTRIBUTIONS
 **********************************************************/

var paramsAttributions = {
    params: {
        includeRequired: true,
        attributions: [
            "TXT*Incendio de Huelva 2020", [
                `HTML*<div id="logo">
           <h1 class="d-flex align-items-center">
              <a href="https://www.juntadeandalucia.es/index.html" class="logotipo">
                 <img class="logomini" src="https://www.juntadeandalucia.es/themes/images/logo-junta.png" alt="Portal de la Junta de Andalucía">
              </a>
              <a class="sublogo agriculturaganaderiapescaydesarrollosostenible" href="https://www.juntadeandalucia.es/organismos/agriculturaganaderiapescaydesarrollosostenible">
                 <img src="https://www.juntadeandalucia.es/themes/images/banner/organismo/agriculturaganaderiapescaydesarrollosostenible.png" alt="Agricultura, Ganadería, Pesca y Desarrollo Sostenible">
              </a>
              <a class="secretariaGeneral" href="https://www.juntadeandalucia.es/organismos/agriculturaganaderiapescaydesarrollosostenible/consejeria/sgmaacc.html">
              <p id="text_secretariaGneral">Secretaría General de Medio Ambiente, Agua y Cambio Climático</p>
              </a>`
            ]
        ]
    },
    options: {
        panel: {
            className: 'clasePrivada',
            collapsedClass: 'g-cartografia-ayuda',
            tooltip: 'Panel Attributions'
        }
    }
};
map.addPlugin(new M.plugin.Attributions(paramsAttributions));


/**********************************************************
 * PLUGIN COMUNICACIÓN CON CATASTRO
 **********************************************************/

  var comunicacion = new M.plugin.PLG_Comunicacion_Catastro(
    {
        config: {
            RCCOOR_url: "https://ovc.catastro.meh.es/ovcservweb/OVCSWLocalizacionRC/OVCCoordenadas.asmx/Consulta_RCCOOR",
            CMC_url: "https://ovc.catastro.meh.es/ovcservweb/OVCSWLocalizacionRC/OVCCallejeroCodigos.asmx/ConsultaMunicipioCodigos",
            ConsultaVia_url: "https://ovc.catastro.meh.es/ovcservweb/ovcswlocalizacionrc/ovccallejero.asmx/ConsultaVia",
            ConsultaNumero_url: "https://ovc.catastro.meh.es/ovcservweb/ovcswlocalizacionrc/ovccallejero.asmx/ConsultaNumero",
            DNPRC_CODIGOS_url: "https://ovc.catastro.meh.es/ovcservweb/OVCSWLocalizacionRC/OVCCallejeroCodigos.asmx/Consulta_DNPRC_Codigos",
            DNPRC_url: "https://ovc.catastro.meh.es/ovcservweb/OVCSWLocalizacionRC/ovccallejero.asmx/Consulta_DNPRC",
            CPMRC_url: "https://ovc.catastro.meh.es/ovcservweb/OVCSWLocalizacionRC/OVCCoordenadas.asmx/Consulta_CPMRC",
            DNPPP_url: "https://ovc.catastro.meh.es/ovcservweb/OVCSWLocalizacionRC/OVCCallejeroCodigos.asmx/Consulta_DNPPP_Codigos",
            RCWMS_url: "https://www1.sedecatastro.gob.es/CYCBienInmueble/OVCConCiud.aspx", //?del=41&mun=38&UrbRus=U&RefC=41038A036001890000HT
            DNPLOC_url: "https://ovc.catastro.meh.es/ovcservweb/ovcswlocalizacionrc/ovccallejero.asmx/Consulta_DNPLOC",
            catastroWMS: {
                wms_url: "https://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?",
                name: "Catastro"
            },
            catastroWFS: {
              wfs_url: 'https://ovc.catastro.meh.es/INSPIRE/wfsCP.aspx?',
              name: 'cp.cadastralparcel'
            },
            descargaGML: 'https://ovc.catastro.meh.es/INSPIRE/wfsCP.aspx?service=wfs&version=2&request=GetFeature&STOREDQUERIE_ID=GetParcel&srsname=EPSG::25830&outputFormat=geojson&refcat=',
            imagenParcela: 'https://www1.sedecatastro.gob.es/Cartografia/GeneraGraficoParcela.aspx?',
            imagenFachada: 'https://ovc.catastro.meh.es/OVCServWeb/OVCWcfLibres/OVCFotoFachada.svc/RecuperarFotoFachadaGet?ReferenciaCatastral=',
            visorPDF: 'https://docs.google.com/viewer?embedded=true&url=',
            consultaDescriptivaPDF: 'https://www1.sedecatastro.gob.es/CYCBienInmueble/SECImprimirCroquisYDatos.aspx?refcat='
        }
    }
);
map.addPlugin(comunicacion);


/**********************************************************
 * PLUGIN MANAGE LAYERS
 **********************************************************/
 
var configGroups = [];

/* Se añade grupo Datos Interés Incendios */
    configGroups.push({
        title: "Datos Interés Incendios",
        description: "Datos Interés Incendios",
        overlays: [
            new M.layer.WMS({
                url: 'http://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_Montes_Publicos_Andalucia?',
                name: 'montes',
                legend: 'Montes Públicos de Andalucía',
                transparent: true,
                tiled: false
            }),
            new M.layer.WMS({
                url: 'http://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_riesgo_historico_incendio',
                name: 'REDIAM',
                legend: 'REDIAM. WMS Riesgo histórico Incendio. 2016',
                transparent: true,
                tiled: false
            }),
            new M.layer.WMS({
                url: 'http://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_equipamientos_incendios_2020?',
                name: 'REDIAM',
                legend: 'REDIAM. WMS Equipamientos contra incendios en Andalucía año 2020',
                transparent: true,
                tiled: false
            }),
            new M.layer.WMS({
                url: 'http://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_distrib_formaciones_adehesadas_SIOSEA_2005',
                name: 'REDIAM',
                legend: 'REDIAM. WMS Distribución de las formaciones adehesadas en Andalucía extraídas a partir de la base cartográfica de SIOSE Andalucía',
                transparent: true,
                tiled: false
            }),
            new M.layer.WMS({
                url: 'http://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_riesgo_meteorologico_incendios',
                name: 'REDIAM',
                legend: 'REDIAM. WMS Riesgo Meteorológico de Incendios. 2016',
                transparent: true,
                tiled: false
            }),
            new M.layer.WMS({
                url: 'http://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_perimetros_incendios_forestales',
                name: 'REDIAM',
                legend: 'REDIAM. WMS Perímetros de Incendios Forestales en Andalucía. 2008-2019',
                transparent: true,
                tiled: false
            }),
            new M.layer.WMS({
                url: 'http://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_zona_peligro_incendios_forestales',
                name: 'REDIAM',
                legend: 'REDIAM. WMS Zonas de Peligro de Incendio en Andalucía',
                transparent: true,
                tiled: false
            }),
            new M.layer.WMS({
                url: 'http://ovc.catastro.meh.es/cartografia/INSPIRE/spadgcwms.aspx',
                name: 'CP.CadastralParcel',
                legend: 'AdministrativeBoundary/AdministrativeUnit/BuildingPart/Building/Address/CadastralZoning/CadastralParcel',
                transparent: true,
                tiled: false
            }),
            new M.layer.WMS({
                url: 'http://www.ideandalucia.es/wms/mta100v_2005?LAYERS=Nucleos_de_Poblacion',
                name: 'Mapa Topográfico de Andalucía 1:100000 Vectorial',
                legend: 'IDEAndalucia MTA100v',
                transparent: true,
                tiled: false
            }),
            new M.layer.WMS({
                url: 'http://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_indice_vulnerab_incendios_forestales',
                name: 'REDIAM',
                legend: 'REDIAM. WMS Índices de vulnerabilidad frente a incendios forestales en Andalucía: año 2006',
                transparent: true,
                tiled: false
            }),
            new M.layer.WMS({
                url: 'http://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_indice_riesgo_incencio_forestal_2006',
                name: 'REDIAM',
                legend: 'REDIAM. WMS Índices de riesgo por incendio forestal en Andalucía: año 2006',
                transparent: true,
                tiled: false
            }),
            new M.layer.WMS({
                url: 'http://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_mapa_pendientes_incendio_penuelas_2018',
                name: 'REDIAM',
                legend: 'REDIAM. WMS Mapa de Pendientes de 1m, 2018. Incendio de Las Peñuelas, Moguer (Huelva)',
                transparent: true,
                tiled: false
            }),
            new M.layer.WMS({
                url: 'http://www.ideandalucia.es/wms/urbana500',
                name: 'Urbana_500',
                legend: 'Cartografía Urbana 1:500',
                transparent: true,
                tiled: false
            }),
            new M.layer.WMS({
                url: 'https://www.ideandalucia.es/wms/sombras_siose?LAYERS=sombras_siose_continuo',
                name: 'sombras_siose',
                legend: 'IDEAndalucía Fondo Orográfico SIOSE',
                transparent: true,
                tiled: false
            }),
            new M.layer.WMS({
                url: 'http://www.cma.junta-andalucia.es/medioambiente/mapwms/REDIAM_mde_andalucia',
                name: 'REDIAM. WMS Modelo Digital de Elevaciones (MDE) de Andalucía',
                legend: 'REDIAM. WMS Modelo Digital de Elevaciones (MDE) de Andalucía',
                transparent: true,
                tiled: false
            }),
            new M.layer.WMS({
                url: 'http://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_zonas_inundables_Andalucia',
                name: 'REDIAM',
                legend: 'REDIAM. WMS Zonas inundables de Andalucía',
                transparent: true,
                tiled: false
            }),new M.layer.WFS({
  							url: "http://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_WFS_sipna_os_actual",
  							name: "ms:sipna_os",
  							legend: "SIPNA OS ACTUAL. WFS",
  							geometry: 'POLYGON'
						})
        ]
    });

/** Se añade grupo Equipamientos contra incendios **/
    configGroups.push({
        title: "Equipamientos contra incendios",
        description: "Conjunto de capas que permiten la generación de un mapa de Andalucía básico",
        overlays: [
			 new M.layer.WMS({
                url: 'http://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_equipamientos_incendios_2020?',
                name: 'Torres_de_Vigilancia',
                legend: 'Torres de vigilancia',
                version: '1.1.1',
                transparent: true,
                tiled: true
            }),
			 new M.layer.WMS({
                url: 'http://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_equipamientos_incendios_2020?',
                name: 'Cedefos_Bases_Pistas',
                legend: 'Cedefos, Bases y Pistas',
                version: '1.1.1',
                transparent: true,
                tiled: true
            }),
			
			 new M.layer.WMS({
                url: 'http://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_equipamientos_incendios_2020?',
                name: 'Veh%C3%ADculos_contra_incendios',
                legend: 'Vehiculos Contra Incendios',
                version: '1.1.1',
                transparent: true,
                tiled: true
            }) ,
			 
			
			new M.layer.WFS({
                url: 'http://servintegra.cma.junta-andalucia.es/medioambiente/mapwms/REDIAM_wfs_instalaciones?',
                name: 'ms:equipamientos_incendios',
                legend: 'Equipamientos contra incendios', 
				geometry: 'POINT' 
            }) ,
			 
			new M.layer.WMS({
                url: 'http://www.ideandalucia.es/services/DERA_g3_hidrografia/wms?',
                name: '03_06_Embalse',
                legend: 'Embalses',
                version: '1.1.1',
                transparent: true,
                tiled: true
            })  
			
        ]
    }); 

/** Se añade grupo Datos de referencia **/
  configGroups.push({
        title: "Datos de referencia",
        description: "Conjunto de capas que permiten la generación de un mapa de Andalucía básico",
        overlays: [
 						new M.layer.WMS({
                url: 'https://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?',
                name: 'Catastro',
                legend: 'Catastro publicada por la dirección general de Catastro',
                version: '1.1.1',
                transparent: true,
                tiled: true
            }),
             new M.layer.WMS({
                url: 'https://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_RENPA?',
                name: 'eennpp',
                legend: 'Espacios Naturales Protegidos',
                version: '1.1.1',
                transparent: true,
                tiled: true
            }),
            new M.layer.WMS({
                url: 'https://www.callejerodeandalucia.es/servicios/cdau/wms?',
                name: 'CDAU_wms',
                legend: 'Vias y Portales CDAU',
                version: '1.1.1',
                transparent: true,
                tiled: true
            }),
            new M.layer.WMS({
                url: 'http://www.ideandalucia.es/services/DERA_g1_relieve/wms?',
                name: 'g01_03_CurvaNivel',
                legend: 'Curvas de Nivel',
                version: '1.1.1',
                transparent: true,
                tiled: true
            }) 
        ]		
		  });

    /** Se añade grupo Mapas topográficos **/
    configGroups.push({
        title: "Mapas topográficos",
        description: "Mapas topográficos de Andalucía",
        overlays: [		
		 				new M.layer.WMS({
                url: 'http://www.juntadeandalucia.es/institutodeestadisticaycartografia/geoserver-ieca/bca/wms?',
                name: '12 Textos Infraestructuras Geográficas/12 Infraestructuras Geográficas/11 Textos Infraestructuras MedioAmbientales/11 Infraestructuras Medio Ambientales/10 Infraestructuras Hidraúlicas/09 Textos Infraestructuras Energéticas y Telecomunicaciones/09 Infraestructuras Energéticas y de Telecomunicaciones/08 Textos Infraestructuras Transportes/08 Infraestructuras de Transportes/07 Textos Servicios/07 Servicios/06 Textos Sistema Urbano/06 Sistema Urbano/05 Textos Red Viaria/05 Red Viaria/04 Textos Cubierta Terrestre/04 Cubierta Terrestre/03 Textos Red Hidrográfica/03 Red Hidrográfica/02 Textos Relieve/02 Relieve/01 Textos de la Base Cartográfica de Andalucía/01 Cartografía Base Cartográfica de Andalucía/00 Base Cartográfica de Andalucía',
                legend: 'Base Cartográfica de Andalucía 1:10.000',
                transparent: true,
                tiled: true
            }),
            new M.layer.WMS({
                url: 'https://www.ideandalucia.es/wms/mta10r_2001-2013?',
                name: 'mta10r_2001-2013',
                legend: 'Topográfico 1:10000 (raster)',
                transparent: true,
                tiled: true
            }),
            new M.layer.WMS({
                url: 'https://www.ideandalucia.es/wms/mta10v_2007?',
                name: 'mta10v_2007',
                legend: 'Topográfico 1:10000 (vectorial)',
                transparent: true,
                tiled: true
            })
        ]
    });

    /** Se añade grupo Mapas temáticos **/
    configGroups.push({
        title: "Mapas temáticos",
        description: "Mapas temáticos de Andalucía",
        overlays: [
            new M.layer.WMS({
                url: 'https://www.ideandalucia.es/services/mta400v_2016/wms',
                name: 'mta400v_2016',
                legend: 'Topográfico 400.000 (vectorial)',
                transparent: true,
                tiled: true
            }),
            new M.layer.WMS({
                url: 'https://www.ideandalucia.es/wms/mta100v_2005',
                name: 'Mapa Topográfico de Andalucía 1:100000 Vectorial',
                legend: 'Topográfico 100.000 (vectorial)',
                transparent: true,
                tiled: true
            }),
            new M.layer.WMS({
                url: 'https://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_siose_2013_explot?',
                name: 'REDIAM',
                legend: 'Explotación de la información del Proyecto SIOSE-Andalucia 2013',
                transparent: true,
                tiled: true
            }),
            new M.layer.WMS({
                url: 'https://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_Biodiversidad_Andalucia?',
                name: 'REDIAM',
                legend: 'Mapa de Biodiversidad de Andalucía',
                transparent: true,
                tiled: true
            })
        ]
    });

    /** Se añade grupo Mapas estadísticos **/
    configGroups.push({
        title: "Mapas estadísticos",
        description: "Mapas con información estadística de Andalucía",
        overlays: [
            new M.layer.WMS({
                url: 'https://www.juntadeandalucia.es/institutodeestadisticaycartografia/geoserver-ieca/gridpob/wms?',
                name: 'gridpob_250',
                legend: 'Población en Andalucía',
                transparent: true,
                tiled: true
            })  
        ]
    });
    
 const paramsPlugin = {
  options: {
    panel: {
      className: "manageLayersIncendio",
      collapsedClass: "g-cartografia-capas2",
      tooltip: "Gestión de capas"
    }
  },
  config: {
    thematicLayers: {
      params: {
        groups: configGroups
      },
      options: {
        iconClass: "g-cartografia-capas",
        tooltip: "Capas temáticas"
      }
    },
    baseLayers: {
      params: {
        baseMaps: [],
        activatedBlankMap: true
      },
      options: {
        tooltip: "Capas de fondo"
      }
    }
  }
};

const manageLayers = new M.plugin.ManageLayers(paramsPlugin);
map.addPlugin(manageLayers);