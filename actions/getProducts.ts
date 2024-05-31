import prisma from '@/libs/prismadb'

export interface IProductsParams {
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getProducts(params: IProductsParams) {
  try {
    const { category, searchTerm } = params;
    let searchString = searchTerm || '';

    let query: any = {};

    if (category) {
      query.category = category;
    }

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: searchString,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return products;
  } catch (error: any) {
    throw new Error(error.message || 'Error fetching products');
  }
}
