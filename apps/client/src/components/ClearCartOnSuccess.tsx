"use client";

import { useEffect } from "react";
import useCartStore from "@/store/cartStore";

const ClearCartOnSuccess = ({ isSuccess }: { isSuccess: boolean }) => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    if (isSuccess) {
      console.log("Clearing cart...");
      clearCart();
    }
  }, [isSuccess]);

  return null;
};

export default ClearCartOnSuccess;
