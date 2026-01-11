import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";
import SearchBar from "./SearchBar";
import Header from "./Header";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import ProfileButton from "./ProfileButton";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between border-b border-b-gray-200 pb-4">
      {/* Left */}
      <Link href={"/"} className="flex items-center">
        <Image src="/logo.png" alt="logo" width={150} height={45} />
      </Link>

      <Header />

      {/* Right */}
      <div className="flex items-center gap-6">
        <SearchBar />
        <Link href={"/"}>
          <Home className="w-4 h-4 text-gray-600" />
        </Link>
        <ShoppingCartIcon />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <ProfileButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
