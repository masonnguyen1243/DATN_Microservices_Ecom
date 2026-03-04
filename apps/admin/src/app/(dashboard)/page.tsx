import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import AppPieChart from "@/components/AppPieChart";
import CardList from "@/components/CardList";
import TodoList from "@/components/TodoList";
import { auth } from "@clerk/nextjs/server";

const Homepage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const ordersChartData = fetch(
    `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/order-chart`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((res) => res.json());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart dataPromise={ordersChartData} />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title="Giao dịch gần nhất" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title="Sản phẩm mới nhất" />
      </div>
    </div>
  );
};

export default Homepage;
