import { Footer, Navbar } from "@/components";
import "./globals.css";

export const metadata = {
  title: "Carchronicle",
  description: "The car's hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
