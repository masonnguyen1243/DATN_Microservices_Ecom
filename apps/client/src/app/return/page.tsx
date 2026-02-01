import Link from "next/link";

const ReturnPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }> | undefined;
}) => {
  const session_id = (await searchParams)?.session_id;

  if (!session_id) {
    return <div>Không tìm thấy session id!</div>;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/${session_id}`,
  );
  const data = await res.json();

  console.log("return", data);

  return (
    <div className="">
      <h1>Trạng thái đơn hàng {data.status}</h1>
      <p>Trạng thái thanh toán: {data.paymentStatus}</p>
      <Link href="/orders">Xem các đơn hàng của bạn</Link>
    </div>
  );
};

export default ReturnPage;
