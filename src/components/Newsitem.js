// API = "53189803e5ee4be3ad1ceaa6c402e257"
import React from 'react'

  const Newsitem = (props)=>{
   
  



  
        let  {title, description,imageUrl,newsUrl} = props;
    return (

      <div className='my-3 mx-3 px-3'>  
              <div className="card" >
                  <img  src={!imageUrl?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgPysiPPkCDtAucCyVcqfA_aIsCNrERNmP9uenLI1znlHQk2aEauneXK8&s":imageUrl} className="news-img" alt="..."/>
                  <div className="card-body">
                  <h5 className="card-title"> {title}</h5>
                  <p className="card-text">{description}</p>
                  <a href={newsUrl} target='_blank' className="btn-sm  hover:pointer text-blue ">Read more....</a>

            </div>
       </div>

       
       </div>

      
      
      

    )
  
}

export default Newsitem;
