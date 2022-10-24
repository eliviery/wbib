import React, { useEffect } from 'react';
import api from './services/api';
import Metadata from './Metadata';
const metadata = Metadata();

const pn = 'wbib'; // Project Name
const elem = React.createElement;

class Box extends React.Component { // Default box class <div>
	render() {
		const listClass = { className: this.props.attlist.join(' ') };
		return elem('div', listClass, this.props.children);
	}
}

const fill = (list) => {
	if (list.length === 1) return list.shift();
	else return elem(Box, { attlist: list.shift() }, fill(list));
}
/**
 * 
 * @param {Array} book The book name abbreviation and chapter 1
 * @param {function} setBook Sets the book value
 * @returns Center component
 */
function Center({ book, vsdata, localbib, setLocal, setVS, setRef }) {
	const info = require('./books_metadata.json');

	//if (`${book}1` in localbib) setVS(localbib[`${book}1`]);
	
	/**
	 * @param {string} a 
	 * @param {number} b 
	 * @returns Array containing all chapter verses and its data
	*/
	async function getChapter(a, b) {
		let key = `${a}${b}`;
		let rflist = [];

		let response = await api.get('/list', { params: { book: a, ch: b } })
			.then((rs) => { return rs });

		localbib[key] = response.data;
		setLocal(localbib);
		setVS(response.data);
		for (let obj of localbib[key]) rflist.push(obj['reffers']);
		setRef(rflist);
	}

	useEffect(()=>{ getChapter(book, 1) },[]);

	const elemCh = (abb, def) => {
		const chLI = [];
		let TAM = metadata[abb].chapters;
		for (let i = 1; i <= TAM; i++) {
			chLI.push(
				<li
					key={`box_ch${i}`}
					className={`${pn}-item ${pn}-ch-item`}
					style={{width: (TAM <= 10) ? `${100/TAM}%` : '10%'}}
				>
					{[
						elem('input',
							{
								key: `rd_ch${i}`,
								type: "radio",
								id: `ch${i}`,
								className: `${pn}-radio ${pn}-ch-rd`,
								name: `${abb}`,
								value: i,
								defaultChecked: i === def,
								onChange: (e) => {
									if (`${abb}${i}` in localbib) {
										setVS(localbib[`${abb}${i}`]);
									} else {
										getChapter(e.target.name, e.target.value); // Call API
									}
								}
							},
							null),
						elem('label',
							{
								key: `lb_ch${i}`,
								htmlFor: `ch${i}`,
								className: `${pn}-label`,
								title: `${metadata[abb].name} ${i}`,
								style: { width: (TAM <= 10) ? `${100/TAM}%` : '100%' } // Setting chapter box width
							},
							<span className={`${pn}-chapter-num`}>{i}</span>)
					]}
				</li>
			);
		}

		return (
			<>
				<small className='wbib-left wbib-opacity'>Capítulos</small>
				<ul className={`${pn}-chapter-box ${pn}-nav-content`}>
					{chLI}
				</ul>
			</>
		);
	};

	const ch_list = [
		[`${pn}-row-padding`],
		[`${pn}-col`, 'm12'],
		[`${pn}-card`, `${pn}-round`, `${pn}-white`],
		[`${pn}-container`],
		elemCh(book, 1)
	];

	/**
	 * @constant {Array} navigating Such as <ul><li>...<li></li></ul>
	 */
	const navigating = fill(ch_list);
	const vslist = [];
	const tCase = (t) => { return t[0].toUpperCase() + t.substr(1); }

	for (let vs of vsdata) {
		let n = vs['ch_vs'][1];
		let k = `${book}${vs['ch_vs'][0]}_${n}`;
		let txt = vs['verse_text'];
		let hasref = (Object.keys(vs['reffers']).length > 0);
		let rf = <></>;

		if (hasref) {
			let aux = []
			for (let idx of Object.keys(vs['reffers'])) {
				let current = vs['reffers'][idx];
				for (let idy of Object.keys(current)) {
					if (idy !== 'book_name') {
						const ref_txt = current[idy];
						let targ = `${tCase(idx)} ${idy}`; // < idy > guarda capítulo e versículo numa string (se for extrair, tratar com RegEx)
						let classColor = ["wbib-white", "wbib-theme-l5"][parseInt(aux.length) & 1];
						aux.push(
							<div
								key={`${targ}`}
								className={`${pn}-reff-txt ${classColor}`}>
								<p>
									<span className='wbib-theme-l4'>{targ}</span>&nbsp;{ref_txt}</p>
							</div>
						);
					}
				}
			}
			rf = <div key={`vs-${n}`} id={`vs${n}`} className="wbib-reff-content">{aux}</div>
		}

		vslist.push(
			<li
				key={k}
				className={`${pn}-verse ${pn}-theme-${["l4", "l3"][n & 1]}`}
			>
				<div id={`${k}`} className={`${pn}-verse`}>
					{
						elem('nav',
							{
								key: k,
								id: `vs${n}`,
								className: `${pn}-verse-thumb ${hasref ? "wbib-theme-l5" : ""}`,
								style: { cursor: hasref ? "pointer" : "auto" },
								onClick: (e) => {
									var show = document.querySelector(`div#${`vs${n}`}`).style.display;
									setRef({
										book_name: vs['book_name'],
										ch_vs: vs['ch_vs'],
										value: vs['reffers']
									});
									document.querySelector(`div#${`vs${n}`}`)
										.style.display = (show === "" || show === "none") ? "inline-block" : "none";
								}
							},
							<p className='wbib-verse-num'>
								{hasref ? <strong>{n}</strong> : n}
							</p>
						)
					}
				</div>
				{ // Criando a DIV que será anexada a todo versículo que possuir referências
					elem(
						'div',
						{
							className: `${pn}-verse-content`
						},
						[
							<p key={k} className={`${pn}-verse-text`}>{txt}</p>,
							hasref ? rf : null
						]
					)
				}
			</li>
		);
	}

	const panel = (
		<div className="wbib-container wbib-card wbib-white wbib-round wbib-margin wbib-theme-l5" >
			<br />
			<img
				src={require("./assets/img/parchment.png")}
				alt="Book Avatar"
				className="wbib-left wbib-margin-right"
				style={{ width: "60px" }} />
			<span
				className={`${pn}-info ${pn}-right ${pn}-opacity fa-circle-info fa`}
				title="Info"
				onClick={
					() => {
						let modal = document.querySelector(`div#m-info`);
						modal.className = `${pn}-modal-info ${pn}-modal-visually-hiden`;
						setTimeout(function () {
							document.querySelector(`div#main-panel`).classList.add(`${pn}-blurred`);
							modal.className = `${pn}-modal-info`;
						}, 100);
						document.querySelector(`div#main-panel`).parentElement.className = `${pn}-modal-open`;
					}
				}
			>
			</span>
			<h4 id="verse-data">
				<strong>
					{`${vsdata[0]['book_name']} ${vsdata[0]['ch_vs'][0]}`}
				</strong>
			</h4>
			<small className="wbib-reffs">{info[book]['date']}</small>
			<hr className="wbib-clear" />
			<div className="wbib-verses wbib-theme-l5">
				{vslist}
			</div>
		</div>
	);

	return (
		<>
			{navigating}
			{panel}
		</>
	);
}

export default Center;