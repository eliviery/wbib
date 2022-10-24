import { useEffect } from 'react';
import api from './services/api';
import Metadata from './Metadata';

function Left({ book, localbib, setLocal, setBook, setVS }) {

	const metadata = Metadata();
	const mf = {
		title: metadata[book].name,
		i1: ["fa-scroll", "vt", "Velho Testamento"],	// i_n: [css_class_property_at_FontAwesome, item_name  ]
		i2: ["fa-dove", "nt", "Novo Testamento"],			// i_n: [css_class_property_at_FontAwesome, item_name  ]
//		i3: ["fa-circle-info", "info", `Sobre ${metadata[book].name}`]	// i_n: [css_class_property_at_FontAwesome, item_name  ]
	};
	
	/**
	 * @param {string} a 
	 * @param {number} b 
	 * @returns Array containing all chapter verses and its data
	*/
	async function getVS(a, b) {

		if (`${a}${b}` in localbib){
			setVS(localbib[`${a}${b}`]);
		}
		else{
			let response = await api.get('/list', { params: { book: a, ch: b } })
			.then((rs) => { return rs });
			localbib[`${a}${b}`] = response.data;
			setLocal(localbib);
			setVS(localbib[`${a}${b}`]);
		}
	}

	const c1_list = [];
	const indexes = metadata.books;
	const booklist = { "vt": [], "nt": [], "info": [] };
	const themes = [];

	for (let x of ['l', 'd'])
		for (let y = 1; y <= 5; y++)
			themes.push(
				<div key={`${x}-${y}`} className={`wbib-theme-${x}${y}`}>
					<p>{`wbib-theme-${x}${y}`}</p>
				</div>
			);

	const cardPop =  (
		<div className="wbib-container wbib-display-container wbib-round wbib-theme-l4 wbib-border wbib-theme-border wbib-margin-bottom wbib-hide-small">
			<span className="wbib-button wbib-theme-l3 wbib-display-topright">
				<i className="fa fa-remove">
				</i>
			</span>
			<p>
				<strong id='log-title'>
					CLASSES DO TEMA ATUAL
				</strong>
			</p>
			<p id='log'>Nomes das classes de cores dos elementos representados visualmente.</p>
			{themes}
		</div>
	);

	for (let i = 0; i < indexes.length; i++) { // Fill Book names list
		const draft = (
			<nav
				key={indexes[i]}
				id={indexes[i]}
				className="wbib-item-list"
				onClick={(e) => {
						setBook(`${indexes[i]}`);
						getVS(indexes[i], 1);
					}
				}
			>
				
				<p>
					{metadata[indexes[i]].name}
				</p>
			</nav>
		);
		booklist[["nt", "vt"][i < 39 & 1]].push(draft);
	}
	booklist["info"].push(
		<div key={"info"} id="info-panel" className="wbib-info-panel">
			{cardPop}
		</div>
	);

	for (let item in mf) {
		if (item !== "title") {
			c1_list.push(
				<li
					key={item}
					id={`wbib-item-${mf[item][1].toLowerCase()}`}
					className="wbib-item wbib-aliance">
					<input
						type="radio"
						id={mf[item][1].toLowerCase()}
						className="wbib-radio"
						name="menu-vt-nt"
						defaultChecked={(mf[item][1] === "vt")} />
					<label
						htmlFor={mf[item][1].toLowerCase()}
						className={`${mf[item][0]} wbib-label fa`}
						title={mf[item][2]}>
						&nbsp;{mf[item][1].toUpperCase() /* Título da aba [vt, nt, info] em maiúsculo */}
					</label>
					<div id={mf[item][1].toLowerCase()} className="wbib-list">
						{booklist[mf[item][1].toLowerCase()]}
					</div>
				</li>
			);
		}
	}

	const card1 = (
		<div className="wbib-card wbib-round wbib-white">
			<div className="wbib-container wbib-padding-16 wbib-left-col">
				<h3 id="title" className="wbib-center">
					<strong>{mf.title}</strong>
				</h3>
				<div className="wbib-center">
					<img
						className="wbib-center"
						src={require("./assets/img/parchment.png") /* Main Book icon */}
						alt="Livro"
						style={{ width: "80px", height: "80px" }} />
				</div>
				<p className="wbib-center">
					<i className={`fa fa-${(metadata.books.indexOf(book) < 39) ? "star-of-david":"cross"} fa-fw`}>
					</i>
				</p>
				<hr />

				<nav id="menu-vt-nt" className="wbib-menu-drop">
					<ul id="wbib-nav-content" className="wbib-nav-content">
						{c1_list}
					</ul>
				</nav>
			</div>
		</div>
	);

	useEffect(()=>{  setBook(indexes[0])},[]);

	return (
		<>
			{card1}
		</>
	);
}

export default Left;