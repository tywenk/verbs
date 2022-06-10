import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient, WagmiConfig } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

const client = new ApolloClient({
	uri: "https://api.zora.co/graphql",
	cache: new InMemoryCache(),
})

const { chains, provider } = configureChains(
	[chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
	[alchemyProvider({ alchemyId: process.env.VITE_ALCHEMY_API_KEY }), publicProvider()]
)

const { connectors } = getDefaultWallets({
	appName: "My RainbowKit App",
	chains,
})

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
})

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider chains={chains}>
					<App />
				</RainbowKitProvider>
			</WagmiConfig>
		</ApolloProvider>
	</React.StrictMode>
)
