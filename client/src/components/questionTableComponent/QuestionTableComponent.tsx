import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRenderCellParams, GridSortDirection } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { delete_question, get_question } from "@/slice/question/question_action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import EditQuestionDialogBox from "../editQuestionDialogBox/EditQuestionDialogBox";
import toast from "react-hot-toast";
import { format } from "date-fns";

interface DataRow {
  id: number;
  name: string;
  type: string;
  abbreviation: string;
  modified: string;
}

const DataTable: React.FC = () => {
  const [rows, setRows] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedQuestion, setSelectedQuestion] = useState<DataRow | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const questiondata = useAppSelector(
    (state) => state.questions?.content?.response?.data.rows
  );
  console.log("QQQUUUEEETTTIIOOODDDAATA===", questiondata);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(get_question());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (questiondata) {
      const mappedRows = questiondata.map((item: any, index: number) => ({
        id: item?.id || index,
        name: item?.description || "",
        type: item?.question_type.name || "",
        abbreviation: item?.abbr || "",
        modified: item?.createdAt ? format(new Date(item.createdAt), 'yyyy-MM-dd HH:mm:ss') : "",
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

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "abbreviation", headerName: "Abbreviation", width: 150 },
    { field: "modified", headerName: "Modified", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
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
        rows={rows}
        columns={columns}
        pageSize={5}
        loading={loading}
        rowsPerPageOptions={[5]}
        sortingOrder={['desc', 'asc']}
        sortModel={[
          {
            field: 'id',
            sort: 'asc' as GridSortDirection,
          },
        ]}
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
