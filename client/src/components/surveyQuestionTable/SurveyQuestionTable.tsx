import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { get_question_of_survey, delete_question_of_survey } from "@/slice/question/question_action";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditSurveyQuestionDialogBox from "../editSurveyQuestionDialogBox/EditSurveyQuetionDialogBox";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import toast from "react-hot-toast";
import AlertDialogConfirmationDeleteSurvey from "../dialogConfirmationDelet/AlertDialogDeleteSurvey";
import "./SurveyQuestionTable.styles.css";

interface DataRow {
  id: number;
  name: string;
  type: string;
  type1: string;
  abbreviation: string;
  modified: string;
  order: number;
}

interface SurveyInfo {
  survey: { id: number };
  searchTerm: string;
  selectedType: string;
  checkSelectedType: string;
  selectedQuestions?: any[];
  questionss?: any;
}

const SurveyQuestionTable: React.FC<SurveyInfo> = ({
  survey,
  searchTerm,
  selectedType,
  checkSelectedType,
  selectedQuestions,
  questionss,
}) => {
  const [rows, setRows] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedQuestion, setSelectedQuestion] = useState<DataRow | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState<boolean>(false);
  const [questionToDelete, setQuestionToDelete] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const survey_id = survey.id;
  const { content } = useAppSelector((state) => state.questions);
console.log("QUESTIONS==========",content)
  useEffect(() => {
    if (content?.response?.length) {
      const mappedRows = content.response.map((item, index) => ({
        id: item.id,
        name: item?.description,
        type: item?.question_type?.abbr,
        type1: item.question_type?.name,
        abbreviation: item.abbr,
        order: index + 1,
        modified: item.createdAt,
      }));
      setRows(mappedRows);
    } else {
      setRows([]);
    }
    setLoading(false);
  }, [content?.response]);

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
      try {
        await dispatch(delete_question_of_survey({ survey_id, question_id: questionToDelete }));
        setRows((prevRows) => prevRows.filter((row) => row.id !== questionToDelete));
        toast.success("Question removed from survey");
      } catch (error) {
        toast.error("Question deletion failed");
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
    const matchesType = checkSelectedType.length > 0
      ? checkSelectedType.includes(question.abbreviation)
      : true;
    const matchesSelectedType = selectedType.length > 0
      ? selectedType.includes(question.type1)
      : true;
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
      renderCell: (params: GridRenderCellParams) => (
        <DragIndicatorIcon />
      ),
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
        pageSizeOptions={[5, 10, 15, 20, 25, 30, 50, 100, 150]}
      />
      {selectedQuestion && (
        <EditSurveyQuestionDialogBox
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          question={selectedQuestion}
          survey={survey}
        />
      )}
      <AlertDialogConfirmationDeleteSurvey
        open={deleteConfirmDialogOpen}
        onClose={closeDeleteConfirmDialog}
        onAgree={confirmDelete}
        modelHeading="Delete Question"
        modelBody="Are you sure you want to delete this question?"
      />
    </div>
  );
};

export default SurveyQuestionTable;