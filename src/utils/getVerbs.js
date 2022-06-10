import { gql } from "@apollo/client"

export const GET_VERBS = gql`
	query Verbs($page: String!) {
		sales(
			where: {
				collectionAddresses: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03"
				# not: { sellerAddresses: "0x0000000000000000000000000000000000000000" }
			}
			networks: { chain: MAINNET, network: ETHEREUM }
			pagination: { limit: 10, after: $page }
			sort: { sortKey: TIME, sortDirection: DESC }
			filter: {
				saleTypes: [
					OPENSEA_SINGLE_SALE
					OPENSEA_BUNDLE_SALE
					LOOKS_RARE_SALE
					SUPERRARE_SALE
					RARIBLE_SALE
					ZORA_V3_ASK_SALE
					ZORA_V2_AUCTION_SALE
					FOUNDATION_SALE
					CRYPTOPUNKS_SALE
					ZEROX_SALE
					RARIBLE_SALE
				]
			}
		) {
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
	}
`
