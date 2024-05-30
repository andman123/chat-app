import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Messages from "./views/Messages";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Messages />
		</QueryClientProvider>
	);
}

export default App;
