import { GrUpdate } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import ReactPaginate from "react-paginate";

const TableUserPaginate = (props) => {
    const { listUser, handleClickUpdate, handleClickView, handleClickDelete, fetchListUserWithPaginate, pageCount, setCurrentPage } = props

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1)
        fetchListUserWithPaginate(event.selected + 1)
    };

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 && listUser.map((item, index) => {
                        return (
                            <tr key={`table__user__${index}`}>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button className='btn btn-light' onClick={() => handleClickView(item)}><GrView /></button>
                                    <button className='btn btn-warning mx-3' onClick={() => handleClickUpdate(item)}><GrUpdate /></button>
                                    <button className='btn btn-danger' onClick={() => handleClickDelete(item)}><AiFillDelete /></button>
                                </td>
                            </tr>
                        )
                    })}

                    {listUser && listUser.length === 0 &&
                        <tr>
                            <td colSpan={4}>Không có user</td>
                        </tr>}
                </tbody>
            </table>
            <div className="user__pagination d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount} // số lượng trang dựa vào backend 
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
                    forcePage={props.currentPage - 1}
                />
            </div>
        </>
    )
}

export default TableUserPaginate