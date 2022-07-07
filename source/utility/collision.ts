import VMath from "./vmath";

export class CollisionHit{
	constructor(){
		this.penetration = 0.0;
		this.normal = { x: 0.0, y: 0.0 };
		this.delta = { x: 0.0, y: 0.0 };
		this.position = { x: 0.0, y: 0.0 };
	};
	penetration: number;
	normal: { x: number, y: number };
	delta: { x: number, y: number };
	position: { x: number, y: number };
};

export class Ray{
	constructor( p0: number[], p1: number[] ){
		this.position = { x: p0[ 0 ], y: p0[ 1 ] };
		this.direction = { x: p1[ 0 ] - p0[ 0 ], y: p1[ 1 ] - p0[ 1 ] };
	};
	position: { x: number, y: number };
	direction: { x: number, y: number };
};

export default class Collision{
	public static aabb2ray(
		aabbPosition: number[], aabbExtends: number[],
		ray: Ray
	){
		const scaleX = 1.0 / ray.direction.x;
		const scaleY = 1.0 / ray.direction.y;
		const signX = VMath.sign( scaleX );
		const signY = VMath.sign( scaleY );
		const nearTimeX = (aabbPosition[ 0 ] - signX * aabbExtends[ 0 ] - ray.position.x) * scaleX;
		const nearTimeY = (aabbPosition[ 1 ] - signY * aabbExtends[ 1 ] - ray.position.y) * scaleY;
		const farTimeX = (aabbPosition[ 0 ] + signX * aabbExtends[ 0 ] - ray.position.x) * scaleX;
		const farTimeY = (aabbPosition[ 1 ] + signY * aabbExtends[ 1 ] - ray.position.y) * scaleY;	
	
		if( nearTimeX > farTimeY || nearTimeY > farTimeX )
			return null;
	
		const nearTime = nearTimeX > nearTimeY ? nearTimeX : nearTimeY;
		const farTime = farTimeX < farTimeY ? farTimeX : farTimeY;
	
		if( nearTime >= 1.0 || farTime <= 0.0 ){
			return null;
		};
	
		const hit = new CollisionHit();
	
		hit.penetration = VMath.clamp( nearTime, 0, 1 );
	
		if( nearTimeX > nearTimeY ){
			hit.normal.x = -signX;
			hit.normal.y = 0.0;
		}else{
			hit.normal.x = 0.0;
			hit.normal.y = -signY;
		}
		hit.delta.x = (1.0 - hit.penetration) * -ray.direction.x;
		hit.delta.y = (1.0 - hit.penetration) * -ray.direction.y;
		hit.position.x = ray.position.x + ray.direction.x * hit.penetration;
		hit.position.y = ray.position.y + ray.direction.y * hit.penetration;
	
		return hit;	
	};
	
};