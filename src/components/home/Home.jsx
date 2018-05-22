import React from 'react';
import logoSrc from '../../assets/img/react.png';
//import the props I net into the {}
const HomePage = ({history})  => {  
  
  return( 
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted stackable header">
            <img className="ui image massive" src={logoSrc} alt="logo"/>
            <div className="content">re-vents</div>
          </h1>
          <h2>Do whatever you want to do</h2>
          <div onClick={() => history.push('/events')} className="ui huge white inverted button">
            Get Started
            <i className="right arrow icon"></i>
          </div>

        </div>

      </div>
    </div>
  )
}


export default HomePage;
