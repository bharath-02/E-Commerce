import { Metadata } from "next";
import { redirect } from "next/navigation";

import { CheckoutSteps } from "@/components/shared/checkout/checkoutSteps";
import { PlaceOrder } from "@/components/shared/placeOrder/placeOrder";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@/auth";
import { ShippingAddress } from "@/types";

export const metadata: Metadata = {
  title: "Place Order",
};

const PlaceOrderPage = async () => {
  const cart = await getMyCart();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const user = await getUserById(userId);

  if (!cart || cart.items.length == 0) redirect("/cart");
  if (!user.address) redirect("/shipping-address");
  if (!user.paymentMethod) redirect("/payment-method");

  const userAddress = user.address as ShippingAddress;

  return (
    <>
      <CheckoutSteps current={3} />
      <PlaceOrder
        cart={cart}
        userAddress={userAddress}
        paymentMethod={user.paymentMethod}
      />
    </>
  );
};

export default PlaceOrderPage;
