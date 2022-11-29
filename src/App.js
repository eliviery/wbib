import React, { useState } from 'react';
import './App.css';
import '../src/assets/fontawesome6/css/all.css';
import Right from './Right';
import Center from './Center';
import Left from './Left';
import Modal from './Modal';

function App() {
	const [localbib, setLocal] = useState({});
	const [book, setBook] = useState('gn');
	const [reffers, setRef] = useState([{ "gn": 1 }]);
	const [vsdata, setVS] = useState([{
		id: "",
		book_name: "Selecione um livro à esquerda e um capítulo acima.",
		ch_vs: [1,1],
		verse_text: "",
		reffers: {}
	}]);
	
	const pn = 'wbib';

	return (
		<>
			<div id='main-panel' className={`${pn}-main-panel ${pn}-bd1`}>
				{/** Nav bar */}
				<div className = {`${pn}-top`}>
					<header className={`${pn}-bar ${pn}-hd1 ${pn}-left-align ${pn}-large`}>
						<a className={`${pn}-bar-item ${pn}-button ${pn}-padding-large ${pn}-hd0`}>
							<i className={`fa fa-book-bible ${pn}-margin-right`}></i>
							Bible
						</a>{/*
						<a className = {`${pn}-bar-item ${pn}-button ${pn}-hide-small ${pn}-padding-large ${pn}-hover-white`}>
							<i className="fa fa-book"></i>
						</a>*/}
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
						<div className = {`${pn}-col m_`} id='meta'>
							<Left book={book} setBook={setBook} localbib={localbib} setLocal={setLocal} setVS={setVS} />
						</div>
						{/** Middle column */}
						<div className = {`${pn}-col m7`} id='show'>
							<Center
								book={book}
								vsdata={vsdata}
								localbib={localbib}
								setLocal={setLocal}
								setVS={setVS}
								setRef={setRef} />
						</div>
						{/** Righ column */}
						<div className = {`${pn}-col m2`} id='info'>
							<Right reffers={reffers} /></div>
						{/** End grid */}
						<h3 id='log'></h3>
					</div>
				</div>
			</div>

			<Modal book={book} />
		</>
	);
}

export default App;
