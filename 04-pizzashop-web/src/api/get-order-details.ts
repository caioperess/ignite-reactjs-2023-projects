import { api } from '@/lib/axios'

export interface IGetOrderDetailsParams {
  orderId: string
}

export interface IGetOrderDetailsResponse {
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  id: string
  createdAt: string
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

export async function getOrderDetails({ orderId }: IGetOrderDetailsParams) {
  const response = await api.get<IGetOrderDetailsResponse>(`/orders/${orderId}`)

  return response.data
}
