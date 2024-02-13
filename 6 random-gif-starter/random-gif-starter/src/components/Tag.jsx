import React, {useEffect, useState} from 'react'
import axios from "axios";
import Spinner from './Spinner';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const Tag = () => {
  const [gif,setGif] = useState('');
  const[loading, setLoading] = useState(false);
  const [tag, setTag]= useState('');
 

  async function fetchData() {
    setLoading(true);
    const url =`https://api.giphy.com/v1/gifs/random?api_key = ${API_KEY}`;
    const {data} = await axios.get(url);
    const imageSource = data.data.images.downsized_large.url;
    setGif(imageSource);
    setLoading(false);
  }
 
  useEffect(()=> {
    fetchData();
  },[])

  function clickHandler(){
        fetchData();
  }

  return (
    <div className='w-1/2  bg-blue-500 rounded-lg border border-black 
    flex flex-col items-center gap-y-5 mt-[15px]'>
      <h1 className='text-2xl underline uppercase font-bold mt-[15px]'>
        Random {tag} Gif
      </h1>

      {
        loading ?(<Spinner/>) :( <img src={gif} width="450"/>)
      }
     
      <input
      className='w-10/12 text-lg py-2 rounded-lg mb-[3px] text-center'
      onChange={()=> setTag(event.target.value)}
      value={tag}
      
     />

      <button onClick={clickHandler}
       className='w-10/12 bg-white  rounded-lg text-lg py-2 mb-[20px]'>
        Generate
      </button>
    </div>
  )
}

export default Tag
