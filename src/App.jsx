import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  const passwordref = useRef(null)
  const passwordgen= useCallback(() => {
    let pass=""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "0123456789"
    if (character) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 0; i < length; i++) {
      let each_char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(each_char) 
      
    }
    setPassword(pass)
  },[length,number,character,setPassword])

  useEffect(() => {
    passwordgen()
  },[length,character,number,passwordgen])

  const copypasstoclip=useCallback(() => {
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0,15)
    window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <div className="w-2/4 max-w-2/3 mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-orange-600">
      <div className='text-center text-4xl text-white'>Password Generator</div>
      <div className='flex overflow-hidden mb-4 rounded-lg'>
        <input type="text"
         value={password}
         className="outline-none w-full py-1 px-3"
         placeholder='Password'
         ref={passwordref}
         />
         <button
         onClick={copypasstoclip}
         className='outline-none bg-blue-400 text-white px-3 py-2 hover:bg-blue-700'

         >Copy</button>
      </div>
      <div
      className='flex text-lg gap-x-2'>
        <div className='flex items-centre gap-x-1'>
          <input
          type='range'
          min={8}
          max={12}
          className='cursor-pointer'
          value={length}
          onChange={(e)=>{
            setLength(e.target.value)
          }}
          />
          <label >length:{length}</label>
          <div className='flex px-5 gap-x-5 text-lg'>
          <input 
          type="checkbox" 
          defaultChecked={number}
          id='number input'
          onChange={()=>{setNumber((prev)=>!prev)}}
          />
          <label htmlFor='number'>Numbers</label>

          <input 
          type="checkbox" 
          defaultChecked={character}
          id='character input'
          onChange={()=>{setCharacter((prev)=>!prev)}}
          />
          <label htmlFor='character'>Characters</label>
          </div>
        </div>

      </div>
    </div>  
    )
}

export default App
