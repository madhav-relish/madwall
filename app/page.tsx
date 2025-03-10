import { Dashboard } from "@/components/Dashboard";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script 
        src="http://localhost:4000/script.js" 
        data-website-id="358005b5-1955-4243-b3ef-900dbce89999"
        strategy="afterInteractive"
      />
      <div className="p-4 flex flex-col items-center">
        <MantineProvider forceColorScheme="dark">
          <Dashboard/>
        </MantineProvider>
      </div>
    </>
  );
}
