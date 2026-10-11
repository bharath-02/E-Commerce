"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "@/lib/utils";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "@/lib/constants";

// Get latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(data);
}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug },
  });
}

// Get all products
export async function getAllProducts({
  limit = PAGE_SIZE,
  page,
  query,
  category,
}: {
  limit?: number;
  page: number;
  query: string;
  category?: string;
}) {
  const data = await prisma.product.findMany({
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.product.count();

  return { data, totalPages: Math.ceil(dataCount / limit) };
}
