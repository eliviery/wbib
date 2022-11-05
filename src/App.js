import React, { useState } from 'react';
import './App.css';
import '../src/assets/themes/default.css';
import '../src/assets/fontawesome6/css/all.css';
import Right from './Right';
import Center from './Center';
import Left from './Left';
import Modal from './Modal';

function App() {
	const [localbib, setLocal] = useState({});
	const [book, setBook] = useState('gn');
	const [reffers, setRef] = useState([{ "gn": 1 }]);
	const [theme, setTheme] = useState('std');
	const [vsdata, setVS] = useState([{
		id: "",
		book_name: "Selecione um livro à esquerda e um capítulo acima.",
		ch_vs: [""],
		verse_text: "",
		reffers: {}
	}]);
	const pn = 'wbib';
	const themed = {
		"hd0": ["#303E45", "#FFFFFF"], //d4
		"hd1": ["#3A4B53", "#FFFFFF"], //d2
		"hd2": ["#4D636F", "#FFFFFF"], //
		"hd3": ["#7D97A5", "#FFFFFF"], //l6

		"def": ["#FFFFFF", "#101010"],
		"bd0": ["#F3F6F7", "#101010"],
		"bd1": ["#E4EAEC", "#101010"],
		"bd2": ["#DFE5E8", "#101010"],
		"bd3": ["#BECBD2", "#101010"],
		"bd4": ["#9EB1BB", "#101010"] // Border item menu vt RESOLVER
	}
	/**
	 * Bible-Top					: hd0
	 * Header							: hd1
	 * 
	 * Main-Panel					: bd0
	 * 
	 * Left>Frame1				: bd0
	 * VT-NT nonSelected	: bd4
	 * VT-NT Selected			: hd2
	 * 
	 * Center>Frame1				: def
	 * Chapter nonSelected	: bd4
	 * Chapter Selected			: hd2
	 * 
	 * Center>Frame2						: bd0
	 * FrameText>ChapterBox			: bd2 ~ bd3
	 * FrameText>ThumbChapter		: bd0
	 * FrameText>VerseRef>Thumb	: bd3
	 * FrameText>VerseRef>Text	: bd1 ~ def
	 * 
	 * Right>TopCard						: hd3
	*/

	return (
		<>
			<div id='main-panel' className={`${pn}-main-panel ${pn}-${theme}-bd1`}>
				{/** Nav bar */}
				<div className = {`${pn}-top`}>
					<header className={`${pn}-bar ${pn}-${theme}-hd1 ${pn}-left-align ${pn}-large`}>
						<a className={`${pn}-bar-item ${pn}-button ${pn}-padding-large ${pn}-${theme}-hd0`}>
							<i className={`fa fa-book-bible ${pn}-margin-right`}></i>
							Bible
						</a>
						<a className = {`${pn}-bar-item ${pn}-button ${pn}-hide-small ${pn}-padding-large ${pn}-hover-white`}>
							<i className="fa fa-book"></i>
						</a>
						<a className = {`${pn}-bar-item ${pn}-button ${pn}-hide-small ${pn}-padding-large ${pn}-hover-white`}>
							<i className="fa fa-globe"></i>
						</a>
						<a className = {`${pn}-bar-item ${pn}-button ${pn}-hide-small ${pn}-padding-large ${pn}-hover-white`}>
							<i className="fa fa-envelope"></i>
						</a>
						<a className = {`${pn}-bar-item ${pn}-button ${pn}-hide-small ${pn}-right ${pn}-padding-large ${pn}-hover-white`} title='Minha Conta'>
							<i className="fa fa-user-large"></i>
						</a>
					</header>
				</div>
				{/** Page Container */}
				<div className = {`${pn}-container ${pn}-content`}>
					{/** Grid */}
					<div className = {`${pn}-row`}>
						{/** Left column */}
						<div className = {`${pn}-col m_`} id='meta'><Left book={book} theme={theme} localbib={localbib} setLocal={setLocal} setBook={setBook} setVS={setVS} /></div>
						{/** Middle column */}
						<div className = {`${pn}-col m7`} id='show'>
							<Center
								book={book}
								theme={theme}
								vsdata={vsdata}
								localbib={localbib}
								setLocal={setLocal}
								setVS={setVS}
								setRef={setRef} />
						</div>
						{/** Righ column */}
						<div className = {`${pn}-col m2`} id='info'>
							<Right theme={theme} reffers={reffers} /></div>
						{/** End grid */}
						<h3 id='log'></h3>
					</div>
				</div>
			</div>

			<Modal book={book} theme={theme} />
		</>
	);
}

export default App;
