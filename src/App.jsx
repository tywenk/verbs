import { useState, useEffect } from "react"
import Button from "@/components/Button"
import NounItem from "@/components/NounItem"
import { useQuery } from "@apollo/client"
import { GET_VERBS } from "@/utils/getVerbs"

function App() {
	const [prevPages, setPrevPages] = useState([""])
	const [currentPage, setCurrentPage] = useState("")

	const { loading, error, data } = useQuery(GET_VERBS, {
		variables: { page: currentPage },
		context: {
			headers: {
				"X-API-KEY": import.meta.env.VITE_ZORA_API_KEY, // this header will reach the server
			},
		},
	})

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

	// if (loading) return <div>Loading...</div>
	// if (error) return <div>Error</div>

	console.log(data)

	return (
		<div>
			<Button text='Prev' handleClick={handlePrev} />
			<Button text='Next' handleClick={handleNext} />
			{loading && <div>Loading...</div>}
			{error && <div>Error</div>}
			{data && (
				<div className='grid grid-cols-2'>
					{data?.sales?.nodes.map((verb, i) => {
						return <NounItem verb={verb} key={i} />
					})}
				</div>
			)}
		</div>
	)
}

export default App
