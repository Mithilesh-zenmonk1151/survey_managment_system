import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Switch, Popover, Typography, Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  delete_survey,
  get_survey,
  update_survey,
} from "@/slice/survey/survey_action";
import EditSurveyDialogBox from "../dialogBoxEditSurvey/DialogBoxEditSurvey";
import SurveyInfo from "./SurveyInfo";
import toast from "react-hot-toast";
import AlertDialog from "../confirmationnDialogBox/ConfirmationDialogBox";
import CloseIcon from "@mui/icons-material/Close";
import AlertDialogConfirmationDeleteSurvey from "../dialogConfirmationDelet/AlertDialogDeleteSurvey";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface DataRow {
  id: number;
  name: string;
  question: number;
  type: string;
  abbreviation: string;
  modified: string;
  status: boolean;
  options: any[];
  survey_type: any[];
}

interface DataTableProps {
  onAddTab: (tab: { id: string; label: string; content: JSX.Element }) => void;
  searchTerm: string;
  selectedType: string;
  checkSelectedType: string;
}

const DataTable: React.FC<DataTableProps> = ({
  onAddTab,
  searchTerm,
  selectedType,
  checkSelectedType,
}) => {
  const [rows, setRows] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedQuestion, setSelectedQuestion] = useState<DataRow | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deleteOptionId, setDeleteOptionId] = useState<number | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<boolean>(false);
  const [currentStatusId, setCurrentStatusId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const dispatch = useAppDispatch();

  const survey = useAppSelector(
    (state) => state.survey?.content?.response?.data?.rows
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(get_survey());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (survey) {
      let filteredRows = survey?.map((item: any) => ({
        id: item?.id,
        name: item?.name,
        question: item?.questions?.length,
        type: item?.survey_type?.abbr,
        abbreviation: item?.abbr,
        modified: new Date(item?.updatedAt).toISOString().split("T")[0],
        status: item?.is_published,
        options: item?.options,
        survey_type: item?.survey_type,
      }));

      setRows(filteredRows);
    }
  }, [survey]);

  const handleEdit = (row: DataRow) => {
    setSelectedQuestion(row);
    setDialogOpen(true);
  };

  const filteredSurvey = rows.filter((survey) => {
    const matchesType =
      checkSelectedType.length > 0 ? checkSelectedType.includes(survey.abbreviation) : true;

    const matchesSelectedType =
      selectedType.length > 0 ? selectedType.includes(survey.type) : true;
    const matchesSearch = searchTerm
      ? survey.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesType && matchesSearch && matchesSelectedType;
  });

  const handleStatusChange = (id: number, status: boolean) => {
    const updatedRows = rows?.map((row) =>
      row.id === id ? { ...row, status } : row
    );
    setRows(updatedRows);
    dispatch(update_survey({ id, is_published: status }));

    const CustomToast = () => {
      const handleCloseToast = () => {
        toast.dismiss();
      };

      return (
        <div
          className="custom-toast"
          style={{
            background: "#4d9f49",
            color: "#ffffff",
            transition: "all 0.5s ease",
            height: "50px",
            width: "400px",
            alignItems: "center",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p>
            {status
              ? "Survey Published Successfully"
              : "Survey Unpublished Successfully"}
          </p>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={handleCloseToast} />
        </div>
      );
    };

    toast.custom(() => <CustomToast />);
  };

  const handleEyeClick = (id: number) => {
    const selectedSurvey = survey?.find((item: any) => item.id === id);
    if (selectedSurvey) {
      onAddTab({
        id: `${id}`,
        label: selectedSurvey?.name,
        content: <SurveyInfo survey={selectedSurvey} />,
      });
    }
  };

  const handleMoreOptionsClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setDeleteOptionId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setDeleteOptionId(null);
  };

  const handleDelete = (id: number) => {
    setDeleteConfirmDialogOpen(true);
    setConfirmDeleteId(id);
  };

  const confirmDelete = () => {
    if (confirmDeleteId !== null) {
      dispatch(delete_survey(confirmDeleteId));
      setRows((prevRows) => prevRows?.filter((row) => row?.id !== confirmDeleteId));
      const CustomToast = () => {
        const handleCloseToast = () => {
          toast.dismiss();
        };

        return (
          <div
            className="custom-toast"
            style={{
              background: "#4d9f49",
              color: "#ffffff",
              transition: "all 0.5s ease",
              height: "50px",
              width: "400px",
              alignItems: "center",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>Survey deleted Successfully</p>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleCloseToast} />
          </div>
        );
      };

      toast.custom(() => <CustomToast />);
    }
    setDeleteConfirmDialogOpen(false);
  };

  const openStatusDialog = (id: number, status: boolean) => {
    setCurrentStatusId(id);
    setCurrentStatus(!status);
    setStatusDialogOpen(true);
  };

  const closeStatusDialog = () => {
    setStatusDialogOpen(false);
  };

  const agreeStatusChange = () => {
    if (currentStatusId !== null) {
      handleStatusChange(currentStatusId, currentStatus);
    }
    setStatusDialogOpen(false);
  };

  const closeDeleteConfirmDialog = () => {
    setDeleteConfirmDialogOpen(false);
  };

  const columns: GridColDef[] = [
    { field: " ", headerName: " ", width: 27 },
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 350 },
    { field: "question", headerName: "Question", width: 80 },
    { field: "type", headerName: "Type of Survey", width: 300 },
    { field: "abbreviation", headerName: "Abbreviation", width: 225 },
    { field: "modified", headerName: "Modified", width: 170 },
    {
      field: "status",
      headerName: "Status",
      width: 250,
      renderCell: (params: GridRenderCellParams) => (
        <Switch
          checked={params.value as boolean}
          onChange={() => openStatusDialog(params.row.id, params.value as boolean)}
        />
      ),
    },
    {
      field: "actions",
      headerName: "",
      width: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Tooltip title="View Survey" sx={{fontSize:"14px"
            
          }}>
            <IconButton onClick={() => handleEyeClick(params.row.id)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="More ">
            <IconButton onClick={(event) => handleMoreOptionsClick(event, params.row.id)}>
             
            <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Popover
            open={Boolean(anchorEl) && deleteOptionId === params.row.id}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Typography
              sx={{ p: 2, cursor: "pointer", color: "black" }}
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteOutlineIcon/>
              Delete
            </Typography>
          </Popover>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 675, width: "100%", background: "white", paddingBottom: "80px" }}>
      <DataGrid
        rows={filteredSurvey}
        columns={columns}
        pagination
        pageSize={10}
        pageSizeOptions={[5, 10, 15, 20, 25, 30, 50, 100, 150]}
        loading={loading}
        className="custom-data-grid"
        sx={{
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
        }}
      />

      <EditSurveyDialogBox
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        question={selectedQuestion}
      />

      <AlertDialog
        open={statusDialogOpen}
        onClose={closeStatusDialog}
        onAgree={agreeStatusChange}
        status={currentStatus}
      />

      <AlertDialogConfirmationDeleteSurvey
        open={deleteConfirmDialogOpen}
        onClose={closeDeleteConfirmDialog}
        onAgree={confirmDelete}
        modelHeading="Delete Survey"
        modelBody="Are you sure you want to delete this survey?"
      />
    </div>
  );
};

export default DataTable;
