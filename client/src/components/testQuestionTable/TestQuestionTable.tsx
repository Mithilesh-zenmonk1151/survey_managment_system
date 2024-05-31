import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { delete_question, get_question } from "@/slice/question/question_action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import EditQuestionDialogBox from "../editQuestionDialogBox/EditQuestionDialogBox";

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
        id: item.id || index,
        name: item.description || "",
        type: item.question_type.name || "",
        abbreviation: item.abbr || "",
        modified: item.createdAt || "",
      }));
      setRows(mappedRows);
    }
  }, [questiondata]);

  const handleEdit = (row: DataRow) => {
    setSelectedQuestion(row);
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    const question_id=id
    dispatch(delete_question(question_id))
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 150},
    { field: "type", headerName: "Type", width: 150 },
    { field: "abbreviation", headerName: "Abbreviation", width: 150},
    { field: "order", headerName: "Order", width: 150},
    { field: "modified", headerName: "Modified", width: 150 },
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
