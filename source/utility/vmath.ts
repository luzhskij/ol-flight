export default class VMath{
	public static min( a: number, b: number ) : number{
		return a < b ? a : b;
	}
	public static max( a: number, b: number ) : number{
		return a > b ? a : b;
	}
	public static clamp( x: number, min: number, max: number ){
		return x === undefined ? 0 : x > max ? max : (x < min ? min : x);
	};
	public static lerp( v0: number, v1: number, t: number ){
		return v0 + t * (v1 - v0);
	};
	public static radians( degrees: number ) : number{
		return degrees * (Math.PI / 180.0);
	};
	public static sign( value: number ) : number{
		return value < 0 ? -1 : 1;
	};	
	public static abs( value: number ): number{
		return value < 0 ? -value : value;
	};
}