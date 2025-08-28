// pages/_app.jsx
import '@/styles/globals.css'; // Global CSS goes here

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
