import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { BadgeCheck, Candy, Citrus, Shield } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import EditUser from "@/components/EditUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppLineChart from "@/components/AppLineChart";
import { auth, User } from "@clerk/nextjs/server";

const getData = async (id: string): Promise<User | null> => {
  const { getToken } = await auth();
  const token = await getToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_USER_SERVICE_URL}/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const SingleUserPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const data = await getData(id);

  return (
    <div className="">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/users">Users</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {data?.firstName + " " + data?.lastName || data?.username || "-"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* CONTAINER */}
      <div className="mt-4 flex flex-col xl:flex-row gap-8">
        {/* LEFT */}
        <div className="w-full xl:w-1/3 space-y-6">
          {/* USER CARD CONTAINER */}
          <div className="bg-primary-foreground p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="size-12">
                <AvatarImage src={data?.imageUrl} />
                <AvatarFallback>
                  {data?.firstName?.charAt(0) ||
                    data?.username?.charAt(0) ||
                    "-"}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-semibold">
                {data?.firstName + " " + data?.lastName ||
                  data?.username ||
                  "-"}
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
              voluptas distinctio ab ipsa commodi fugiat labore quos veritatis
              cum corrupti sed repudiandae ipsum, harum recusandae ratione ipsam
              in, quis quia.
            </p>
          </div>
          {/* INFORMATION CONTAINER */}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Thông tin người dùng</h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button>Chỉnh sửa</Button>
                </SheetTrigger>
                <EditUser />
              </Sheet>
            </div>
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-2">
                <span className="font-bold">Tên người dùng:</span>
                <span>
                  {data?.firstName + " " + data?.lastName ||
                    data?.username ||
                    "-"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Email:</span>
                <span>{data?.emailAddresses[0]?.emailAddress || "-"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Số điện thoại:</span>
                <span>{data?.phoneNumbers[0]?.phoneNumber || "-"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Vai trò:</span>
                <span>{String(data?.publicMetadata?.role) || "-"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Trạng thái:</span>
                <span>{data?.banned ? "Bị ban" : "Đang hoạt động"}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Tham gia {new Date(data?.createdAt).toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full xl:w-2/3 space-y-6">
          {/* CHART CONTAINER */}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <h1 className="text-xl font-semibold">User Activity</h1>
            <AppLineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
