import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";


const Products = () => {
    //managing purchase state
    //const [purchaseState, setPurchaseState] = useState('');

    //load products using axios and tanstack query
    const axiosSecure = useAxiosSecure();
    const fetchItems = async () => {
        const response = await axiosSecure('/items');
        //console.log(response.data);
        return response.data;
    }
    const { data: items = [], refetch } = useQuery({
        queryKey: ['sneakerItems'],
        queryFn: fetchItems
    })

    //reserve item
    const handleReserve = (itemcode) => {
        axiosSecure.post(`/reserve/${itemcode}`)
            .then(res => {
                refetch();
                if (res.statusText == 'OK') {
                    Swal.fire(
                        'Item reserved for 60 seconds!'
                    )
                    //setPurchaseState('reserved');
                }
            })
            .catch(err => {
                Swal.fire('Error', err.response?.data?.error || 'Failed', 'error');
                console.error(err);
            });
    }

    //Purchase item
    const handlePurchase = (itemcode) => {
        axiosSecure.post(`/purchase/${itemcode}`)
            .then(res => {
                refetch();
                if (res.statusText == 'OK') {
                    Swal.fire(
                        'Item purchased successfully!'
                    )
                    //setPurchaseState('');
                }
            })
            .catch(err => {
                Swal.fire('Error', err.response?.data?.error || 'Failed', 'error');
                console.error(err);
            });
    }

    return (
        <div>
            <h1>Total Products:{items.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Item Image</th>
                            <th>Item Code</th>
                            <th>Item Code</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Stock Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map(item => <tr key={item.id}>
                                <td> <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                            src={item.image}
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div></td>
                                <td>{item.item_code}</td>
                                <td>{item.item_code}</td>
                                <td>{item.item_name}</td>
                                <td>{item.price}</td>
                                <td>{item.stock}</td>
                                <td>{
                                    item.is_reserved ?
                                        (<button onClick={() => handlePurchase(item.item_code)} className="btn btn-soft btn-accent btn-xm">Purchase</button>)
                                        :
                                        <button onClick={() => handleReserve(item.item_code)} className="btn btn-soft btn-primary btn-xm">Reserve</button>

                                }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default Products; 