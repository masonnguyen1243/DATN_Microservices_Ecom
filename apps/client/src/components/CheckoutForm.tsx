import useCartStore from "@/store/cartStore";
import { ShippingFormInputs } from "@repo/types";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useCheckout } from "@stripe/react-stripe-js";
import { ConfirmError } from "@stripe/stripe-js";
import { useState } from "react";

const CheckoutForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const checkout = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ConfirmError | null>(null);

  const { clearCart } = useCartStore();

  const handleClick = async () => {
    setLoading(true);

    await checkout.updateEmail(shippingForm.email);
    await checkout.updateShippingAddress({
      name: "shipping_address",
      address: {
        line1: shippingForm.address,
        city: shippingForm.city,
        country: "VN",
      },
    });

    const res = await checkout.confirm();
    if (res.type === "error") {
      setError(res.error);
    } else {
      clearCart();
    }
    setLoading(false);
  };

  return (
    <form>
      <PaymentElement options={{ layout: "accordion" }} />
      <button
        type="button"
        disabled={loading}
        onClick={handleClick}
        className="
    w-full mt-6
    rounded-lg
    bg-black text-white
    py-3 px-4
    font-medium
    transition-all
    hover:bg-gray-800
    active:scale-[0.98]
    disabled:opacity-60
    disabled:cursor-not-allowed
    cursor-pointer
  "
      >
        {loading ? "Đang xử lý thanh toán..." : "Thanh toán"}
      </button>

      {error && <div className="">{error.message}</div>}
    </form>
  );
};
export default CheckoutForm;
