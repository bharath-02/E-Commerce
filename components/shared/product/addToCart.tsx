"use client";
import { useRouter } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Cart, CartItem } from "@/types";

type Props = {
  cart?: Cart;
  item: CartItem;
};

export const AddToCart = ({ cart, item }: Props) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    const response = await addItemToCart(item);

    if (response && !response.success) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message, {
      action: {
        label: "Go To Cart",
        onClick: () => router.push("/cart"),
      },
    });
  };

  const handleRemoveFromCart = async () => {
    const response = await removeItemFromCart(item.productId);

    if (response && !response.success) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);

    return;
  };

  // check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        <Minus className="h-4 w-4" />
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus /> Add To Cart
    </Button>
  );
};
