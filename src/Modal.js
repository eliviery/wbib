import React from 'react';
//import api from './services/api';
const info = require('./books_metadata.json');

function Modal({ book, theme }) {
	const pn = 'wbib'; // Project Name
	const elem = React.createElement; // HTML Element Creator
	const mcls = [`${pn}-modal-info`, `${pn}-modal-hidden`, `${pn}-modal-visually-hiden`]; // Modal CSS Classes List
	const article = []; // Articles List for Main Modal Content

	const al = info[book]['content']; // al => Paragraphs content such as p1, p2, ...pn

	/**
	 * 
	 * @param {Array} tb [["thead-tr-th-1","thead-tr-th-2","thead-tr-th-3"],["tbody-tr1-td1","tbody-tr1-td2","tbody-tr1-td3"],["tbody-tr2-td1","tbody-tr2-td2","tbody-tr2-td3"]]
	 * @returns JSX HTML table
	 */
	const mount = (tb) => {
		let table = [], hbf = [], prefix = `${pn}-modal`; // first row = Header, range rows = Body, last row = Footer
		let tb_theme = {
			"table":[`${prefix}-table`],
			"thead":[`${prefix}-thead`,`${pn}-${theme}-hd1`],
			"tbody":[`${prefix}-tbody`,`${pn}-${theme}-bd1`],
			"tfoot":[`${prefix}-tfoot`]
		};
		tb.forEach((row, x) => {
			hbf.push(
				<tr key={`tr${x}`} className={`${x > 0 ? [``,`${pn}-${theme}-bd3`][x & 1] : ""}`}>
					{
						row.map((e, y) => {
							return (x === 0) ? <><th key={`tr-th${y}`}>{e}</th></> : <><td key={`tr-td${y}`}>{e}</td></>
						})
					}
				</tr>
			);			
		});
		let footer = hbf.pop();
		table.push(<thead key={`thd-1`} className={tb_theme["thead"].join(' ')}>{hbf.shift()}</thead>);
		table.push(<tbody key={`thd-${tb.length}`} className={tb_theme["tbody"].join(' ')}>{hbf}</tbody>);
		table.push(<tfoot key={`thd-${tb.length + 2}`} className={tb_theme["tfoot"].join(' ')}>{footer}</tfoot>);
		return <><hr /><table key={`tb-${tb.length + 2}-${tb[0].length}`} className={tb_theme["table"].join(' ')}>{table}</table></>;
	}

	for (let x in al) { // FOR IN <Object>
	
		article.push( // Add Article Title
			elem(
				'p',
				{ key: `p_${article.length}`, className: `${pn}-paragraph ${pn}-chapter-num` },
				<>{al[x]['thumb']}</>
			)
		);

		if (Object.keys(al[x]).includes("text")) {
			for (let txt of al[x]['text']) { // FOR OF <Array>
				let table = [];
				if (typeof txt === 'object') table = mount(txt);
				article.push(
					elem(
						'article',
						{ key: `data_P${article.length}`, className: `${pn}-paragraph` },
						<>{typeof txt === 'string' ? txt : table}</>
					)
				);
			}
		}
		if (Object.keys(al[x]).includes("table")) {
			article.push(
				elem(
					'article',
					{ key: `data_T${article.length}`, className: `${pn}-paragraph` },
					<>{mount(al[x]['table'])}<br /></>
				)
			);
		}
	}

	return (
		<div id='m-info' className={mcls.join(' ')}>
			<div className={`${pn}-modal-content`}>
				<span id="m-close" className={`${pn}-modal-close`}
					onClick={
						() => {
							document.querySelector(`div#m-info`).className = mcls.join(' ');
							document.querySelector(`div#main-panel`).classList.remove(`${pn}-blurred`);
							document.querySelector(`div#main-panel`).parentElement.classList.remove(`${pn}-modal-open`);
						}
					}
				>&times;</span>
				<article key={`data_X`}>
					<div className={`${pn}-article-meta`}>
						<h3>{info[book].regard} {info[book].name}</h3>
					</div>
					<div className={`${pn}-article-meta`}>
						{[
							elem('article', { key: 'data_X1' }, <><span className={`${pn}-chapter-num`}>Autor</span><br />{info[book]['author']}</>),
							elem('article', { key: 'data_X2' }, <><span className={`${pn}-chapter-num`}>Data</span><br />{info[book]['date']}</>)
						]}
					</div>
					{article}
				</article>
			</div>
		</div>
	);
}

export default Modal;