import * as React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,                                                                                            
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { get_question, get_question_for_survey, get_question_of_survey } from "@/slice/question/question_action";
import { create_survey_question } from "@/slice/survey_question/survey_question_action";
import toast from "react-hot-toast";
import { addQuestion } from "@/slice/question_reducers/question_reducer";
import CloseIcon from '@mui/icons-material/Close';
interface Data {
  id: number;
  name: string;
  type: string;
  description:string;
}

function createData(id: number, name: string, type: string,description:string): Data {
  return { id, name, type ,description};
}

// const rows = [
//   createData(1, "sdfsfdfsfg", "SCA7"),
//   createData(2, "dsf", "SCA4"),
//   createData(3, "qquest5retrbkgljhlfgjkjk", "SCA7"),
//   createData(4, "ghjhgjhgggfj", "SCA3"),
//   createData(5, "Question7", "SCA7"),
//   createData(6, "Question6", "SCA7"),
//   createData(7, "44444444", "TOF"),
// ];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  { id: "type", numeric: false, disablePadding: false, label: "Type" },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={{
      width:"100%",
      bgcolor:"#efefef"    }}>
      <TableRow sx={{
         width:"100%",
         bgcolor:"#efefef",
         height:"39px"
       
      }}>
        <TableCell padding="checkbox" sx={{
          padding:0,

        }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all questions" }}
            sx={{
              padding:0,
              margin:0,

            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              padding:0,
              margin:0
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

interface InfoSurvey {
  survey: any;
  onSelectedQuestions?: Question[]
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

export default function EnhancedTable({ survey,onSelectedQuestions}: InfoSurvey) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [dense, setDense] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [ stateRows, setStateRows] = React.useState<Question[] | null>(null);


  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(get_question());
  }, [dispatch]);
  const survey_id = survey.id;


  // const stateRows = useAppSelector((state) => state.questions?.content?.response?.data?.rows);
  // const stateTy = useAppSelector((state) => state.questions?.content?.response?.data?.rows);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const question_id=selected;
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(get_question_for_survey(survey_id));
        dispatch(get_question_of_survey(survey_id))
        const respo: Question[] = data?.payload?.response;
        setStateRows(respo);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, survey_id]);


  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = stateRows ? stateRows.map((n) => n.id) : [];
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - stateRows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(stateRows || [], getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, stateRows]
  );
  // const order=104;
  const num=123;
  const survey_question={survey_id,question_id,num}
  const handleAddQuestiontoSurvey=async()=>{
    try{
      await dispatch(create_survey_question({survey_question}));
      await dispatch(get_question_of_survey(survey_id));
      const CustomToast = () => {
        const handleCloseToast = () => {
          toast.dismiss(); // Dismiss the toast when close icon is clicked
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
              {/* {survey?.is_published
                ? "Survey Unpublished Successfully"
                : "Survey Published Successfully"} */}
                Question added successfully
            </p>
            <CloseIcon
              sx={{
                cursor: "pointer",
              }}
              onClick={handleCloseToast}
            />
          </div>
        );
      };

      // Usage example:
      toast.custom(() => <CustomToast />);
    }
    catch(error){
      console.log(error);
    }
  }

  React.useEffect(()=>{
     dispatch(get_question_of_survey(survey_id)) 
        
  },[dispatch,survey_id])

  return (
    <Box sx={{ width: "98%", border:"1px solid #e0e0e0" ,height:"100%"}}>
      <Paper sx={{ width: "95%", mb: 2,padding:"20px" }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            sx={{ width: "100%" ,height:"100%"}}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}


          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={stateRows ? stateRows.length : 0}
            
            />
            <TableBody sx={{
              padding:"10px"
            }}>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{
                    height:"39px"
                    }}
                  >
                    <TableCell padding="checkbox" sx={{
                      width:"auto",
                      height:"100%"
                    }}>
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                        sx={{
                          padding:"0px"
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      sx={{
                        padding:"0px"
                      }}
                    >
                      {row.description}
                    </TableCell >
                    <TableCell sx={{
                        padding:"0px"
                      }}>{row?.abbr}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={2} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={stateRows ? stateRows.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
        <Box></Box>
        <Box>
          <Button disabled>Cancel</Button>
          <Button disabled={selected.length === 0} onClick={handleAddQuestiontoSurvey}>Add</Button>
        </Box>
      </Box>
    </Box>
  );
}