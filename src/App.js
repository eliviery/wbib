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
	const [reffers, setRef] = useState([{"gn":1}]);
	const [vsdata, setVS] = useState([{
		id: "",
		book_name: "Selecione um livro à esquerda e um capítulo acima.",
		ch_vs: [""],
		verse_text: "",
		reffers: {}
	}]);

	return (
		<>
			<div id='main-panel' className="wbib-main-panel wbib-theme-l5">
				{/** Nav bar */}
				<div className="wbib-top">
					<header className="wbib-bar wbib-theme-d2 wbib-left-align wbib-large">
						<a className="wbib-bar-item wbib-button wbib-padding-large wbib-theme-d4">
							<i className="fa fa-book-bible wbib-margin-right"></i>
							Bible
						</a>
						<a className="wbib-bar-item wbib-button wbib-hide-small wbib-padding-large wbib-hover-white">
							<i className="fa fa-book"></i>
						</a>
						<a className="wbib-bar-item wbib-button wbib-hide-small wbib-padding-large wbib-hover-white">
							<i className="fa fa-globe"></i>
						</a>
						<a className="wbib-bar-item wbib-button wbib-hide-small wbib-padding-large wbib-hover-white">
							<i className="fa fa-envelope"></i>
						</a>
						<a className="wbib-bar-item wbib-button wbib-hide-small wbib-right wbib-padding-large wbib-hover-white" title='Minha Conta'>
							<i className="fa fa-user-large"></i>
						</a>
					</header>
				</div>
				{/** Page Container */}
				<div className="wbib-container wbib-content">
					{/** Grid */}
					<div className="wbib-row">
						{/** Left column */}
						<div className="wbib-col m_" id='meta'><Left book={book} localbib={localbib} setLocal={setLocal} setBook={setBook} setVS={setVS}/></div>
						{/** Middle column */}
						<div className="wbib-col m7" id='show'>
							<Center
								book={book}
								vsdata={vsdata}
								localbib={localbib}
								setLocal={setLocal}
								setVS={setVS}
								setRef={setRef}/>
						</div>
						{/** Righ column */}
						<div className="wbib-col m2" id='info'>
							<Right reffers={reffers}/></div>
						{/** End grid */}
						<h3 id='log'></h3>
					</div>
				</div>
			</div>
			
			<Modal book={book}/>			
		</>
	);
}

export default App;
