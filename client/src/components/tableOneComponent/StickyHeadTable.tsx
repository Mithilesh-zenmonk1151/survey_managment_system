import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  get_survey,
  update_survey,
} from "@/slice/survey/survey_action";
import EditQuestionDialogBox from "../editQuestionDialogBox/EditQuestionDialogBox";
import EditSurveyDialogBox from "../dialogBoxEditSurvey/DialogBoxEditSurvey";

interface DataRow {
  id: number;
  name: string;
  question: number;
  type: string;
  abbreviation: string;
  modified: string;
  status: boolean;
}

const DataTable: React.FC = () => {
  const [rows, setRows] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedQuestion, setSelectedQuestion] = useState<DataRow | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
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
      const mappedRows = survey.map((item: any) => ({
        id: item.id,
        name: item.name,
        question: item.options.length,
        type: item.survey_type.name,
        abbreviation: item.abbr,
        modified: new Date(item.updatedAt).toISOString().split("T")[0],
        status: item.is_published,
      }));
      setRows(mappedRows);
    }
  }, [survey]);

  const handleEdit = (row: DataRow) => {
    setSelectedQuestion(row);
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete row with id: ${id}`);
  };

  const handleStatusChange = (id: number, status: boolean) => {
    const is_published = status;
    const survey = { id, is_published };
    dispatch(update_survey(survey));
  };

  const handleEyeClick = (id: number) => {
    console.log(`Opening tab for ID: ${id}`);
    // openNewTab(id);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Name", width: 170 },
    { field: "question", headerName: "Question", width: 100 },
    { field: "type", headerName: "Type of Survey", width: 170 },
    { field: "abbreviation", headerName: "Abbreviation", width: 100 },
    { field: "modified", headerName: "Modified", width: 170 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Switch
          checked={params.value as boolean}
          onChange={(event) =>
            handleStatusChange(params.row.id, event.target.checked)
          }
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton onClick={() => handleEyeClick(params.row.id)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row as DataRow)}>
            <EditIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 100]}
        loading={loading}
      />
      <EditSurveyDialogBox
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        question={selectedQuestion}
      />
    </div>
  );
};

export default DataTable;
