import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Switch, Popover, Typography, Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  delete_partial_survey,
  get_survey,
  update_survey,
} from "@/slice/survey/survey_action";
import EditSurveyDialogBox from "../dialogBoxEditSurvey/DialogBoxEditSurvey";
import SurveyInfo from "./SurveyInfo";
import toast from "react-hot-toast";
import AlertDialog from "../confirmationnDialogBox/ConfirmationDialogBox";
import CloseIcon from "@mui/icons-material/Close";
import AlertDialogConfirmationDeleteSurvey from "../dialogConfirmationDelet/AlertDialogDeleteSurvey";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { get_deleted_questions } from "@/slice/deleted_questions/deleted_questions_action";
import { delete_survey, get_deleted_survey } from "@/slice/deleted_survey/deleted_survey_action";
import "./survey.css"
interface DataRow {
  id: number;
  name: string;
  question: number;
  type: string;
  type1: string;
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
  is_published: string;
  showDeleted: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  onAddTab,
  searchTerm,
  selectedType,
  checkSelectedType,
  is_published,
  showDeleted,
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
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] =
    useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const dispatch = useAppDispatch();
  console.log("Show deletedf", showDeleted);
  const survey = useAppSelector(
    (state) => state.survey?.content?.response?.data?.rows
  );

  const deletedSurveys = useAppSelector(
    (state) => state.deleted_questions.deletedQuestions?.response?.data?.rows
  );
  useEffect(() => {
    dispatch(get_deleted_survey());
  }, [dispatch]);
  console.log("Survey$$$$$$$$$$$", deletedSurveys);

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
  console.log("SUEVEtttttttttt###########",survey);

  useEffect(() => {
    if (survey && !showDeleted) {
      let filteredRows = survey?.map((item: any,index:number) => ({
        id: item?.id,
        Id:index+1,
        name: item?.name,
        question: item?.questions?.length,
        type: item?.survey_type?.abbr,
        type1: item?.survey_type?.name,
        abbreviation: item?.abbr,
        modified: new Date(item?.updatedAt).toISOString().split("T")[0],
        status: item?.is_published,
        options: item?.options,
        survey_type: item?.survey_type,
      }));

      setRows(filteredRows);
    } else if (deletedSurveys && showDeleted) {
      let filteredRows = deletedSurveys?.map((item: any,index:number) => ({
        id: item?.id,
        name: item?.name,
        Id:index+1,
        question: item?.questions?.length,
        type: item?.survey_type?.abbr,
        type1: item?.survey_type?.name,
        abbreviation: item?.abbr,
        modified: new Date(item?.updatedAt).toISOString().split("T")[0],
        status: item?.is_published,
        options: item?.options,
        survey_type: item?.survey_type,
      }));

      setRows(filteredRows);
    }
  }, [survey, deletedSurveys, showDeleted]);

  const handleEdit = (row: DataRow) => {
    setSelectedQuestion(row);
    setDialogOpen(true);
  };

  const filteredSurvey = rows.filter((survey) => {
    const matchesType =
      checkSelectedType.length > 0
        ? checkSelectedType.includes(survey?.abbreviation)
        : true;

    const matchesSelectedType =
      selectedType.length > 0 ? selectedType.includes(survey?.type1) : true;
    const matchesSearch = searchTerm
      ? survey?.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesPublishedStatus =
      is_published === "Published"
        ? survey.status === true
        : is_published === "Unpublished"
        ? survey.status === false
        : true;

    return (
      matchesType &&
      matchesSearch &&
      matchesSelectedType &&
      matchesPublishedStatus
    );
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

  const handleMoreOptionsClick = (
    event: React.MouseEvent<HTMLElement>,
    id: number
  ) => {
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
    dispatch(get_deleted_survey());
  };

  const confirmDelete =async () => {
    if (confirmDeleteId !== null) {
     
      await dispatch(delete_partial_survey(confirmDeleteId));
      setRows((prevRows) =>
        prevRows?.filter((row) => row?.id !== confirmDeleteId)
      );
   
 
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
    { field: " id", headerName: " ", width: 27 },
    { field: "Id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 350 },
    { field: "question", headerName: "Question", width: 80 },
    { field: "type", headerName: "Type of Survey", width: 200 },
    { field: "abbreviation", headerName: "Abbreviation", width: 150 },
    { field: "modified", headerName: "Modified", width: 170 },
    {
      field: "status",
      headerName: "Status",
      width: 250,
      renderCell: (params: GridRenderCellParams) => (
        <Switch
          checked={params.value as boolean}
          onChange={() =>
            openStatusDialog(params.row.id, params.value as boolean)
          }
          inputProps={{ "aria-label": "controlled" }}
        />
      ),
    },
    {
      field: "",
      headerName: "",
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Tooltip title="View">
            <IconButton
              onClick={() => handleEyeClick(params.row.id)}
              size="small"
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row)} size="small">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="More options">
            <IconButton
              onClick={(event) => handleMoreOptionsClick(event, params.row.id)}
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
      
        rows={filteredSurvey}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        columns={columns}
        pageSize={10}
        loading={loading}
      />
      <EditSurveyDialogBox
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        survey={selectedQuestion}
        setRows={setRows}
      />
      <AlertDialog
        open={statusDialogOpen}
        onClose={closeStatusDialog}
        onAgree={agreeStatusChange}
        status={currentStatus}
        message="Are you sure you want to change the status?"
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          marginLeft: "35px",
        }}
      >
        <Typography
          sx={{ p: "7px" }}
          onClick={() => handleDelete(deleteOptionId!)}
        >
          <IconButton>
            <DeleteOutlineIcon />{" "}
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "400",
              }}
            >
              Delete
            </Typography>
          </IconButton>
        </Typography>
      </Popover>
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
