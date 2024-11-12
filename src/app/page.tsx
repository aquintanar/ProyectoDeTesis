import Auth from "./pages/Auth";
import ToasterProvider from "./providers/ToasterProvider";



export default async function Home() {
  return (
    <>
      <ToasterProvider/>
      <Auth/>
    </>
  );
}
