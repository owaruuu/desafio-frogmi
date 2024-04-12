import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import ListaTerremotos from "./components/ListaTerremotos";
import FilterControls from "./components/FilterControls";
import Container from "./components/Container";

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false, // default: true
            },
        },
    });

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Container />
            </QueryClientProvider>
        </>
    );
}

export default App;
