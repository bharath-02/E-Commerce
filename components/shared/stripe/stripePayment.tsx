import { useTheme } from "next-themes";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { StripeForm } from "./stripeForm";

type Props = {
  priceInCents: number;
  orderId: string;
  clientSecret: string;
};

export const StripePayment = ({
  priceInCents,
  orderId,
  clientSecret,
}: Props) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
  );

  const { theme, systemTheme } = useTheme();

  return (
    <Elements
      options={{
        clientSecret,
        appearance: {
          theme:
            theme === "dark"
              ? "night"
              : theme === "light"
                ? "stripe"
                : systemTheme === "light"
                  ? "stripe"
                  : "night",
        },
      }}
      stripe={stripePromise}
    >
      <StripeForm priceInCents={priceInCents} orderId={orderId} />
    </Elements>
  );
};
