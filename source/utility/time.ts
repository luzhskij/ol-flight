import Common from "@utility/common";
import VMath from "@utility/vmath";

export class Time{
	public static daysInMonth( year: number, month: number ) : number{
		return 32 - new Date( year, month, 32 ).getDate();
	};
	public static daysRange( aYear: number, aMonth: number, aDay: number, bYear: number, bMonth: number, bDay: number, callback: Function ){

		let day: Date = new Date( aYear, aMonth, aDay );
		let start: number = +day;
		let end: number = +new Date( bYear, bMonth, bDay );

		while( start <= end ){
			callback( day.getFullYear(), day.getMonth(), day.getDate() );
			day.setDate( day.getDate() + 1 );
			start = +day;
		};

	};
	public static daysRangeLength( aYear: number, aMonth: number, aDay: number, bYear: number, bMonth: number, bDay: number ) : number{
		let start: number = +new Date( aYear, aMonth, aDay );
		let end: number = +new Date( bYear, bMonth, bDay );
		return (end - start) / 86400000;
	};
	public static get year() : number{
		return new Date().getFullYear();
	};
	public static toNumber( value: string ) : number{
		let array = Common.string( value ).split( /[ :]/ ) || [];
		let left: number = Common.int( array[ 0 ] );
		return left * 100 + (Common.int( array[ 1 ] ) / 60) * 100 * (array[ 0 ][ 0 ] == "-" ? -1 : 1);
	};
	public static toString( value: string | number | boolean | Date, extra?: number ) : string{

		if( value instanceof Date ){
			let string = value.getDate()
				+ " "
				+ (EnumMonthState[ value.getMonth() ].month.substr( 0, 3 ))
				+ " "
				+ (value.getFullYear().toString()).substr( 2, 2 );

			if( extra && extra > 0 ){
				string += " " + Common.paddingLeft( value.getHours().toString(), 2, "0" );
			};
			if( extra && extra > 1 ){
				string += ":" + Common.paddingLeft( value.getMinutes().toString(), 2, "0" );
			};
			if( extra && extra > 2 ){
				string += ":" + Common.paddingLeft( value.getSeconds().toString(), 2, "0" );
			};

			return string;
		};

		let array = Common.string( value ).split( /[ :]/ ) || [];
		let leftRaw = (array[ 0 ] || "").slice( 0, 2 );

		if( leftRaw[ 0 ] == "-" )
			leftRaw = (array[ 0 ] || "").slice( 0, 3 );
		let left = VMath.min( Common.int( leftRaw ), 24 );
		let leftString = Common.paddingLeft( Common.string( left ), 2, "0" );

		let rightRaw = (array[ 1 ] || "").slice( 0, 2 );
		let right = VMath.min( Common.int( rightRaw ), 60 );

		if( left == 24 )
			right = 0;

		let rightString = (rightRaw[ 0 ] === "0") ?
			Common.paddingLeft( Common.string( right ), 2, "0" )
			:
			Common.paddingRight( Common.string( right ), 2, "0" );

		return (leftRaw[ 0 ] == "-" && left == 0 ? "-" : "") + leftString + ":" + rightString;
	};
	public static timeOfDayCore( key: string ) : number{

		if( key == "d" )
			return 2;
		else if( key == "m" )
			return 3;
		else if( key == "n" )
			return 4;
		else if( key == "nc" )
			return 1;

		return 0;
	};
	public static timeOfDay( key: string, lang?: any ) : number{

		if( !lang ){

			if( key == "D" || key == "d" ){
				return 2;
			}else if( key == "M" || key == "m" ){
				return 3;
			}else if( key == "N" || key == "n" ){
				return 4;
			}else if( key == "NC" || key == "NC" ){
				return 1;
			}

			return 0;
		};

		key = (key || "").toLowerCase();
		let d = (lang.state.get( "Graph::D" ) || "").toLowerCase();
		let m = (lang.state.get( "Graph::M" ) || "").toLowerCase();
		let n = (lang.state.get( "Graph::N" ) || "").toLowerCase();
		let nc = (lang.state.get( "Graph::NC" ) || "").toLowerCase();

		if( key == d )
			return 2;
		else if( key == m )
			return 3;
		else if( key == n )
			return 4;
		else if( key == nc )
			return 1;

		return 0;

//		return {
//			"": 0,
//			"нп": 1,
//			"НП": 1,
//			"д": 2,
//			"у": 3,
//			"н": 4,
//			"Д": 2,
//			"У": 3,
//			"Н": 4
//		}[ key ] || 0
	};
	public static keyOfDay( key: string, lang: any ) : string{
		return {
			"0": "",
			"1": lang.state.get( "Graph::NC" ) || "",
			"2": lang.state.get( "Graph::D" ) || "",
			"3": lang.state.get( "Graph::M" ) || "",
			"4": lang.state.get( "Graph::N" ) || ""
		}[ key ] || ""
	}
}

