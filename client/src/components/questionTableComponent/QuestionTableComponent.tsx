import * as React from "react";
import { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSortDirection,
} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  delete_question,
  get_question,
} from "@/slice/question/question_action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import EditQuestionDialogBox from "../editQuestionDialogBox/EditQuestionDialogBox";
import toast from "react-hot-toast";
import { format } from "date-fns";
import "./styles.css"; 
import { useSelector } from "react-redux";

interface DataRow {
  id: number;
  name: string;
  type: string;
  abbreviation: string;
  modified: string;
}

interface DataTableProps {
  searchTerm: string;
  selectedType: string;
  checkSelectedType:string;
}

const DataTable: React.FC<DataTableProps> = ({ searchTerm, selectedType,checkSelectedType }) => {
  const [rows, setRows] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedQuestion, setSelectedQuestion] = useState<DataRow | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const questiondata = useAppSelector(
    (state) => state.questions?.content?.response?.data.rows
  );
 
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(get_question());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);
  const error = useAppSelector((state) => state.questions?.error);
  const displayedToastId = React.useRef(null); // useRef to track the current displayed toast

  useEffect(() => {
    if (error) {
      // Clear previous toast if it's still displayed
      // if (displayedToastId.current) {
      //   toast.dismiss(displayedToastId.current);
      
      }

      // Show new toast for the error
      // displayedToastId.current = toast.error(error, {
      //   onClose: () => {
      //     displayedToastId.current = null; // Reset the current toast ID after it's closed
      //   }
      // });
    
  }, [error]); // Tri
  useEffect(() => {
    if (questiondata) {
      const mappedRows = questiondata.map((item: any, index: number) => ({
        id: item?.id || index,
        name: item?.description || "",
        type: item?.question_type.name || "",
        abbreviation: item?.abbr || "",
        modified: item?.createdAt
          ? format(new Date(item.createdAt), "yyyy-MM-dd HH:mm:ss")
          : "",
      }));
      setRows(mappedRows);
    }
  }, [questiondata]);

  const handleEdit = (row: DataRow) => {
    setSelectedQuestion(row);
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(delete_question(id));
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      toast.success("Question deleted");
    } catch (error) {
      toast.error("Failed to delete question");
      console.error("Error deleting question:", error);
    }
  };

  const filteredQuestions = rows.filter((question) => {
    const matchesType =
      checkSelectedType.length > 0 ? checkSelectedType.includes(question.abbreviation) : true;
      
    const matchesSelectedType =
      selectedType.length > 0 ? selectedType.includes(question.type) : true;
    const matchesSearch = searchTerm
      ? question.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesType && matchesSearch && matchesSelectedType;
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 75 },
    { field: "name", headerName: "Name", width: 275 },
    { field: "type", headerName: "Type", width: 250 },
    { field: "abbreviation", headerName: "Abbreviation", width: 200 },
    { field: "modified", headerName: "Modified", width: 250 },
    {
      field: "action",
      headerName: "",
      width: 100,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton onClick={() => handleEdit(params.row as DataRow)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={filteredQuestions}
        columns={columns}
        pageSize={5}
        loading={loading}
        rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 40, 50]}
        sortingOrder={["desc", "asc"]}
        sortModel={[
          {
            field: "id",
            sort: "asc" as GridSortDirection,
          },
        ]}
        componentsProps={{
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
          fontFamily: "Intter",
        }}
      />
      <EditQuestionDialogBox
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        question={selectedQuestion}
      />
    </div>
  );
};

export default DataTable;