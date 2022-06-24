import ol from 'ol'
import Map from 'ol/Map'
import { Group, Vector } from 'ol/layer'
import * as OLSource from 'ol/source'
import * as OLFormat from 'ol/format'
import * as OLStyle from 'ol/style'
import * as OLStrategy from 'ol/loadingstrategy'
import * as OLGeometry from 'ol/geom'
import * as OLInteraction from 'ol/interaction'
import { Collection } from 'ol'
import Feature, * as OLFeature from 'ol/Feature'
import { transform, transformExtent } from 'ol/proj'
import {
	Pointer as PointerInteraction,
	defaults as defaultInteractions,
  } from 'ol/interaction';


const AdditionLayerStyle = ( feature ) => {

	//console.log( feature );

	let style = new OLStyle.Style({
		image: new OLStyle.Icon({
			anchor: [ 0.5, 0.5 ],
			anchorXUnits: "fraction",
			anchorYUnits: "fraction",
			rotation: feature.get( "rotation" ),
			src: "./assets/images/air_0.png",
		})		
	});

	return [ style ];
};
const AdditionLayerToolsStyle = ( feature, resolution ) => {

	let geometries = feature.getGeometry().getGeometries();
	const poly = geometries[ 0 ];
	const line = geometries[ 1 ];
	let radius = 10000.0;
	const scale = 100.0 / resolution;
	//console.log( scale, resolution );

	let text: string = feature.get( "n" ) + "\n" + feature.get( "name" );

	let polyStyle = new OLStyle.Style({
		fill: new OLStyle.Fill({
			//color: "#cbe7ff9c"
			//color: "#cbe7ffd1"
			color: "#00000001"
		}),
		stroke: new OLStyle.Stroke({
			//color: "#67c8ff",
			//width: 3
			color: "#00000001",
			width: 1
		}),
		text: new OLStyle.Text({
			font: 'bold 15px "Tahoma", "Open Sans", "Arial Unicode MS", "sans-serif"',
			placement: "point",
			textAlign: "left",
			//fill: new OLStyle.Fill({ color: "#5fc5ff" }),
			//stroke: new OLStyle.Stroke({ color: "#00000099", width: 2 }),
			fill: new OLStyle.Fill({ color: "#000" }),
			stroke: new OLStyle.Stroke({ color: "#fff", width: 2 }),
			text: text,
			offsetX: -42,
			offsetY: 1,
			rotation: 0
		}),
		geometry: poly
	});
	let lineStyle = new OLStyle.Style({
		fill: new OLStyle.Fill({
			color: "#67c8ff"
		}),
		stroke: new OLStyle.Stroke({
			color: "#67c8ff", width: 3
		}),
		geometry: line
	});

	return [ polyStyle, lineStyle ];
};

const AdditionLayerToolsGeometry = ( data, coord, map: Map ) => {

	var resolution = map.getView().getResolution();
	let scale: number = (resolution || 1.0) / 100.0;
	let radius = 10000.0 * scale;
	let radiusY = 4000.0 * scale;
	let halfRadius = radius / 2.0;
	let halfRadiusY = radiusY / 2.0;
	let paddingTop = (radius / 2.0) * 0.7;
	let paddingLeft = (radiusY / 2.0) * 0.7;
	let collection = new OLGeometry.GeometryCollection();
	let center = [ 
		coord[ 0 ] + paddingLeft + halfRadius,  
		coord[ 1 ] + paddingTop + halfRadiusY
	];

	//console.log( radius, resolution );

	collection.setGeometries([ 
		new OLGeometry.Polygon([
			[
				[ coord[ 0 ] + paddingLeft, coord[ 1 ] + paddingTop ],
				[ coord[ 0 ] + radius + paddingLeft, coord[ 1 ] + paddingTop ],
				[ coord[ 0 ] + radius + paddingLeft, coord[ 1 ] + radiusY + paddingTop ],
				[ coord[ 0 ] + paddingLeft, coord[ 1 ] + radiusY + paddingTop ]
			]
		]),
		new OLGeometry.LineString([
			center, data.initial
		]),		
	]);

	return collection;
};

