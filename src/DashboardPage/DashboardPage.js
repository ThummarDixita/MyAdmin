import { useState, forwardRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
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
import { AddBox, EditRounded, } from '@material-ui/icons'
import MaterialTable from 'material-table'
import { MuiThemeProvider } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify';
import DeleteModal from '../Components/common/DeleteModel';
import EditUser from './EditUser';

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

function DashboardPage() {
  const [userIdToDelete, setUserIdToDelete] = useState()
  const [reloadListing, setReloadListing] = useState(0)
  const [showDeleteModal, setDeleteShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [isEdit, setIsEdit] = useState('')
  const navigate = useNavigate()

  const fieldLabel = [
    { title: 'UserName.', field: 'username' },
    { title: 'Mobile No.', field: 'mobile_number' },
    { title: 'Password', field: 'password' }
  ]


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
      axios
        .delete(`https://nodehostheroku.herokuapp.com/register/${userIdToDelete}`)
        .then(res => {
          if (res && res.status === 200) {
            setDeleteShowModal(false)
            toast.success('User Delete Successfully.')
            setReloadListing(reloadListing + 1)
          }
        })
        .catch(error => {
          console.log('error', error)
          toast.error('Failed To Delete User , Error')
        })
    }
  }

  const handleShowDetails = (data) => {
    return navigate(`/view/${data._id}`, { state: data })
  }

  const handleEditUser = (data) => {
    setShowEditModal(true)
    console.log("idddddddd", data._id);
    setIsEdit({ id: data._id, state: data })
    // return navigate(`/edit/${data._id}`,{state:data})
  }

  const getPageWiseData = async (query) => {
    console.log("query", query);
    let limit = query.pageSize
    let resp = true
    let count = 0;
    let offset = query.page * query.pageSize
    console.log("offsetoffsetoffsetoffset", offset);
    console.log(`https://nodehostheroku.herokuapp.com/register?limit=${limit}&offset=${offset}`);
    const res = await axios.get(`https://nodehostheroku.herokuapp.com/register?limit=${limit}&offset=${offset}`)
    if (res?.data?.data) {
      console.log("res.datares.datares.datares.data", res.data);
      count = res.data.count
      resp = {
        data: res.data.data,
        page: query.page,
        totalCount: count ? count : -1,
      }
    }
    console.log("ressss", resp);
    return resp
  }
  return (
    <div>
      <Navbar />
      <DeleteModal
        showDeleteModal={showDeleteModal}
        onHide={hideDeleteModal}
        clickedNo={hideDeleteModal}
        clickedYes={removeData}
      />
      {isEdit &&
        <EditUser
          showEditModal={showEditModal}
          editData={isEdit}
          setEditData={setIsEdit}
        />
      }

      <div className='container mt-3'>
        <ToastContainer />
        <MuiThemeProvider /* theme={theme} */>
          <MaterialTable
            key={reloadListing}
            icons={tableIcons}
            title='Person Data'
            columns={fieldLabel}
            data={(query) => getPageWiseData(query)}
            options={{
              filtering: true,
              paging: true,
              paginationType: 'stepped',
              pageSize: 10,
              actionsColumnIndex: -1,
              pageSizeOptions: [10, 20, 30]
            }}
            actions={[
              {
                icon: VisibilityIcon,
                tooltip: 'View',
                onClick: (event, rowData) => {
                  handleShowDetails(rowData)
                }
              },
              {
                icon: EditRounded,
                tooltip: 'Edit',
                onClick: (event, rowData) => {
                  console.log("rowData", rowData);
                  handleEditUser(rowData)
                }
              },
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
  )
}

export default DashboardPage