export const EnumMonthState = [
	{ value: 0, month: "January", key: "January" },
	{ value: 1, month: "February", key: "February" },
	{ value: 2, month: "March", key: "March" },
	{ value: 3, month: "April", key: "April" },
	{ value: 4, month: "May", key: "May" },
	{ value: 5, month: "June", key: "June" },
	{ value: 6, month: "July", key: "July" },
	{ value: 7, month: "August", key: "August" },
	{ value: 8, month: "September", key: "September" },
	{ value: 9, month: "October", key: "October" },
	{ value: 10, month: "November", key: "November" },
	{ value: 11, month: "December", key: "December" }
];
export const EnumMonthState1q = [
	{ value: 0, month: "January", key: "January" },
	{ value: 1, month: "February", key: "February" },
	{ value: 2, month: "March", key: "March" }
];
export const EnumMonthState2q = [
	{ value: 3, month: "April", key: "April" },
	{ value: 4, month: "May", key: "May" },
	{ value: 5, month: "June", key: "June" }
];
export const EnumMonthState3q = [
	{ value: 6, month: "July", key: "July" },
	{ value: 7, month: "August", key: "August" },
	{ value: 8, month: "September", key: "September" },
];
export const EnumMonthState4q = [
	{ value: 9, month: "October", key: "October" },
	{ value: 10, month: "November", key: "November" },
	{ value: 11, month: "December", key: "December" }
];
export const EnumMonthStateAll = [
	EnumMonthState1q,
	EnumMonthState2q,
	EnumMonthState3q,
	EnumMonthState4q,
];

export const CalendarWeekStateUS = [
	{ value: "0", small: "Sun", short: "SUN", day: "Sunday", key: "Sunday" },
	{ value: "1", small: "Mon", short: "MON", day: "Monday", key: "Monday" },
	{ value: "2", small: "Tue", short: "TUE", day: "Tuesday", key: "Tuesday" },
	{ value: "3", small: "Wed", short: "WED", day: "Wednesday", key: "Wednesday" },
	{ value: "4", small: "Thu", short: "THU", day: "Thursday", key: "Thursday" },
	{ value: "5", small: "Fri", short: "FRI", day: "Friday", key: "Friday" },
	{ value: "6", small: "Sat", short: "SAT", day: "Saturday", key: "Saturday" }
];
export const CalendarWeekState = [
	{ value: "0", small: "Mon", short: "MON", day: "Monday", key: "Monday" },
	{ value: "1", small: "Tue", short: "TUE", day: "Tuesday", key: "Tuesday" },
	{ value: "2", small: "Wed", short: "WED", day: "Wednesday", key: "Wednesday" },
	{ value: "3", small: "Thu", short: "THU", day: "Thursday", key: "Thursday" },
	{ value: "4", small: "Fri", short: "FRI", day: "Friday", key: "Friday" },
	{ value: "5", small: "Sat", short: "SAT", day: "Saturday", key: "Saturday" },
	{ value: "6", small: "Sun", short: "SUN", day: "Sunday", key: "Sunday" }
];
