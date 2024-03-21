import { http, HttpResponse } from 'msw'

import { IGetOrdersResponse } from '../get-orders'

type Orders = IGetOrdersResponse['orders']
type OrderStatus = IGetOrdersResponse['orders'][number]['status']

const statuses: OrderStatus[] = [
  'pending',
  'processing',
  'canceled',
  'delivered',
  'delivering',
]

const orders: Orders = Array.from({ length: 60 }).map((_, i) => ({
  orderId: `order-${i + 1}`,
  customerName: `customer-${i + 1}`,
  status: statuses[i % 5],
  total: Math.ceil(Math.random() * 1000),
  createdAt: new Date().toISOString(),
}))

export const getOrdersMock = http.get<never, never, IGetOrdersResponse>(
  '/orders',
  async ({ request }) => {
    const { searchParams } = new URL(request.url)

    const pageIndex = searchParams.get('pageIndex')
      ? Number(searchParams.get('pageIndex'))
      : 0
    const customerName = searchParams.get('customerName')
    const orderId = searchParams.get('orderId')
    const status = searchParams.get('status')

    let filteredOrders = orders

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerName),
      )
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.includes(orderId),
      )
    }

    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    )

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    })
  },
)
