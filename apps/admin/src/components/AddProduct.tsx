"use client";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import { CategoryType, colors, ProductFormSchema, sizes } from "@repo/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/nextjs";

const fetchCategory = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories!");
  }

  return await res.json();
};

const AddProduct = () => {
  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      price: 0,
      categorySlug: "",
      sizes: [],
      colors: [],
      images: {},
    },
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
  });

  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof ProductFormSchema>) => {
      const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Không thể thêm sản phẩm!");
      }
    },
    onSuccess: () => {
      toast.success("Sản phẩm đã được tạo thành công!");
    },
    onError: (error) => {
      console.log(error);

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

  return (
    <SheetContent>
      <ScrollArea className="h-screen">
        <SheetHeader>
          <SheetTitle className="mb-4">Thêm sản phẩm</SheetTitle>
          <SheetDescription asChild>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Nhập vào tên của sản phẩm.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả ngắn</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Nhập vào mô tả ngắn của sản phẩm.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả sản phẩm</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormDescription>
                        Nhập vào mô tả của sản phẩm
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Nhập vào giá của sản phẩm (đơn vị VNĐ)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {data && (
                  <FormField
                    control={form.control}
                    name="categorySlug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Danh mục</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
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
                        </FormControl>
                        <FormDescription>
                          Chọn danh mục cho sản phẩm
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="sizes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kích cỡ</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-3 gap-4 my-2">
                          {sizes.map((size) => (
                            <div key={size} className="flex items-center gap-2">
                              <Checkbox
                                id="size"
                                checked={field.value?.includes(size)}
                                onCheckedChange={(checked) => {
                                  const currentValues = field.value || [];
                                  if (checked) {
                                    field.onChange([...currentValues, size]);
                                  } else {
                                    field.onChange(
                                      currentValues.filter(
                                        (value) => value !== size,
                                      ),
                                    );
                                  }
                                }}
                              />
                              <label htmlFor="size" className="text-sm">
                                {size}
                              </label>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Chọn kích cỡ cho sản phẩm. Bạn có thể chọn nhiều kích cỡ
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="colors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Màu sắc</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4 my-2">
                            {colors.map((color) => (
                              <div
                                key={color}
                                className="flex items-center gap-2"
                              >
                                <Checkbox
                                  id="color"
                                  checked={field.value?.includes(color)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || [];
                                    if (checked) {
                                      field.onChange([...currentValues, color]);
                                    } else {
                                      field.onChange(
                                        currentValues.filter(
                                          (value) => value !== color,
                                        ),
                                      );
                                    }
                                  }}
                                />
                                <label
                                  htmlFor="color"
                                  className="text-sm flex items-center gap-2"
                                >
                                  <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: color }}
                                  />
                                  {colorLabels[color] || color}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Chọn màu sắc cho sản phẩm. Bạn có thể chọn nhiều màu sắc
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hình ảnh</FormLabel>
                      <FormControl>
                        <div className="">
                          {form.watch("colors")?.map((color) => (
                            <div
                              className="mb-4 flex items-center gap-4"
                              key={color}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-4 w-4 rounded-full"
                                  style={{ backgroundColor: color }}
                                />
                                <span className="text-sm font-medium min-w-20">
                                  {colorLabels[color] || color}:
                                </span>
                              </div>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    try {
                                      const formData = new FormData();
                                      formData.append("file", file);
                                      formData.append(
                                        "upload_preset",
                                        "monorepo-ecom",
                                      );

                                      const res = await fetch(
                                        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                                        {
                                          method: "POST",
                                          body: formData,
                                        },
                                      );

                                      const data = await res.json();

                                      if (data.secure_url) {
                                        const currentImage =
                                          form.getValues("images") || {};
                                        form.setValue("images", {
                                          ...currentImage,
                                          [color]: data.secure_url,
                                        });
                                      }
                                    } catch (error) {
                                      console.log(error);
                                      toast.error("Load ảnh thất bại!");
                                    }
                                  }
                                }}
                              />
                              {field.value?.[color] ? (
                                <span className="text-green-600 text-sm">
                                  Chọn ảnh thành công!
                                </span>
                              ) : (
                                <span className="text-red-600 text-sm">
                                  Chưa chọn ảnh!
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {mutation.isPending ? "Đang tạo..." : "Tạo sản phẩm"}
                </Button>
              </form>
            </Form>
          </SheetDescription>
        </SheetHeader>
      </ScrollArea>
    </SheetContent>
  );
};

export default AddProduct;
