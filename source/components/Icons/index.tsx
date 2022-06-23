import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

import "./styles/index.scss"
import { Props } from "@utility/props";

const Icon = ( props ) => {
	let {
		className,
		children,
		active,
		transition,
		style,
		size,
		color,
		padding,
		reverse,
		...rest
	} = props;
	let inlineStyle = { ...style };

	if( size !== undefined )
		inlineStyle[ "fontSize" ] = size;
	if( color !== undefined )
		inlineStyle[ "color" ] = color;
	if( padding !== undefined )
		inlineStyle[ "padding" ] = padding;

	return <span className={
		Props.className(
			"icon",
			className,
			props.hidden ? "hidden" : "",
			{ active: active, transition: transition }
		)
	} { ...rest } style={ inlineStyle }>{ children }</span>;
};

export namespace Icons{

	export const home = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const home2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const home3 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const office = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const newspaper = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const pencil = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const pencil2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const quill = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const pen = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const blog = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const eyedropper = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const droplet = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const paintformat = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const image = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const images = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const camera = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const headphones = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const music = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const play = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const film = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const videocamera = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const dice = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const pacman = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const spades = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const clubs = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const diamonds = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const bullhorn = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const connection = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const podcast = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const feed = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const mic = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const book = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const books = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const library = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const filetext = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const profile = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const fileempty = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const filesempty = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const filetext2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const filepicture = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const filemusic = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const fileplay = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const filevideo = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const filezip = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const copy = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const paste = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const stack = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const folder = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const folderopen = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const folderplus = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const folderminus = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const folderdownload = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const folderupload = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const pricetag = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const pricetags = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const barcode = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const qrcode = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const ticket = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const cart = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const coindollar = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const coineuro = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const coinpound = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const coinyen = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const creditcard = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const calculator = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const lifebuoy = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const phone = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const phonehangup = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const addressbook = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const envelop = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const pushpin = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const location = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const location2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const compass = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const compass2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const map = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const map2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const history = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const clock = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const clock2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const alarm = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const bell = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const stopwatch = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const calendar = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const printer = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const keyboard = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const display = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const laptop = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const mobile = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const mobile2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const tablet = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const tv = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const drawer = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const drawer2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const boxadd = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const boxremove = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const download = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const upload = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const floppydisk = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const drive = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const database = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const undo = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const redo = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const undo2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const redo2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const forward = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const reply = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const bubble = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const bubbles = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const bubbles2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const bubble2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const bubbles3 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const bubbles4 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const user = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const users = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const userplus = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const userminus = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const usercheck = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const usertie = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const quotesleft = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const quotesright = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const hourglass = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const spinner = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const spinner2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const spinner3 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const spinner4 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const spinner5 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const spinner6 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const spinner7 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const spinner8 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const spinner9 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const spinner10 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const spinner11 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const binoculars = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const search = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const zoomin = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const zoomout = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const enlarge = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const shrink = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const enlarge2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const shrink2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const key = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const key2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const lock = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const unlocked = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const wrench = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const equalizer = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const equalizer2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const cog = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const cogs = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const hammer = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const magicwand = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const aidkit = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const bug = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const piechart = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const statsdots = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const statsbars = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const statsbars2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const trophy = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const gift = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const glass = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const glass2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const mug = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const spoonknife = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const leaf = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const rocket = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const meter = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const meter2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const hammer2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const fire = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const lab = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const magnet = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const bin = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const bin2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const briefcase = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const airplane = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const truck = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const road = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const accessibility = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const target = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const shield = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const power = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const cswitch = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const powercord = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const clipboard = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const listnumbered = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const list = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const list2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const tree = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const menu = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const menu2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const menu3 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const menu4 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const cloud = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const clouddownload = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const cloudupload = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const cloudcheck = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const download2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const upload2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const download3 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const upload3 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const sphere = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const earth = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const link = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const flag = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const attachment = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const eye = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const eyeplus = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const eyeminus = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const eyeblocked = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const bookmark = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const bookmarks = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const sun = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const contrast = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const brightnesscontrast = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const starempty = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const starhalf = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const starfull = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const heart = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const heartbroken = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const man = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const woman = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const manwoman = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const happy = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const happy2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const smile = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const smile2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const tongue = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const tongue2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const sad = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const sad2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const wink = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const wink2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const grin = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const grin2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const cool = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const cool2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const angry = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const angry2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const evil = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const evil2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const shocked = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const shocked2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const baffled = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const baffled2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const confused = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const confused2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const neutral = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const neutral2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const hipster = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const hipster2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const wondering = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const wondering2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const sleepy = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const sleepy2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const frustrated = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const frustrated2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const crying = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const crying2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const pointup = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const pointright = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const pointdown = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const pointleft = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const warning = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const notification = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const question = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const plus = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const minus = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const info = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const cancelcircle = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const blocked = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const cross = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const checkmark = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const checkmark2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const spellcheck = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const enter = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const exit = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const play2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const pause = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const stop = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const previous = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const next = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const backward = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const forward2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const play3 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const pause2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const stop2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const backward2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const forward3 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const first = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const last = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const previous2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const next2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const eject = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const volumehigh = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const volumemedium = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const volumelow = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const volumemute = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const volumemute2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const volumeincrease = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const volumedecrease = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const loop = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const loop2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const infinite = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const shuffle = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const arrowupleft = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const arrowup = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const arrowupright = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const arrowright = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const arrowdownright = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const arrowdown = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const arrowdownleft = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const arrowleft = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const arrowupleft2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const arrowup2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const arrowupright2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const arrowright2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const arrowdownright2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const arrowdown2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const arrowdownleft2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const arrowleft2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const circleup = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const circleright = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const circledown = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const circleleft = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const tab = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const moveup = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const movedown = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const sortalphaasc = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const sortalphadesc = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const sortnumericasc = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const sortnumbericdesc = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const sortamountasc = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const sortamountdesc = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const command = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const shift = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const ctrl = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const opt = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const checkboxchecked = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const checkboxunchecked = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const radiochecked = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const radiochecked2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const radiounchecked = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const crop = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const makegroup = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const ungroup = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const scissors = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const filter = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const font = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const ligature = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const ligature2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const textheight = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const textwidth = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const fontsize = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const bold = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const underline = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const italic = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const strikethrough = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const omega = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const sigma = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const pagebreak = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const superscript = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const subscript = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const superscript2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const subscript2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const textcolor = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const pagebreak2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const clearformatting = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const table = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const table2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const inserttemplate = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const pilcrow = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const ltr = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const rtl = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const section = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const paragraphleft = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const paragraphcenter = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const paragraphright = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const paragraphjustify = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const indentincrease = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const indentdecrease = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const share = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const newtab = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const embed = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const embed2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const terminal = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const share2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const mail = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const mail2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const mail3 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const mail4 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const amazon = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const google = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const google2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const google3 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const googleplus = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const googleplus2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const googleplus3 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const hangouts = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const googledrive = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const facebook = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const facebook2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const instagram = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const whatsapp = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const spotify = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const telegram = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const twitter = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const vine = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const vk = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const renren = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const sinaweibo = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const rss = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const rss2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const youtube = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const youtube2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const twitch = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const vimeo = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const vimeo2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const lanyrd = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const flickr = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const flickr2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const flickr3 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const flickr4 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const dribbble = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const behance = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const behance2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const deviantart = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const c500px = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const steam = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const steam2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const dropbox = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const onedrive = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const github = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const npm = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const basecamp = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const trello = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const wordpress = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const joomla = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const ello = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const blogger = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const blogger2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const tumblr = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const tumblr2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const yahoo = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const yahoo2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const tux = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const appleinc = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const finder = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const android = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const windows = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const windows8 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const soundcloud = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const soundcloud2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const skype = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const reddit = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const hackernews = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const wikipedia = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const linkedin = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const linkedin2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const lastfm = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const lastfm2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const delicious = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const stumbleupon = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const stumbleupon2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const stackoverflow = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const pinterest = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const pinterest2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const xing = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const xing2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const flattr = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const foursquare = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const yelp = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const paypal = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const chrome = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const firefox = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const IE = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const edge = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const safari = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const opera = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const filepdf = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const fileopenoffice = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const fileword = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const fileexcel = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const libreoffice = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const htmlfive = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const htmlfive2 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const css3 = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const git = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const codepen = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const svg = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const IcoMoon = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};



	export const loading = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	};
	export const expand = ( props: any ) => {
		return <Icon { ...props }>
			<div className={ "icon-arrow" + (props.reverse ? " icon-arrow-reverse" : "") }></div>
		</Icon>;
	};
};
