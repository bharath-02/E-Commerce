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
  return <div>STRIPE FORM</div>;
};
