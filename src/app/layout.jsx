import Navbar from "@/components/Layout/NavBar";
import "./globals.css";
import { ToastContainer } from "./toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/components/Auth/Auth";

export const metadata = {
  title: "EduBoard - Digital Notice Board",
  description: "Digital Board System for instant notifications",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
