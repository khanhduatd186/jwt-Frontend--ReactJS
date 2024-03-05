import { useContext, useEffect, useState } from 'react';
import './Users.scss'
import { fetchAllUser, DeleteUserById } from '../../Services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalUser from './ModalUser';
import { set } from 'lodash';
import { useDispatch } from 'react-redux'
import { fetchAllUserData } from '../../redux/action/action';
const Users = (props) => {

    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(2);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [actionModalUser, setActionModalUser] = useState("CREATE")
    const [dataModelUser, setDataModelUser] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        // fetchUsers();
        dispatch(fetchAllUserData());

    }, [currentPage])


    // const fetchUsers = async () => {
    //     let response = await fetchAllUser(currentPage, currentLimit);

    //     if (response && response.EC === 0) {
    //         setListUser(response.DT.users)
    //         setTotalPages(response.DT.totalPages)
    //         console.log("check res: ", response)
    //     }
    // }
    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);
    }
    const handleDeleteUser = async (user) => {

        let response = await DeleteUserById(user);
        if (response && +response.EC === 0) {
            toast.success(response.EM);
            //await fetchUsers();
        }
        else {
            toast.error(response.EM);
        }
    }
    const onHideModalUser = () => {
        setIsShowModalUser(false);
    }
    const handleUpdateUser = (user) => {
        setActionModalUser("UPDATE");
        setDataModelUser(user);
        setIsShowModalUser(true);
    }
    const handleAddNew = () => {
        setActionModalUser("CREATE");
        setIsShowModalUser(true);
        setDataModelUser({});
    }
    return (
        <>
            <div className='container'>
                <div className='manager-users-container'>
                    <div className='user-header'>
                        <div className='title'>
                            <h3>Table Users</h3>
                        </div>
                        <div className='action'>
                            <button className='btn btn-success'>Refesh</button>
                            <button className='btn btn-primary' onClick={() => handleAddNew()}>Add New User</button>

                        </div>

                    </div>
                    <div className='user-body'>
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">NO</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">User</th>
                                    <th scope="col">Group</th>
                                    <th scope="col">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {listUser && listUser.length > 0 ?
                                    <>
                                        {listUser.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>
                                                        {(currentPage - 1) * currentLimit + index + 1}
                                                    </td>
                                                    <td>
                                                        {item.id}
                                                    </td>
                                                    <td>
                                                        {item.email}

                                                    </td>
                                                    <td>
                                                        {item.phone}

                                                    </td>
                                                    <td>
                                                        {item.username}

                                                    </td>
                                                    <td>
                                                        {item.Group ? item.Group.name : ''}

                                                    </td>
                                                    <td>
                                                        <button className='btn btn-warning mx-3' onClick={() => handleUpdateUser(item)}>Edit</button>
                                                        <button className='btn btn-danger' onClick={() => handleDeleteUser(item)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        <tr>
                                            <td>
                                                Not Found users
                                            </td>
                                        </tr>



                                    </>

                                }

                            </tbody>
                        </table>


                    </div>
                    {totalPages > 0 &&
                        <div className='user-footer'>
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={1}
                                marginPagesDisplayed={1}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }

                </div>



            </div>
            <ModalUser

                show={isShowModalUser}
                onHide={onHideModalUser}
                action={actionModalUser}
                dataModelUser={dataModelUser}
            //fetchUsers={fetchUsers}
            />
        </>


    )
}
export default Users;