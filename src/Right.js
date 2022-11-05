import React from 'react';

function Right({ theme, reffers }) {
	const pn = 'wbib';

	const themes = [];

	for (let x of ['hd', 'bd'])
		for (let y = 0; y < 4; y++)
			themes.push(
				<div key={`${x}-${y}`} className={`${pn}-${theme}-${x}${y}`}>
					<p>{`${pn}-${theme}-${x}${y}`}</p>
				</div>
			);

	const cardPop = (
		<div className={`${pn}-container ${pn}-display-container ${pn}-round ${pn}-${theme}-bd2 ${pn}-border ${pn}-${theme}-border ${pn}-margin-bottom ${pn}-hide-small`}>
			<span className={`${pn}-button ${pn}-${theme}-bd2 ${pn}-display-topright`}>
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
	
	return (
		<>
			<div className= {`${pn}-card ${pn}-round`}>
				<div className={`${pn}-white`}>
					<nav className={`${pn}-button ${pn}-block ${pn}-${theme}-hd2 ${pn}-left-align`}>
						<p>
							Update Refferences POST mode
						</p>
					</nav>
				</div>
			</div>
			<hr className="clear" />
			{cardPop}
		</>
	);
}

export default Right;