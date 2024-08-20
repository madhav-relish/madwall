import { Dashboard } from "@/components/Dashboard";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';

export default function Home() {
  return (
    <div className="p-4 flex flex-col items-center">
      <MantineProvider forceColorScheme="dark" >
      <Dashboard/>
      </MantineProvider>
    </div>
  );
}
