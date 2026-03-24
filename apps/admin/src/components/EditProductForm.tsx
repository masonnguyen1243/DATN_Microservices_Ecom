"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ProductFormSchema,
  sizes,
  colors,
  CategoryType,
  ProductType,
} from "@repo/types";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const fetchCategory = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`,
  );
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export default function EditProductForm({ product }: { product: any }) {
  console.log("products", product);

  const router = useRouter();
  const { getToken } = useAuth();

  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),

    defaultValues: {
      name: product.name,
      shortDescription: product.shortDescription,
      description: product.description,
      price: product.price,
      inventory: product.inventory,
      categorySlug: product.categorySlug,
      sizes: product.sizes,
      colors: product.colors,
      images: product.images,
    },
  });

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof ProductFormSchema>) => {
      const token = await getToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/${product.id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) throw new Error("Không thể cập nhật sản phẩm!");
    },

    onSuccess: () => {
      toast.success("Cập nhật thành công!");
      router.push("/products");
    },

    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const colorLabels: Record<string, string> = {
    red: "Đỏ",
    blue: "Xanh dương",
    black: "Đen",
    white: "Trắng",
    yellow: "Vàng",
    green: "Xanh lá",
    pink: "Hồng",
    gray: "Xám",
    orange: "Cam",
    brown: "Nâu",
    purple: "Tím",
  };

  if (!product || !product.id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <ScrollArea className="h-screen pr-4">
        <h1 className="text-2xl font-bold mb-6">Chỉnh sửa sản phẩm</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
            className="space-y-6"
          >
            {/* NAME */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SHORT DESC */}
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả ngắn</FormLabel>
                  <Input {...field} />
                </FormItem>
              )}
            />

            {/* DESC */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <Textarea {...field} />
                </FormItem>
              )}
            />

            {/* PRICE + INVENTORY */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá</FormLabel>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="inventory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số lượng</FormLabel>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormItem>
                )}
              />
            </div>

            {/* CATEGORY */}
            {data && (
              <FormField
                control={form.control}
                name="categorySlug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Danh mục</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        {data.map((cat: CategoryType) => (
                          <SelectItem key={cat.id} value={cat.slug}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}

            {/* SIZES */}
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kích cỡ</FormLabel>
                  <div className="grid grid-cols-3 gap-3">
                    {sizes.map((size) => (
                      <div key={size} className="flex gap-2 items-center">
                        <Checkbox
                          checked={field.value?.includes(size)}
                          onCheckedChange={(checked) => {
                            const current = field.value || [];
                            if (checked) {
                              field.onChange([...current, size]);
                            } else {
                              field.onChange(current.filter((v) => v !== size));
                            }
                          }}
                        />
                        {size}
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />

            {/* COLORS */}
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Màu sắc</FormLabel>
                  <div className="grid grid-cols-3 gap-3">
                    {colors.map((color) => (
                      <div key={color} className="flex gap-2 items-center">
                        <Checkbox
                          checked={field.value?.includes(color)}
                          onCheckedChange={(checked) => {
                            const current = field.value || [];
                            if (checked) {
                              field.onChange([...current, color]);
                            } else {
                              field.onChange(
                                current.filter((v) => v !== color),
                              );
                            }
                          }}
                        />
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        {colorLabels[color]}
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />

            {/* IMAGES */}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hình ảnh</FormLabel>

                  {form.watch("colors")?.map((color) => {
                    const imageUrl = field.value?.[color];

                    return (
                      <div key={color} className="flex items-center gap-4 mb-4">
                        {/* label */}
                        <div className="flex items-center gap-2 w-24">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          {color}
                        </div>

                        {/* preview */}
                        {imageUrl && (
                          <img
                            src={imageUrl}
                            alt={color}
                            className="w-16 h-16 object-cover rounded border"
                          />
                        )}

                        {/* upload */}
                        <Input
                          type="file"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            const formData = new FormData();
                            formData.append("file", file);
                            formData.append("upload_preset", "DATN_uploads");

                            const res = await fetch(
                              `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                              {
                                method: "POST",
                                body: formData,
                              },
                            );

                            const data = await res.json();

                            if (data.secure_url) {
                              form.setValue("images", {
                                ...field.value,
                                [color]: data.secure_url,
                              });
                            }
                          }}
                        />
                      </div>
                    );
                  })}
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="cursor-pointer"
            >
              {mutation.isPending ? "Đang lưu..." : "Cập nhật"}
            </Button>
          </form>
        </Form>
      </ScrollArea>
    </div>
  );
}
