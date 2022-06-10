import React from "react"

function Button({ text, handleClick }) {
	return (
		<button onClick={handleClick}>
			<span>{text}</span>
		</button>
	)
}

export default Button
