import React from "react"

function Button({ text, handleClick }) {
	return (
		<button onClick={handleClick} className='bg-slate-300 rounded-full px-2 py-1 m-2 hover:bg-slate-200'>
			<span>{text}</span>
		</button>
	)
}

export default Button
