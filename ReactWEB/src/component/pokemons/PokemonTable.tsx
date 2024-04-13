import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {Pokemon} from "../../types/app";
import axios from "axios";
import {Stack, TableHead} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useSnackbar} from 'notistack';
import PokemonForm from "./PokemonForm";
import Button from "@mui/material/Button";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

async function requestAPI(page: number, rowsPerPage: number) {
    return axios.get(`http://localhost:3000/pokemons?page=${page}&limit=${rowsPerPage}&lazy=true`)
        .then(response => {
            return response.data;
        });
}

export default function PokemonTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([] as Pokemon[]);
    const [editFormOpen, setEditFormOpen] = React.useState(false);
    const [pokemon, setPokemon] = React.useState({} as Pokemon);
    const { enqueueSnackbar } = useSnackbar();

    // Fetch data from the server. TODO: Paginate the data.
    React.useEffect(() => {
        requestAPI(page, rowsPerPage).then(data => {
            setRows(data.entries);
        });
    }, []);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
        requestAPI(page, rowsPerPage).then(data => {
            setRows(data.entries);
        });
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        requestAPI(page, rowsPerPage).then(data => {
            setRows(data.entries);
        });
    };

    const handleDeleteButtonClick = (id: number) => {
        axios.delete(`http://localhost:3000/pokemons/${id}`)
            .then(response => {
                const status = response.status;

                if (status === 200) {
                    setRows(rows.filter(row => row.id !== id));
                    enqueueSnackbar('Pokemon deleted successfully!',
                        { variant: 'error', autoHideDuration: 1500, anchorOrigin: { vertical: 'top', horizontal: 'right' } }
                    );
                } else {
                    enqueueSnackbar('Failed to delete Pokemon!',
                        { variant: 'error', autoHideDuration: 1500, anchorOrigin: { vertical: 'top', horizontal: 'right' } }
                    );
                }
            });
    }

    const handleEditButtonClick = (id: number) => {
        console.log('Edit button clicked for id:', id);
        setPokemon(rows.filter(row => row.id === id)[0]);
        setEditFormOpen(true);
    }

    const handleCreateNewButtonClick = () => {
        console.log('Create new button clicked');
        setPokemon({} as Pokemon);
        setEditFormOpen(true);
    }

    const handleFormSubmitFinish = () => {
        requestAPI(page, rowsPerPage).then(data => {
            setRows(data.entries);
        });
    }

    return (
        <>
            <Stack direction="row" spacing={2} sx={{ float: 'right', marginBottom: 2, marginTop: 1 }}>
                <Button variant="outlined" endIcon={<SystemUpdateAltIcon />}>
                    Export
                </Button>

                <Button variant="contained" color={"success"} endIcon={<CatchingPokemonIcon /> } onClick={handleCreateNewButtonClick}>
                    Create New
                </Button>
            </Stack>

            <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead className={'tableHeader'}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="center">Height</TableCell>
                            <TableCell align="center">Weight</TableCell>
                            <TableCell align="center">Trainer</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                        ).map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell align="center">{row.height}</TableCell>
                                <TableCell align="center">{row.weight}</TableCell>
                                <TableCell align="center">{row.trainer}</TableCell>
                                <TableCell align="center">
                                    <Stack direction="row" spacing={1}>
                                        <IconButton aria-label="edit" sx={{ color: 'primary.main' }} onClick={() => handleEditButtonClick(row.id)}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton aria-label="delete" sx={{ color: 'error.main' }} onClick={() => handleDeleteButtonClick(row.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={8} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={8}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                slotProps={{
                                    select: {
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            { editFormOpen && <PokemonForm openState={editFormOpen} setStateFunc={setEditFormOpen} pokemon={pokemon} tableReloadFunc={handleFormSubmitFinish}/> }
        </>
    );
}