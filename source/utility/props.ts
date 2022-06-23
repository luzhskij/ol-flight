
//export interface ClassNameProps{}

const ClassNameObject = ( prefix: string, a: {} ) => {

	let string = "";

	for( let key in a ){

		if( !a[ key ] )
			continue;

		string += " " + prefix + "-" + key;
	};

	return string;
};

export namespace Props{
	export const className = ( a1: string, ...args: any[] ) => {

		let name = a1 ? a1 : "";

		for( const a of args ){

			if( a && typeof a == "object" ){
				name += ClassNameObject( a1, a );
			}else if( a ){
				name += " " + a;
			};

		};

		return name;
	}
};