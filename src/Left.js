import { useEffect } from 'react';
import api from './services/api';
import Metadata from './Metadata';

function Left({ book, theme, localbib, setLocal, setBook, setVS }) {

	const metadata = Metadata();
	const mf = {
		title: metadata[book].name,
		i1: ["fa-scroll", "vt", "Velho Testamento"],	// i_n: [css_class_property_at_FontAwesome, item_name  ]
		i2: ["fa-dove", "nt", "Novo Testamento"]			// i_n: [css_class_property_at_FontAwesome, item_name  ]
	};
	const pn = 'wbib';
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

	for (let i = 0; i < indexes.length; i++) { // Fill Book names list
		const draft = (
			<nav
				key={indexes[i]}
				id={indexes[i]}
				className={`${pn}-item-list ${pn}-${theme}-item ${pn}-${theme}-borded`}
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
		<div key={"info"} id="info-panel" className = {`${pn}-info-panel`}>
		</div>
	);

	for (let item in mf) {
		if (item !== "title") {
			c1_list.push(
				<li
					key={item}
					id={`${pn}-item-${mf[item][1].toLowerCase()}`}
					className = {`${pn}-item ${pn}-aliance`}>
					<input
						type="radio"
						id={mf[item][1].toLowerCase()}
						className = {`${pn}-radio`}
						name="menu-vt-nt"
						defaultChecked={(mf[item][1] === "vt")} />
					<label
						htmlFor={mf[item][1].toLowerCase()}
						className={`${mf[item][0]} ${pn}-label fa ${pn}-${theme}-hd0`}
						title={mf[item][2]}>
						&nbsp;{mf[item][1].toUpperCase() /* Título da aba [vt, nt, info] em maiúsculo */}
					</label>
					<div id={mf[item][1].toLowerCase()} className={`${pn}-list ${pn}-${theme}-box`}>
						{booklist[mf[item][1].toLowerCase()]}
					</div>
				</li>
			);
		}
	}

	const card1 = (
		<div className={`${pn}-card ${pn}-round ${pn}-${theme}-bd0`}>
			<div className = {`${pn}-container ${pn}-padding-16 ${pn}-left-col`}>
				<h3 id="title" className = {`${pn}-center`}>
					<strong>{mf.title}</strong>
				</h3>
				<div className = {`${pn}-center`}>
					<img
						className = {`${pn}-center`}
						src={require("./assets/img/parchment.png") /* Main Book icon */}
						alt="Livro"
						style={{ width: "80px", height: "80px" }} />
				</div>
				<p className = {`${pn}-center`}>
					<i className={`fa fa-${(metadata.books.indexOf(book) < 39) ? "star-of-david":"cross"} fa-fw`}>
					</i>
				</p>
				<hr />

				<nav id="menu-vt-nt" className = {`${pn}-menu-drop`}>
					<ul id = {`${pn}-nav-content`} className = {`${pn}-nav-content`}>
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