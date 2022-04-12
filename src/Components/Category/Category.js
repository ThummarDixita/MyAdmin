import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect, forwardRef } from 'react'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Clear from '@material-ui/icons/Clear'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { AddBox } from '@material-ui/icons'
import MaterialTable from 'material-table'
import { MuiThemeProvider } from '@material-ui/core'
import Navbar from '../Navbar/Navbar'
import DeleteModal from '../common/DeleteModel'
import { ToastContainer, toast } from 'react-toastify';
import { API } from '../config/Config'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    VisibilityIcon: forwardRef((props, ref) => (
        <VisibilityIcon {...props} ref={ref} />
    ))
}

function Category() {
    const [data, setData] = useState([])
    const [userIdToDelete, setUserIdToDelete] = useState("")
    const [reloadListing, setReloadListing] = useState(0)
    const [showDeleteModal, setDeleteShowModal] = useState(false)
    const fieldLabel = [
        { title: 'Category', field: 'category' },
    ]
    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const result = await axios.get(API)
        console.log("result", result);
        setData(result.data)

    }

    const handleRemoveUser = (id) => {
        setDeleteShowModal(true)
        setUserIdToDelete(id);
    }

    const hideDeleteModal = () => {
        setDeleteShowModal(false)
        setUserIdToDelete("")

    }


    const removeData = () => {
        if (userIdToDelete && userIdToDelete !== "") {
            setUserIdToDelete("")
            console.log("userIdToDelete", userIdToDelete);
            axios
                .delete(`${API}/${userIdToDelete}`)
                .then(res => {
                    if (res && res.status === 200) {
                        setDeleteShowModal(false)
                        toast.success('Category Delete Successfully.')
                        setReloadListing(reloadListing + 1)
                        getData()
                    }
                })
                .catch(error => {
                    console.log('error', error)
                    toast.error('Failed To Delete User , Error')
                })
        }
    }


    return (
        <div>
            <Navbar />
            <div className='displayCard'>
                <div className='cardTitle'>
                    <Link to="/addcategory">
                        <button
                            style={{ float: "right", margin: "20px" , marginRight:"8vh"}}
                            title="Add Category"
                            className="btn btn-success"
                        >Add Category</button>
                    </Link>
                </div>
                <DeleteModal
                    showDeleteModal={showDeleteModal}
                    onHide={hideDeleteModal}
                    clickedNo={hideDeleteModal}
                    clickedYes={removeData}
                />
                <div className='container mt-2' style={{ width: '100%' }}>

                    <ToastContainer />
                    <MuiThemeProvider /* theme={theme} */>
                        <MaterialTable
                            icons={tableIcons}
                            title='category'
                            columns={fieldLabel}
                            data={data}
                            options={{
                                filtering: true,
                                paging: true,
                                paginationType: 'stepped',
                                pageSize: 10,
                                actionsColumnIndex: -1,
                                pageSizeOptions: [10, 20, 30]
                            }}
                            actions={[
                                // {
                                //     icon: VisibilityIcon,
                                //     tooltip: 'View',
                                //     onClick: (event, rowData) => {
                                //         // handleShowDetails(rowData.id)
                                //     }
                                // },
                                {
                                    icon: DeleteOutline,
                                    tooltip: 'Delete',
                                    onClick: (event, rowData) => {
                                        handleRemoveUser(rowData._id)
                                    }
                                }
                            ]}
                        />
                    </MuiThemeProvider>

                </div>

            </div>

        </div>



    )
}

export default Category