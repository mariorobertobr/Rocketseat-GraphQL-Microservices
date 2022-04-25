import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import slugify from 'slugify';
interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async listAllProducts() {
    return await this.prisma.product.findMany();
  }

  async getProductById(id: string) {
    return await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async createProduct({ title }: CreateProductParams) {
    const titleFormatted = title.toLowerCase();
    const slug = slugify(titleFormatted);

    const product = {
      title: titleFormatted,
      slug,
    };

    const productwithSlug = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (productwithSlug) {
      throw new Error('slug already exists');
    }

    return this.prisma.product.create({
      data: product,
    });
  }
}
