"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StarIcon } from "lucide-react";
import { toast } from "sonner";
import z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createOrUpdateReview,
  getReviewByProductId,
} from "@/lib/actions/review.actions";
import { reviewFormDefaultValues } from "@/lib/constants";
import { insertReviewSchema } from "@/lib/validators";

type Props = {
  userId: string;
  productId: string;
  onReviewSubmitted: () => void;
};

export const ReviewForm = ({ userId, productId, onReviewSubmitted }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm<
    z.input<typeof insertReviewSchema>,
    undefined,
    z.output<typeof insertReviewSchema>
  >({
    resolver: zodResolver(insertReviewSchema),
    defaultValues: reviewFormDefaultValues,
  });

  const handleOpenForm = async () => {
    form.setValue("productId", productId);
    form.setValue("userId", userId);

    const review = await getReviewByProductId({ productId });
    if (review) {
      form.setValue("title", review.title);
      form.setValue("description", review.description);
      form.setValue("rating", review.rating);
    }

    setOpen(true);
  };

  const onSubmit: SubmitHandler<z.infer<typeof insertReviewSchema>> = async (
    values,
  ) => {
    const res = await createOrUpdateReview({ ...values, productId });

    if (!res.success) {
      return toast.error(res.message);
    }

    setOpen(false);
    onReviewSubmitted();
    toast.success(res.message);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={handleOpenForm} variant={"default"}>
        Write a Review
      </Button>
      <DialogContent className="sm:max-w-106.25">
        <Form {...form}>
          <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
              <DialogDescription>
                Share your thoughts with other customers
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter description" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <SelectItem
                            key={index}
                            value={(index + 1).toString()}
                          >
                            {index + 1} <StarIcon className="inline h-4 w-4" />
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                size={"lg"}
                className={"w-full"}
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
