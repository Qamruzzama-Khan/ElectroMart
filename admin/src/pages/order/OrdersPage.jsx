import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { fetchOrders, updateOrderStatus } from '../../services/api/orderApi';
import { useAuthContext } from '../../hooks/useAuth';

const OrdersPage = () => {
    const [orders, setOrders] = useState();
    const {user} = useAuthContext();
    const [updateForm, setUpdateForm] = useState({
      status: "",
    })
    const [status, setStatus] = useState("")
 
    useEffect(() => {
        const getOrders = async () => {
            const response = await fetchOrders(user?.accessToken);
            console.log(response.data.data)
            setOrders(response.data.data)
        }
        getOrders();
    }, [])

    const handleUpdateOrderStatus = async (e, orderId) => {
      const {value} = e.target;
      setStatus(value)
      const response = await updateOrderStatus(orderId, value, user?.accessToken);
    }

  return (
    <div className='mt-5'>
      <table className="min-w-full table-auto border-collapse rounded overflow-hidden">
  <thead className="bg-gray-200 text-gray-700">
    <tr>
      <th className="py-2 px-4 text-left font-medium">Sr.No</th>
      <th className="py-2 px-4 text-left font-medium">Items</th>
      <th className="py-2 px-4 text-left font-medium">Total Bill</th>
      <th className="py-2 px-4 text-left font-medium">Status</th>
    </tr>
  </thead>
  <tbody className="bg-white text-gray-800">
    {orders && orders.map((order, index) => (
      <tr key={order._id} className="border-b">
        <td className="py-3 px-4">{index + 1}</td>
        <td className="py-3 px-4">{order.totalItems}</td>
        <td className="py-3 px-4">{order.totalBill}</td>
        <td className="py-3 px-4">
          <select onChange={(e) => handleUpdateOrderStatus(e, order._id)} className="bg-gray-50 border rounded-md px-3 py-1 ">

            <option value={order.status}>{order.status}</option>

            <option value={order.status === "shipped" ? "pending" : "shipped"}>{order.status === "shipped" ? "pending" : "shipped"}</option>
            
          </select>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  )
}

export default OrdersPage
