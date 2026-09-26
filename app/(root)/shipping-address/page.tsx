import { redirect } from "next/navigation";
import { Metadata } from "next";

import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { AddressForm } from "@/components/shared/shippingAddress/addressForm";
import { ShippingAddress } from "@/types";

export const metadata: Metadata = {
  title: "Shipping Address",
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) throw new Error("No user ID");

  const user = await getUserById(userId);

  return (
    <>
      <AddressForm address={user.address as ShippingAddress} />
    </>
  );
};

export default ShippingAddressPage;
