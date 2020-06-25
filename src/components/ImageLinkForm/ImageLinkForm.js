import React from 'react';
import './ImageLinkFrom.css';


const ImageLinkFrom = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div>
		  <p className="f4">This Anonymous will detect faces in your picture</p>
		  <div className='center'>
		    <div className='from center pa4 br2 shadow-5'>
		      <input type='text' className='f4 w-70 pa2' placeholder='Url' onChange={onInputChange}/>
		      <button className='f4 w-30 pointer grow ph4 pv2 white bg-dark-blue link ba b--dark-blue br' onClick={onButtonSubmit}>Detect</button>
		    </div>
		  </div>
		</div>
	)
}

export default ImageLinkFrom;