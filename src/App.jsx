import { useState, useEffect } from "react"
import Button from "@/components/Button"
import NounItem from "@/components/NounItem"
import { useQuery } from "@apollo/client"
import { GET_VERBS } from "@/utils/getVerbs"

function App() {
	const [prevPages, setPrevPages] = useState([""])
	const [currentPage, setCurrentPage] = useState("")

	const { loading, error, data } = useQuery(GET_VERBS, { variables: { page: currentPage } })

	async function handleNext() {
		if (data.sales.pageInfo.hasNextPage) {
			setPrevPages((prev) => [...prev, data.sales.pageInfo.endCursor])
			setCurrentPage(data.sales.pageInfo.endCursor)
		}
	}

	async function handlePrev() {
		if (prevPages.length > 1) {
			setCurrentPage(prevPages.slice(-2)[0])
			setPrevPages((prevPages) => prevPages.slice(0, -1))
		}
	}

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error</div>

	console.log(data)

	return (
		<div>
			<h1>Hello World</h1>
			<Button text='Prev' handleClick={handlePrev} />
			<Button text='Next' handleClick={handleNext} />
			{data?.sales?.nodes.map((verb, i) => {
				return <NounItem verb={verb} key={i} />
			})}
		</div>
	)
}

export default App
