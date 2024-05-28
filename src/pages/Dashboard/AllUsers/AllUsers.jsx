import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        console.log(user)
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDeleteUsers = user => {
        console.log('Delete', user)
        const swalWithDaisyUIButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success mr-2",
                cancelButton: "btn btn-error ml-2"
            },
            buttonsStyling: false
        });


        swalWithDaisyUIButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            // reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch()
                            swalWithDaisyUIButtons.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithDaisyUIButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });
    }

    return (
        <div>
            <div className="flex justify-between mr-4">
                <h2 className="text-2xl">All Users</h2>
                <h2 className="text-2xl">Total Users : {users.length}</h2>
            </div>
            <div className="overflow-x-auto mt-6">
                <table className="table table-auto">
                    {/* head */}
                    <thead>
                        <tr className="bg-orange-500 rounded-2xl text-white text-lg">
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, idx) => <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? 'Admin' :
                                        <button
                                            onClick={() => { handleMakeAdmin(user) }}
                                            className="btn bg-orange-500 hover:bg-orange-700 btn-lg"><FaUsers className='text-white text-2xl' /></button>
                                    }


                                </td>
                                <td>

                                    <button
                                        onClick={() => { handleDeleteUsers(user) }}
                                        className="btn btn-ghost btn-lg"><FaTrashAlt className='text-red-600 text-2xl' /></button>

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;