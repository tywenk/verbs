import dayjs from "dayjs"
import { useState, useEffect } from "react"

function NounItem({ verb }) {
	const { token, sale } = verb
	const [marketplace, setMarketplace] = useState({ name: "", url: "" })

	const dataURI = token.tokenUrl
	const json = atob(dataURI.substring(29))
	const result = JSON.parse(json)

	var usdcFormatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",

		// These options are needed to round to whole numbers if that's what you want.
		//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
		//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
	})

	// OPENSEA_SINGLE_SALE
	// OPENSEA_BUNDLE_SALE
	// LOOKS_RARE_SALE
	// SUPERRARE_SALE
	// RARIBLE_SALE
	// ZORA_V3_ASK_SALE
	// ZORA_V2_AUCTION_SALE
	// FOUNDATION_SALE
	// ZEROX_SALE
	// RARIBLE_SALE

	useEffect(() => {
		switch (sale.saleType) {
			case "OPENSEA_SINGLE_SALE" || "OPENSEA_BUNDLE_SALE":
				setMarketplace({
					name: "OpenSea",
					url: `https://opensea.io/assets/ethereum/0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03/${token.tokenId}`,
				})
				break
			case "ZORA_V3_ASK_SALE" || "ZORA_V2_AUCTION_SALE":
				setMarketplace({
					name: "Zora",
					url: `https://zora.co/collections/0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03/${token.tokenId}`,
				})
				break
			case "LOOKS_RARE_SALE":
				setMarketplace({
					name: "LooksRare",
					url: `https://looksrare.org/collections/0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03/${token.tokenId}`,
				})
				break
			case "RARIBLE_SALE":
				setMarketplace({
					name: "Rarible",
					url: `https://rarible.com/token/0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03:${token.tokenId}`,
				})
				break

			case "ZEROX_SALE":
				setMarketplace({
					name: "0x",
					url: null,
				})
				break
			case "SUPERRARE_SALE":
				setMarketplace({
					name: "SuperRare",
					url: `https://opensea.io/assets/ethereum/0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03/${token.tokenId}`,
				})
				break
			default:
				break
		}
	}, [])

	return (
		<div>
			<h1>{token.name}</h1>
			<div>
				<img src={`${result.image}`} />
			</div>
			<div>
				<p>Buyer: {sale.buyerAddress}</p>
				<p>Seller: {sale.sellerAddress}</p>
				<p>
					Price: {sale.price.chainTokenPrice.decimal} {sale.price.chainTokenPrice.currency.name} (
					{usdcFormatter.format(sale.price.usdcPrice.decimal)})
				</p>
				<p>When: {dayjs(sale.transactionInfo.blockTimestamp).format("MMM DD, YYYY – hh:mm A")}</p>
				<p>
					<a
						href={`https://etherscan.io/tx/${sale.transactionInfo.transactionHash}`}
						target='_blank'
						rel='noopener noreferrer'
					>
						TxHash
					</a>
				</p>
				<p>
					Marketplace: {marketplace.name}{" "}
					<a href={marketplace.url ? marketplace.url : ""} target='_blank' rel='noopener noreferrer'>
						Link
					</a>
				</p>
			</div>
		</div>
	)
}

export default NounItem
