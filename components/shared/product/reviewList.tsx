"use client";
import { useState } from "react";

import { Review } from "@/types";
import Link from "next/link";

type Props = {
  userId: string;
  productId: string;
  productSlug: string;
};

export const ReviewList = ({ userId, productId, productSlug }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  return (
    <div className="space-y-4">
      {reviews.length === 0 && <div>No reviews yet</div>}
      {userId ? (
        <>{/* REVIEW FORM HERE */}</>
      ) : (
        <div>
          Please
          <Link
            className="text-blue-700 px-2"
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
          >
            sign in
          </Link>
          to write a review
        </div>
      )}
      <div className="flex flex-col gap-3">{/* REVIEWS HERE */}</div>
    </div>
  );
};
