import React from 'react';
import Tilt from 'react-tilt'
import Anonymous from './Anonymous.png'

const Logo = () => {
	return (
		<div className='ma4 mt0'>
		  <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
 		    <div className="Tilt-inner"><img alt='Anonymous' src={Anonymous} /></div>
		  </Tilt>
		</div>
	)
}

export default Logo;
