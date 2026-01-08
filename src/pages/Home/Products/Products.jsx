import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const Products = () => {

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
    const handleReserve= (itemcode)=>{
        axiosSecure.post(`/reserve/${itemcode}`)
        .then(res=>{
            if(res.statusText=='OK'){
                Swal.fire(
                    'Item reserved for 60 seconds!'
                ) 
                refetch(); 
            }
        })
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
                                <td> <div class="avatar">
                                    <div class="mask mask-squircle h-12 w-12">
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
                                <td>
                                    <button onClick={()=> handleReserve(item.item_code)} className="btn btn-soft btn-primary btn-xm">Reserve</button>
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