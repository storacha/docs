import "../globals.css";
import { AskCookbook } from "../components/ask-cookbook";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <AskCookbook />
      <Component {...pageProps} />
    </>
  );
}
