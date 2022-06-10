import React from "react"

function NounItem({ verb }) {
	const { token, sale } = verb

	return (
		<div>
			<h1>{token.name}</h1>
		</div>
	)
}

export default NounItem
