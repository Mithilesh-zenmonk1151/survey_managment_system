import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { get_survey } from '@/slice/survey/survey_action';

interface Column {
  id: 'ID' | 'Name' | 'Question' | 'Type of Survey' | 'Abbreviation' | 'Modified' | 'Status' | 'Actions';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number | string | Date) => string;
}

const columns: readonly Column[] = [
  { id: 'ID', label: 'ID', minWidth: 50 },
  { id: 'Name', label: 'Name', minWidth: 170 },
  { id: 'Question', label: 'Question', minWidth: 100 },
  { id: 'Type of Survey', label: 'Type of Survey', minWidth: 170 },
  { id: 'Abbreviation', label: 'Abbreviation', minWidth: 100 },
  { id: 'Modified', label: 'Modified', minWidth: 170, format: (value: Date) => value.toISOString().split('T')[0] },
  { id: 'Status', label: 'Status', minWidth: 100, align: 'right' },
  { id: 'Actions', label: 'Actions', minWidth: 100, align: 'right' }
];

interface Data {
  ID: number;
  Name: string;
  Question: number;
  'Type of Survey': string;
  Abbreviation: string;
  Modified: Date;
  Status: boolean;
}

function createData(
  ID: number,
  Name: string,
  Question: number,
  TypeOfSurvey: string,
  Abbreviation: string,
  Modified: Date,
  Status: boolean
): Data {
  return { ID, Name, Question, 'Type of Survey': TypeOfSurvey, Abbreviation, Modified, Status };
}

const rows = [
  createData(1, 'Prueba Diana', 7, 'SSTP', 'PRD', new Date('2024-05-17'), false),
  createData(2, 'ghjhg', 5, 'SSTP', 'ABBR', new Date('2024-05-17'), false),
  createData(3, 'Survey 1.1', 0, 'SSAC', 'S1', new Date('2024-05-16'), false),
  createData(4, 'Z', 0, 'SSTP', 'D', new Date('2024-05-16'), true),
  createData(5, 'zreguofg', 2, 'SSTP', 'QD', new Date('2024-05-16'), true),
  createData(6, 'Survey33', 9, 'SSTP', 'SU3', new Date('2024-05-15'), true),
  createData(7, 'Survey 2', 4, 'SSAC', 'S2', new Date('2024-05-15'), true)
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch= useAppDispatch();
  
  const survey= useAppSelector((state)=>state.survey);
  console.log("Survey==== get",survey);
  // React.useEffect(()=>{
  //   dispatch(get_survey())
  // },[dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEyeClick = (id: number) => {
    // Here, you should implement the logic to open a new tab in the tab section
    console.log(`Opening tab for ID: ${id}`);
    // Assuming you have a function `openNewTab` that handles opening a new tab
    // openNewTab(id);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.ID}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'Status' ? (
                            <Switch checked={value as boolean} />
                          ) : column.id === 'Modified' ? (
                            column.format ? column.format(value as Date) : value
                          ) : column.id === 'Actions' ? (
                            <>
                              <IconButton onClick={() => handleEyeClick(row.ID)}>
                                <VisibilityIcon />
                              </IconButton>
                              <IconButton>
                                <EditIcon />
                              </IconButton>
                              <IconButton>
                                <MoreVertIcon />
                              </IconButton>
                            </>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
