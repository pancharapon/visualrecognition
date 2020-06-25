import React from 'react';


const Navigation = ({ onPageChange, signIn }) => {
  if(signIn) {
	  return(<nav 
		       style={{display:'flex', justifyContent: 'flex-end'}} 
		       className=''>
		       <p 
		         className='f3 underline dim pointer link black pv3 pr3 ma3'
		         onClick={() => onPageChange('signin')} >SignOut</p>
		     </nav>)  
  }else {
  	  return(<nav 
		       style={{display:'flex', justifyContent: 'flex-end'}} 
		       className=''>
		       <p 
		         className='f3 underline dim pointer link black pv3 pr3 mt3 mr3'
		         onClick={() => onPageChange('signin')} >SignIn</p>
		       <p 
		         className='f3 underline dim pointer link black pv3 pr3 mt3 mr3'
		         onClick={() => onPageChange('register')} >Register</p>
		     </nav>)
  }
}

export default Navigation;