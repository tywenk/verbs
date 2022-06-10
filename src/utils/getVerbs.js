import { gql } from "@apollo/client"

export const GET_VERBS = gql`
	query Verbs($page: String!) {
		sales(
			where: { collectionAddresses: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03" }
			networks: { chain: MAINNET, network: ETHEREUM }
			pagination: { limit: 20, after: $page }
		) {
			nodes {
				token {
					collectionName
					description
					name
					owner
					tokenId
					tokenUrlMimeType
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
	}
`