const AdditionLayerLoader = ( map: Map, params, source, extent, projection ) => {

	extent = transformExtent( extent, projection, "EPSG:4326");
	let bb = "lamin=" + extent[ 1 ] 
					+ "&lomin=" + extent[ 0 ] 
					+ "&lamax=" + extent[ 3 ]
					+ "&lomax=" + extent[ 2 ];
		
	fetch( "https://opensky-network.org/api/states/all?" + bb )
	.then(( response ) => response.json() )
	.then(( response ) => {
		
		if( !response.states )
			return;

		if( response.time < params.time )
			return;
			
		params.time = response.time;	

		let features = response.states.map(( item ) => {

			let feature = source.getFeatureById( item[ 0 ] );
			const initialCoord = transform([ item[ 5 ], item[ 6 ] ], 'EPSG:4326', 'EPSG:3857');

			if( !feature )
				feature = new Feature({
					geometry: new OLGeometry.Point( initialCoord ),
				});
			feature.setId( item[ 0 ] );
			feature.set( "name", item[ 1 ] || "" );
			feature.set( "rotation", (item[ 10 ] || 0) * (Math.PI / 180.0) );
			feature.set( "longitude", (item[ 5 ] || 0) );
			feature.set( "latitude", (item[ 6 ] || 0) );
			feature.set( "velocity", (item[ 9 ] || 0) );
			feature.setStyle( AdditionLayerStyle( feature ) );
			feature.getGeometry().setCoordinates( initialCoord );
			return feature;
		});
		let toolsFeatures = response.states.map(( item ) => {
			const initialCoord = transform([ item[ 5 ], item[ 6 ] ], 'EPSG:4326', 'EPSG:3857');
			const key = (item[ 0 ] + ":tools") || "";
			let data: any = source.__featuresData[ key ];

			if( !data )
				data = source.__featuresData[ key ] = {
					delta: [ 0.0, 0.0 ]
				};

			data.initial = initialCoord;
			const shiftedCoord = [ data.initial[ 0 ] + data.delta[ 0 ], data.initial[ 1 ] + data.delta[ 1 ] ];		

			let feature: any = source.getFeatureById( key );

			if( feature )
				feature.setGeometry( AdditionLayerToolsGeometry( data, shiftedCoord, map ) );
			else
				feature = new Feature({
					geometry: AdditionLayerToolsGeometry( data, shiftedCoord, map ),
				});

			data.shiftedCoord = shiftedCoord;

			feature.setId( key );
			feature.set( "tool", true );
			feature.set( "key", key );
			feature.set( "source", source );
			feature.set( "map", map );
			feature.set( "n", item[ 0 ] || "" );
			feature.set( "name", item[ 1 ] || "" );
			feature.set( "longitude", (item[ 5 ] || 0) );
			feature.set( "latitude", (item[ 6 ] || 0) );
			feature.set( "velocity", (item[ 9 ] || 0) );
			feature.set( "shiftedCoord", shiftedCoord );
			feature.setStyle( AdditionLayerToolsStyle );
			return feature;
		});	

		let length = 0;

		source.forEachFeature(( feature ) => {
			length++;
			//source.removeFeature( feature );
		});	
		

		source.addFeatures( features );
		source.addFeatures( toolsFeatures );
		//console.log( length );

	}).catch(() => {});

};

class Drag extends PointerInteraction{
	constructor(){
		super({
			//handleDownEvent: this.handleDownEvent,
			handleUpEvent: () => {
				return false;
			},
		});
		this.feature = null;
		this.coords = [ 0, 0 ];
	};	

	feature: Feature | null;
	coords: number[];

	protected handleDownEvent( event: ol.MapBrowserEvent<any> ): boolean{
		var pixel = event.pixel;
		var feature = event.map.forEachFeatureAtPixel( pixel, ( feature ) => {
			return feature;
		});	

		(this.feature as any) = feature && feature.get( "tool" ) ? feature : null;
		this.coords = [ event.coordinate[ 0 ], event.coordinate[ 1 ] ];

		return !!this.feature;		
	};
	protected handleDragEvent( event: ol.MapBrowserEvent<any> ){

		if( !this.feature )
			return;

		const key = this.feature.get( "key" );
		const source = this.feature.get( "source" );
		const map: Map = this.feature.get( "map" );
		const collection: any = this.feature.getGeometry();
		const delta: number[] = [ event.coordinate[ 0 ] - this.coords[ 0 ], event.coordinate[ 1 ] - this.coords[ 1 ] ];
		const data: any = source.__featuresData[ key ];

		//(collection as OLGeometry.Geometry).translate( delta[ 0 ], delta[ 1 ] );
		this.coords = [ event.coordinate[ 0 ], event.coordinate[ 1 ] ];
		source.__featuresData[ key ].delta[ 0 ] += delta[ 0 ];
		source.__featuresData[ key ].delta[ 1 ] += delta[ 1 ];
		const shiftedCoord = [ data.initial[ 0 ] + data.delta[ 0 ], data.initial[ 1 ] + data.delta[ 1 ] ];	
		source.__featuresData[ key ].shiftedCoord = shiftedCoord;
		this.feature.set( "shiftedCoord", shiftedCoord );
		this.feature.setGeometry( AdditionLayerToolsGeometry( data, shiftedCoord, map ) );	
	};

};

export const AdditionLayer = ( map: Map ) => {

	let params = {
		projection: null,
		extent: [],
		time: 0
	};

    let source = new OLSource.Vector({
		loader: ( extent, resolution, projection ) => {
			params.extent = extent;
			params.projection = projection;
			AdditionLayerLoader( map, params, source, extent, projection );
		},
		strategy: OLStrategy.bbox
    } as any);
	(source as any).__featuresData = {};

	const openSky = new Vector({
		name: 'aircraft',
		title: "OpenSky States",
		source: source,
		visible: true
	} as any);	

	(openSky as any).refreshLayers = () => {
		AdditionLayerLoader( map, params, source, params.extent, params.projection );
	};

//	const group = new Group({
//		title: "hello",
//		layers: [ openSky ],
//		visible: false
//	} as any);

	map.addInteraction( new Drag() );

	let zoom = map.getView().getZoom();
	map.getView().on( "change", ( event ) => {

		let cZoom = map.getView().getZoom();

		if( zoom == cZoom )
			return;

		zoom = cZoom;	

		source.forEachFeature(( feature ) => {
			
			if( !feature.get( "tool" ) )
				return;

			const key = feature.get( "key" );
			let data: any = (source as any).__featuresData[ key ];
			const shiftedCoord = [ data.initial[ 0 ] + data.delta[ 0 ], data.initial[ 1 ] + data.delta[ 1 ] ];
			(source as any).__featuresData[ key ].shiftedCoord = shiftedCoord;	
			feature.set( "shiftedCoord", shiftedCoord );
			feature.setGeometry( AdditionLayerToolsGeometry( data, shiftedCoord, map ) );	

		});	

	});

	return openSky;
};