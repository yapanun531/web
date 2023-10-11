'use client';
import {useState} from 'react';
export default function MyButton() {
  const [nums, setCount] = useState<number[]>([]);
  function handleClick() {
    let num = Math.floor(Math.random() * 11);

    setCount(nums => [...nums, num])

    
} 
  
return (
    
    <div>
    <button onClick={handleClick}>
      點我增加數字
    </button>
    {nums.map((x)=> x+" ")}
    </div>

  );
}