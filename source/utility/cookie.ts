import Common from "./common";

export default class Cookie{
	public static set( name : string, value : string, expires: number ){
		document.cookie = name + "=" + encodeURIComponent( value || "" ) +
			(expires ? ("; expires=" + new Date( new Date().getTime() + (1000 * 86400 * expires) )) : "" ) + "; path=/";
	};
	public static parse( value: string ){

		let object : {[ key: string ]: any } = {};

		value = Common.string( value ).trim();

		if( !value || value.length > 4000 )
			return object;

		value = "; " + value + "; ";

		let poss;
		let n = 0;
		let cut = "";
		let array: any = [];

		while( true ){

			poss = value.search( /[^\\];/ );

			if( n > 30 || poss < 0 )
				break;

			poss++;
			cut = value.slice( 2, poss );
			value = value.slice( poss );
			array = cut.split( /=(.*)?/, 2 );

			if( array && array[ 0 ] && array[ 0 ].match( /^[a-zA-Z0-9_]+$/ ) ){
				array[ 1 ] = (array[ 1 ] || "").trim();
				if( (array[ 0 ].length + array[ 1 ].length) < 3968 )
					object[ <string>(array[ 0 ]) ] = decodeURIComponent( array[ 1 ] );
			}

			n++;
		};

		return object;
	};
}