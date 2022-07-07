import React, { useRef, useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { AdditionLayer, AdditionLayerToolsGeometry } from "@layers/addition"

import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import "@styles/app"

import ol, { Feature } from 'ol'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { transform } from 'ol/proj'
import { Overlay } from 'ol'
import { Coordinate, toStringXY } from 'ol/coordinate';
import LayerSwitcher from 'ol-layerswitcher'

export const App = ( props: any ) => {

	const [ map, setMap ] = useState<any>( null );
	const [ tooltip, setTooltip ] = useState<any>({ 
		visible: false,
		coord: [ 0, 0 ],
		params: {
			id: -1
		}
	});
	const [ selectedCoord , setSelectedCoord ] = useState<Coordinate>( [ 0, 0 ] as Coordinate );
	const [ additionLayer, setAdditionLayer ] = useState<any>( null );

	const mapElement = useRef<any>( null );
	const tooltipElement = useRef<any>( null );

	const displayTooltip = ( event ) => {

		//const clickedCoord = map.getCoordinateFromPixel( event.pixel );
		//const transormedCoord = transform( clickedCoord, "EPSG:3857", "EPSG:4326" );
		//setSelectedCoord( transormedCoord );

		let pixel = event.pixel;
		let same = false;
		let t: any[] = [];
		let feature = map.forEachFeatureAtPixel( pixel, ( g ) => {

			if( tooltip.feature && (g.getId() == tooltip.feature.getId()) )
				same = true;

			t.push( g.getId() );	

			return g;
		});	

		if( feature && !feature.get( "tool" ) )
			feature = null;

		if( !feature ){

			if( !tooltip.feature )
				return;

			feature = tooltip.feature;	

			const key = feature.get( "key" );
			const source = feature.get( "source" );
			const data: any = source.__featuresData[ key ];		

			if( data.dragging )
				return;

			data.expanded = false;
			feature.setGeometry( AdditionLayerToolsGeometry( data, map ) );	

			setTooltip({
				visible: false,
				feature: null,
				coord: [ 0, 0 ],
				params: { id: -1 }
			});			

			return;
		};	

		//console.log( same, t, tooltip.feature ? tooltip.feature.getId() : -1  );	

		if( tooltip.feature && same )
			return;

		//if( (feature.getId() == tooltip.params.id) )
		//	return;	

		let params = feature ? {
			id: feature.getId(),
			name: feature.get( "name" ),
			rotation: feature.get( "rotation" ),
			longitude: feature.get( "longitude" ),
			latitude: feature.get( "latitude" ),
			velocity: feature.get( "velocity" )
		} : tooltip.params;

		const key = feature.get( "key" );
		const source = feature.get( "source" );
		const data: any = source.__featuresData[ key ];		
		data.expanded = true;
		data.zIndex = (data.zIndex || 0) + 1;
		console.log( data.zIndex );
		feature.setGeometry( AdditionLayerToolsGeometry( data, map ) );	

		setTooltip({
			visible: !!feature,
			feature: feature,
			coord: [ pixel[ 0 ], pixel[ 1 ] ],
			params: params
		});
	};

	useEffect(() => {

		const layerSwitcher = new LayerSwitcher({
			reverse: true,
			groupSelectStyle: 'group'
		});

		const initialMap = new Map({
			target: mapElement.current || undefined,
			layers: [],
			view: new View({
				projection: "EPSG:3857",
				center: transform([ 37.6, 55.77 ], "EPSG:4326", "EPSG:3857" ),
				zoom: 10
			}),
			controls: [ layerSwitcher ]
		});
		let layers: any[] = [
			new TileLayer({
				title: "world",
				type: "base",
				source: new XYZ({
					url: "http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}",
				})
			} as any),
			AdditionLayer( initialMap )
		];		

		for( const item of layers ){
			initialMap.addLayer( item );
		};
		
		setMap( initialMap );
		setAdditionLayer( layers[ 1 ] );
	}, []);

	//#Events
	useEffect(() => {

		if( !map )
			return;

		map.on( "pointermove", displayTooltip );

		return () => {
			map.un( "pointermove", displayTooltip );
		};
	}, [ map, tooltip ]);
	//^

	//#Auto refresh
	useEffect(() => {

		if( !additionLayer )
			return;
		
		let interval = setInterval(() => {
			additionLayer.refreshLayers();
		}, 5500 );

		return () => {
			clearInterval( interval );
		};
	}, [ additionLayer ]);
	//^
	//#Tooltip Auto-follow
	useEffect(() => {

		let interval = setInterval(() => {
			
			const feature: Feature | null = tooltip.feature;

			if( !feature )
				return;

			let params = feature ? {
				id: feature.getId(),
				name: feature.get( "name" ),
				rotation: feature.get( "rotation" ),
				longitude: feature.get( "longitude" ),
				latitude: feature.get( "latitude" ),
				velocity: feature.get( "velocity" )
			} : tooltip.params;

			const key = feature.get( "key" );
			const source = feature.get( "source" );
			const data: any = source.__featuresData[ key ];
			
			var coordinate = data.center;
			var pixel = map.getPixelFromCoordinate( coordinate );
		
			setTooltip({
				visible: !!feature,
				feature: feature,
				coord: [ pixel[ 0 ], pixel[ 1 ] ],
				params: params
			});

		}, 4 );

		return () => {
			clearInterval( interval );
		};
	}, [ tooltip.feature ]);
	//^	

	//console.log( tooltip.coord, tooltip.visible );

	return (
		<div className="app">
			<div ref={ tooltipElement } className="map-tooltip" 
				style={{ 
					display: tooltip.visible ? "block" : "none",
					left: (tooltip.coord[ 0 ] + "px"),
					top: (tooltip.coord[ 1 ] + "px"),
				}}
			>
				<div>
					<p>name: </p>
					<p>{ tooltip.params.name }</p>
				</div>	
				<div>
					<p>longitude: </p>
					<p>{ tooltip.params.longitude }</p>
				</div>				
				<div>
					<p>latitude: </p>
					<p>{ tooltip.params.latitude }</p>
				</div>
				<div>
					<p>velocity: </p>
					<p>{ tooltip.params.velocity }</p>
				</div>
				<div>
					<button onClick={() => console.log( 555 ) }>{ "Expand" }</button>
				</div>		
			</div>
			<div ref={ mapElement } className="map"></div>
			<div className="map-coord">
				{ (selectedCoord) ? toStringXY( selectedCoord, 5 ) : '' }
			</div>
		</div>
	);
};