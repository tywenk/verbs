import { useState, useEffect } from "react"
import Button from "@/components/Button"
import NounItem from "@/components/NounItem"

function App() {
	const [verbs, setVerbs] = useState([])
	const [nextPageInfo, setNextPageInfo] = useState({})
	const [prevPages, setPrevPages] = useState([""])

	useEffect(() => {
		fetchVerbs()
	}, [])

	async function handleNext() {
		if (nextPageInfo?.hasNextPage) {
			setPrevPages((prev) => [...prev, nextPageInfo?.endCursor])
			await fetchVerbs(nextPageInfo?.endCursor)
		}
	}

	async function handlePrev() {
		if (prevPages.length > 1) {
			await fetchVerbs(prevPages.slice(-2)[0])
			setPrevPages((prevPages) => prevPages.slice(0, -1))
		}
	}

	async function fetchVerbs(page = "") {
		const res = await fetch("https://api.zora.co/graphql", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: `
                    query Verbs {
          sales(where: {collectionAddresses: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03"}, networks: {chain: MAINNET, network: ETHEREUM}, pagination: {limit: 20, after: "${page}"}) {
            nodes {
              token {
                collectionName
                description
                name
                owner
                tokenId
                tokenUrlMimeType
                tokenUrl
              }
              sale {
                buyerAddress
                sellerAddress
                price {
                  chainTokenPrice {
                    decimal
                    currency {
                      name
                    }
                  }
                  usdcPrice {
                    decimal
                  }
                }
                saleType
                transactionInfo {
                  blockNumber
                  blockTimestamp
                  transactionHash
                }
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }`,
			}),
		})

		const verbs = await res.json()
		setNextPageInfo(verbs?.data?.sales?.pageInfo)
		setVerbs(verbs?.data?.sales?.nodes)
	}

	return (
		<div>
			<h1>Hello World</h1>
			<Button text='Prev' handleClick={handlePrev} />
			<Button text='Next' handleClick={handleNext} />
			{verbs?.length > 0 &&
				verbs.map((verb, i) => {
					return <NounItem verb={verb} key={i} />
				})}
		</div>
	)
}

export default App
