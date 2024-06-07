import * as React from "react";
import { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSortDirection,
} from "@mui/x-data-grid";
import CustomRowsPerPageDropdown from './CustomRowsPerPageDropdown';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import { format } from "date-fns";
import "./styles.css";
import EditQuestionDialogBox from "../editQuestionDialogBox/EditQuestionDialogBox";
import AlertDialogConfirmationDeleteSurvey from "../dialogConfirmationDelet/AlertDialogDeleteSurvey";
import toast from "react-hot-toast";
import {
  delete_partial_question,
  get_question,
} from "@/slice/question/question_action";
import {
  delete_question,
  get_deleted_questions,
} from "@/slice/deleted_questions/deleted_questions_action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import "./styles.css";
import { TextField } from "@mui/material";

interface DataRow {
  id: number;
  name: string;
  type: string;
  type1: string;
  abbreviation: string;
  modified: string;
}

interface DataTableProps {
  searchTerm: string;
  selectedType: string;
  checkSelectedType: string;
  showDeleted: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  searchTerm,
  selectedType,
  checkSelectedType,
  showDeleted,
}) => {
  const [rows, setRows] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedQuestion, setSelectedQuestion] = useState<DataRow | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] =
    useState<boolean>(false);
  const [questionToDelete, setQuestionToDelete] = useState<number | null>(
    null
  );
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);

  const dispatch = useAppDispatch();
  console.log("PAGEEE",pageSize);
  console.log("PAGEN",page);
  console.log("SERCHTERM",searchTerm);

  const questiondata = useAppSelector(
    (state) => state.questions?.content?.response?.data
  );
  const deletedQuestions = useAppSelector(
    (state) => state.deleted_questions?.deletedQuestions?.response?.data
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          query: searchTerm,
          limit: pageSize,
          page: page + 1,
        };

        if (showDeleted) {
          dispatch(get_deleted_questions(payload));
        } else {
          dispatch(get_question(payload));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, page, pageSize, searchTerm, showDeleted]);

  useEffect(() => {
    if (questiondata && !showDeleted) {
      const mappedRows = questiondata.map((item: any, index: number) => ({
        id: item?.id || index,
        Id: index + 1,
        name: item?.description || "",
        type: item?.question_type?.abbr || "",
        type1: item?.question_type?.name,
        abbreviation: item?.abbr || "",
        modified: item?.createdAt
          ? format(new Date(item.createdAt), "yyyy-MM-dd HH:mm:ss")
          : "",
      }));
      setRows(mappedRows);
    } else if (deletedQuestions && showDeleted) {
      const mappedRows = deletedQuestions.map((item: any, index: number) => ({
        id: item?.id || index,
        Id: index + 1,
        name: item?.description || "",
        type: item?.question_type?.abbr || "",
        type1: item?.question_type?.name,
        abbreviation: item?.abbr || "",
        modified: item?.createdAt
          ? format(new Date(item.createdAt), "yyyy-MM-dd HH:mm:ss")
          : "",
      }));
      setRows(mappedRows);
    }
  }, [questiondata, deletedQuestions, showDeleted]);

  const handleEdit = (row: DataRow) => {
    setSelectedQuestion(row);
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setQuestionToDelete(id);
    setDeleteConfirmDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (questionToDelete !== null) {
      const question_id = questionToDelete;
      try {
        if (!showDeleted) {
          await dispatch(delete_partial_question(questionToDelete));
          setRows((prevRows) =>
            prevRows.filter((row) => row.id !== questionToDelete)
          );
        } else if (showDeleted) {
          await dispatch(delete_question(question_id));
          setRows((prevRows) =>
            prevRows.filter((row) => row.id !== questionToDelete)
          );
        }
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
              <p>Question deleted successfully</p>
              <CloseIcon
                sx={{ cursor: "pointer" }}
                onClick={handleCloseToast}
              />
            </div>
          );
        };

        toast.custom(() => <CustomToast />);
      } catch (error) {
        toast.error("Failed to delete question");
        console.error("Error deleting question:", error);
      } finally {
        setDeleteConfirmDialogOpen(false);
        setQuestionToDelete(null);
      }
    }
  };

  const closeDeleteConfirmDialog = () => {
    setDeleteConfirmDialogOpen(false);
    setQuestionToDelete(null);
  };

  const filteredQuestions = rows.filter((question) => {
    const matchesType =
      checkSelectedType.length > 0
        ? checkSelectedType.includes(question.abbreviation)
        : true;
    const matchesSelectedType =
      selectedType.length > 0
        ? selectedType.includes(question.type1)
        : true;
    const matchesSearch = searchTerm
      ? question.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesType && matchesSearch && matchesSelectedType;
  });

  const columns: GridColDef[] = [
    { field: "", headerName: " ", width: 35 },
    { field: "Id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 400 },
    { field: "type", headerName: "Type", width: 350 },
    { field: "abbreviation", headerName: "Abbreviation", width: 250 },
    { field: "modified", headerName: "Modified", width: 350 },
    {
      field: "action",
      headerName: "",
      width: 100,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row as DataRow)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={filteredQuestions}
        columns={columns}
        pageSize={pageSize}
        page={page}
        rowCount={filteredQuestions.length}
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
          setPage(0);
        }}
        loading={loading}
        sortingOrder={["desc", "asc"]}
        rowsPerPageOptions={[5, 10, 25, 50]}
        sortModel={[
          {
            field: "id",
            sort: "asc",
          },
        ]}
        components={{
          RowsPerPageDropdown: CustomRowsPerPageDropdown,
        }}
        componentsProps={{
          rowsPerPageDropdown: {
            rowsPerPageOptions: [5, 10, 25, 50],
          },
          cell: {
            className: "custom-cell",
          },
          columnHeader: {
            className: "custom-header-cell",
          },
        }}
        sx={{
          fontSize: "14px",
          fontWeight: "500",
          fontFamily: "Poppins",
        }}
      />

      <EditQuestionDialogBox
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        question={selectedQuestion}
      />
      <AlertDialogConfirmationDeleteSurvey
        open={deleteConfirmDialogOpen}
        onClose={closeDeleteConfirmDialog}
        onAgree={confirmDelete}
        modelHeading="Delete Question"
        modelBody="Are you sure you want to delete this question?"
      />
      <TextField type="numder" value={pageSize} onChange={(e)=>setPageSize(e.target.value)}/>
      <TextField placeholder="pa" type="numder" value={page} onChange={(e)=>setPage(e.target.value)}/>
    </div>
  );
};

export default DataTable;
