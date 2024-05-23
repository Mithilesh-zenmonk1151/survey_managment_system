import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { get_question_of_survey } from "@/slice/question/question_action";
import { useAppDispatch } from "@/store/hooks";
import EditQuestionDialogBox from "../editQuestionDialogBox/EditQuestionDialogBox";
import './SurveyQuestionTable.styles.css';
import toast from "react-hot-toast";
import EditSurveyDialogBox from "../dialogBoxEditSurvey/DialogBoxEditSurvey";
import EditSurveyQuestionDialogBox from "../editSurveyQuestionDialogBox/EditSurveyQuetionDialogBox";
import { delete_question_of_survey } from "@/slice/survey_question/survey_question_action";

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
  question_type: {
    name: string;
  };
  abbr: string;
  createdAt: string;
}

interface SurveyInfo {
  survey: {
    id: number;
  };
}

export default function SurveyQuestionTable({ survey }: SurveyInfo) {
  const [rows, setRows] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedQuestion, setSelectedQuestion] = useState<DataRow | null>(null);
  const [response, setResponse] = useState<Question[] | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const survey_id = survey.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(get_question_of_survey(survey_id));
        const respo: Question[] = data?.payload?.response;
        setResponse(respo);

        toast.success("Get success");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, survey_id]);
  console.log("&&&&&&&&&&&&&&&asfhdfklgdfgl;dfg5645",response);

  useEffect(() => {
    if (response) {
      const mappedRows = response?.map((item:any, index: number) => ({
        id: item?.id || index,
        name: item?.description || "",
        order:index+1|| "",
        type: item?.abbr || "",
        abbreviation: item?.abbr || "",
        modified: item?.createdAt || "",
      }));
      setRows(mappedRows);
    }
  }, [response]);

  const handleEdit = (row: DataRow) => {
    setSelectedQuestion(row);
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
   try{
    console.log(`Delete row with id: ${id}`);
    const question_id= id;
    dispatch(delete_question_of_survey({survey_id,question_id}))
    toast.success("Question removed from survey")

   }
   catch(error){
    toast.error("Question Delation faled")

   }
    
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "abbreviation", headerName: "Abbreviation", width: 150 },
    { field: "order", headerName: "Order", width: 150 },
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
      <EditSurveyQuestionDialogBox
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        question={selectedQuestion}
        survey={survey}
      />
    </div>
  );
};
