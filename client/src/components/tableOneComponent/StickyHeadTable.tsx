import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Switch } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  delete_survey,
  get_survey,
  update_survey,
} from "@/slice/survey/survey_action";
import EditSurveyDialogBox from "../dialogBoxEditSurvey/DialogBoxEditSurvey";
import SurveyInfo from "./SurveyInfo";
import toast from "react-hot-toast";

import "./DataTable.css"; 

interface DataRow {
  id: number;
  name: string;
  question: number;
  type: string;
  abbreviation: string;
  modified: string;
  status: boolean;
}

interface DataTableProps {
  onAddTab: (tab: { id: string; label: string; content: JSX.Element }) => void;
  searchTerm: string;
  selectedType: string;
}

const DataTable: React.FC<DataTableProps> = ({
  onAddTab,
  searchTerm,
  selectedType,
}) => {
  const [rows, setRows] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedQuestion, setSelectedQuestion] = useState<DataRow | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deleteOptionId, setDeleteOptionId] = useState<number | null>(null); // Track which row's delete option is active
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
      let filteredRows = survey.map((item: any) => ({
        id: item.id,
        name: item.name,
        question: item?.questions?.length,
        type: item.survey_type.name,
        abbreviation: item.abbr,
        modified: new Date(item.updatedAt).toISOString().split("T")[0],
        status: item.is_published,
      }));

      // Filter by searchTerm
      if (searchTerm) {
        filteredRows = filteredRows.filter(
          (row) =>
            row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.abbreviation.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by selectedType
      if (selectedType) {
        filteredRows = filteredRows.filter(
          (row) => row.type.toLowerCase() === selectedType.toLowerCase()
        );
      }

      setRows(filteredRows);
    }
  }, [survey, searchTerm, selectedType]);

  const handleEdit = (row: DataRow) => {
    setSelectedQuestion(row);
    setDialogOpen(true);
  };

  const handleStatusChange = (id: number, status: boolean) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, status } : row
    );
    setRows(updatedRows);
    dispatch(update_survey({ id, is_published: status }));
  };

  const handleEyeClick = (id: number) => {
    const selectedSurvey = survey.find((item: any) => item.id === id);
    if (selectedSurvey) {
      onAddTab({
        id: `survey-${id}`,
        label: selectedSurvey.name,
        content: <SurveyInfo survey={selectedSurvey} />,
      });
    }
  };

  const handleMoreOptionsClick = (id: number | null) => {
    setDeleteOptionId(id);
    const survey_id = id;
    dispatch(delete_survey(survey_id));
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    toast.success("Survey deleted Successfully");
  };

  const handleDelete = (id: number) => {
    // Implement your delete logic here
    console.log(`Deleting survey with ID: ${id}`);
    dispatch(delete_survey(id));
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, },
    { field: "name", headerName: "Name", width: 350 },
    { field: "question", headerName: "Question", width: 80 },
    { field: "type", headerName: "Type of Survey", width: 200 },
    { field: "abbreviation", headerName: "Abbreviation", width: 125 },
    { field: "modified", headerName: "Modified", width: 170 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
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
      headerName: "",
      width: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton onClick={() => handleEyeClick(params.row.id)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row as DataRow)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleMoreOptionsClick(params.row.id)}>
            <MoreVertIcon />
          </IconButton>
          {deleteOptionId === params.row.id && (
            <span
              onClick={() => handleDelete(params.row.id)}
              style={{ cursor: "pointer", marginLeft: 10, color: "red" }}
            >
              Delete
            </span>
          )}
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 525, width: "100%", background: "white" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        pageSize={10}
        rowsPerPageOptions={[5, 10, 15, 20, 50, 100]}
        loading={loading}
        className="custom-data-grid"
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
