import Auth from "@/pages/Auth";
import Navbar from "@/components/NavBar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Auth login={true} />
    </>
  );
}

export default App;
