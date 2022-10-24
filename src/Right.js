import React from 'react';

function Right({reffers}) {
  const pn = 'wbib';
  //console.log(reffers);
/*
  for (let item in reffers) {
			c1_list.push(
				<li key={item} id={`wbib-item-${item + 1}`} className="wbib-item">
					<input
						type="radio"
						id={`${book}${item + 1}`}
						className="wbib-radio"
						name="reffers" />
					<label
						htmlFor={`${book}${item + 1}`}
						className={`wbib-label fa`}
						title={reffers[item]}>
						&nbsp;{mf[item][1].toUpperCase() }
					</label>
					<div id={mf[item][1].toLowerCase()} className="wbib-list">
						{booklist[mf[item][1].toLowerCase()]}
					</div>
				</li>
			);
	}
*/
  return (
			<div className='wbib-card wbib-round'>
				<div className={`${pn}-white`}>
					<nav className="wbib-button wbib-block wbib-theme-l1 wbib-left-align">
            <p>
              Update Refferences POST mode
            </p>
          </nav>
				</div>
			</div>
		);
}

export default Right;