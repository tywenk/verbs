import dayjs from "dayjs"

function NounItem({ verb }) {
	const { token, sale } = verb

	const dataURI = token.tokenUrl
	const json = atob(dataURI.substring(29))
	const result = JSON.parse(json)

	console.log(sale)

	var usdcFormatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",

		// These options are needed to round to whole numbers if that's what you want.
		//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
		//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
	})

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
			</div>
		</div>
	)
}

export default NounItem
