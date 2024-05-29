import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useAppDispatch } from "@/store/hooks";
import { get_question_of_survey, delete_question_of_survey } from "@/slice/question/question_action";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditSurveyQuestionDialogBox from "../editSurveyQuestionDialogBox/EditSurveyQuetionDialogBox";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import toast from "react-hot-toast";

interface DataRow {
  id: number;
  name: string;
  type: string;
  abbreviation: string;
  modified: string;
}

interface Question {
  id: number;
  description: string;
  question_type: { name: string };
  abbr: string;
  createdAt: string;
}


interface SurveyInfo {
  survey: { id: number };
  searchTerm: string;
  selectedType: string;
  checkSelectedType:string;
  selecttedQuestions:any []
}

const SurveyQuestionTable: React.FC<SurveyInfo> = ({ survey ,searchTerm,selectedType,checkSelectedType,selecttedQuestions}) => {
  const [rows, setRows] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedQuestion, setSelectedQuestion] = useState<DataRow | null>(null);
  const [response, setResponse] = useState<Question[] | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const survey_id = survey.id;
  console.log("UUY%%%%%%%%%%%%%%%%%%%%%%%%%%%5",selecttedQuestions);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(get_question_of_survey(survey_id));
        const respo: Question[] = data?.payload?.response;
        setResponse(respo);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, survey_id]);

  useEffect(() => {
    if (response) {
      const mappedRows = response.map((item,index) => ({
        id: item.id,
        name: item.description,
        type: item.abbr,
        abbreviation: item.abbr,
        order:index+1,
        modified: item.createdAt,
      }));
      setRows(mappedRows);
    }
  }, [response]);

  const handleEdit = (row: DataRow) => {
    setSelectedQuestion(row);
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(delete_question_of_survey({ survey_id, question_id: id }));
      toast.success("Question removed from survey");
    } catch (error) {
      toast.error("Question deletion failed");
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
    {
      field: "dragIndicator",
      headerName: "",
      width: 50,
      renderCell: () => <DragIndicatorIcon />,
    },
    { field: "name", headerName: "Name", width: 250 },
    { field: "type", headerName: "Type", width: 200 },
    { field: "abbreviation", headerName: "Abbreviation", width: 220 },
    { field: "order", headerName: "Order", width: 50 },
    { field: "modified", headerName: "Modified", width: 150 },
    {
      field: "actions",
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
        rowsPerPageOptions={[5]}
      />
      {selectedQuestion && (
        <EditSurveyQuestionDialogBox
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          question={selectedQuestion}
          survey={survey}
        />
      )}
    </div>
  );
};

export default SurveyQuestionTable;
