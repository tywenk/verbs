import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client"

const client = new ApolloClient({
	uri: "https://api.zora.co/graphql",
	cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById("root")).render(
	<ApolloProvider client={client}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</ApolloProvider>
)
