import { Navbar } from "./Navbar";

export function WithNavbar({ children }) {
    return (
      <div>
        <Navbar />
        {children}
      </div>
    );
}