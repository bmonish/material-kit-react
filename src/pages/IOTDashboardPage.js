import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { sentenceCase } from 'change-case';
// @mui
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardHeader,
  Grid,
  Container,
  Typography,
  TableRow,
  MenuItem,
  Stack,
  Avatar,
  Checkbox,
  Paper,
  TableBody,
  TableCell,
  IconButton,
  TableContainer,
  TablePagination,
  Table,
} from '@mui/material';
import { filter } from 'lodash';
import Label from '../components/label';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { dashBoardTableData } from '../_mock/user';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

// ----------------------------------------------------------------------
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function IOTDashboardPage() {
  const theme = useTheme();

  const TABLE_HEAD = [
    { id: 'timeStamp', label: 'Time Stamp', alignRight: false },
    { id: 'storeName', label: 'Store Name', alignRight: false },
    { id: 'retailerCode', label: 'Retailer Code', alignRight: false },
    { id: 'retailerName', label: 'Retailer Name', alignRight: false },
    { id: 'depotCode', label: 'Depot Code', alignRight: false },
    { id: 'depotName', label: 'Depot Name', alignRight: false },
    { id: 'district', label: 'District', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '' },
  ];

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dashBoardTableData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dashBoardTableData.length) : 0;

  const filteredUsers = applySortFilter(dashBoardTableData, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Total Devices Communicating"
              chartData={[
                { label: 'Active', value: 2500 },
                { label: 'Inactive', value: 500 },
                { label: 'Offline', value: 250 },
              ]}
              chartColors={[theme.palette.success.dark, theme.palette.info.main, theme.palette.error.main]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Fire Alarms"
              chartData={[
                { label: 'Active', value: 1500 },
                { label: 'Inactive', value: 200 },
                { label: 'Offline', value: 200 },
              ]}
              chartColors={[theme.palette.success.dark, theme.palette.info.main, theme.palette.error.main]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Burglar Alarms"
              chartData={[
                { label: 'Active', value: 1000 },
                { label: 'Inactive', value: 300 },
                { label: 'Offline', value: 50 },
              ]}
              chartColors={[theme.palette.success.dark, theme.palette.info.main, theme.palette.error.main]}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Monitor Fire Alarms' },
                { id: '2', label: 'Update Firmware on Burglar Alarm' },
                { id: '3', label: 'Draft November Month Report' },
                { id: '4', label: 'Address Slow Connection for Users' },
                { id: '5', label: 'Do a sanity test on connectivity of sensors' },
                { id: '6', label: 'Migrate to Kubernetes' },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <CardHeader title="Alarms Report" subheader="" />
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={dashBoardTableData.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const {
                        id,
                        timestamp,
                        status,
                        storeName,
                        retailerCode,
                        retailerName,
                        depotCode,
                        depotName,
                        district,
                      } = row;
                      const selectedUser = selected.indexOf(timestamp) !== -1;

                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                          <TableCell padding="checkbox">
                            <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, timestamp)} />
                          </TableCell>

                          <TableCell component="th" scope="row">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {timestamp}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{storeName}</TableCell>
                          <TableCell align="left">{retailerCode}</TableCell>
                          <TableCell align="left">{retailerName}</TableCell>
                          <TableCell align="left">{depotCode}</TableCell>
                          <TableCell align="left">{depotName}</TableCell>
                          <TableCell align="left">{district}</TableCell>

                          <TableCell align="left">
                            <Label
                              color={
                                (status === 'Offline' && 'error') || (status === 'Inactive' && 'info') || 'success'
                              }
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                              <Iconify icon={'eva:more-vertical-fill'} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Card>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <CardHeader title="User Tracking Report" />
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={dashBoardTableData.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const {
                        id,
                        timestamp,
                        status,
                        storeName,
                        retailerCode,
                        retailerName,
                        depotCode,
                        depotName,
                        district,
                      } = row;
                      const selectedUser = selected.indexOf(timestamp) !== -1;

                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                          <TableCell padding="checkbox">
                            <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, timestamp)} />
                          </TableCell>

                          <TableCell component="th" scope="row">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {timestamp}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{storeName}</TableCell>
                          <TableCell align="left">{retailerCode}</TableCell>
                          <TableCell align="left">{retailerName}</TableCell>
                          <TableCell align="left">{depotCode}</TableCell>
                          <TableCell align="left">{depotName}</TableCell>
                          <TableCell align="left">{district}</TableCell>

                          <TableCell align="left">
                            <Label
                              color={
                                (status === 'Offline' && 'error') || (status === 'Inactive' && 'info') || 'success'
                              }
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                              <Iconify icon={'eva:more-vertical-fill'} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
