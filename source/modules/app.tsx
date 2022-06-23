import React, { useRef, useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { AdditionLayer } from "@layers/addition"

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
		params: {}
	});
	const [ selectedCoord , setSelectedCoord ] = useState<Coordinate>( [ 0, 0 ] as Coordinate );
	const [ additionLayer, setAdditionLayer ] = useState<any>( null );

	const mapElement = useRef<any>( null );
	const tooltipElement = useRef<any>( null );

	const displayTooltip = ( event ) => {

		const clickedCoord = map.getCoordinateFromPixel( event.pixel );
		const transormedCoord = transform( clickedCoord, "EPSG:3857", "EPSG:4326" );
		setSelectedCoord( transormedCoord );

		var pixel = event.pixel;
		var feature = map.forEachFeatureAtPixel( pixel, ( feature ) => {
			return feature;
		});	

		if( feature && !feature.get( "tool" ) )
			feature = null;

		let params = feature ? {
			name: feature.get( "name" ),
			rotation: feature.get( "rotation" ),
			longitude: feature.get( "longitude" ),
			latitude: feature.get( "latitude" ),
			velocity: feature.get( "velocity" )
		} : tooltip.params;

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

		map.on( "click", displayTooltip );

		return () => {
			map.un( "click", displayTooltip );
		};
	}, [ map ]);
	//^

	//#Auto refresh
	useEffect(() => {

		if( !additionLayer )
			return;
		
		let interval = setInterval(() => {
			additionLayer.refreshLayers();
		}, 2000 );

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
				name: feature.get( "name" ),
				rotation: feature.get( "rotation" ),
				longitude: feature.get( "longitude" ),
				latitude: feature.get( "latitude" ),
				velocity: feature.get( "velocity" )
			} : tooltip.params;
			var coordinate = feature.get( "shiftedCoord" );
			var pixel = map.getPixelFromCoordinate( coordinate );
		
			setTooltip({
				visible: !!feature,
				feature: feature,
				coord: [ pixel[ 0 ], pixel[ 1 ] ],
				params: params
			});

		}, 1 );

		return () => {
			clearInterval( interval );
		};
	}, [ tooltip.feature ]);
	//^	

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
			</div>
			<div ref={ mapElement } className="map"></div>
			<div className="map-coord">
				{ (selectedCoord) ? toStringXY( selectedCoord, 5 ) : '' }
			</div>
		</div>
	);
};