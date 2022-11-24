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
  Input,
  Switch,
} from '@mui/material';
// import { Input, Label, FormGroup } from 'reactstrap';
import { filter } from 'lodash';
// import Label from '../components/label';
// components
import Iconify from '../components/iconify';
// sections
import { dashBoardTableData } from '../_mock/user';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

// ----------------------------------------------------------------------

export default function MonitoringPage() {
  const theme = useTheme();

  const [person, setPerson] = useState(true);
  const [shutter, setShutter] = useState(false);
  const [fire, setFire] = useState(false);
  const [hooter, setHooter] = useState(true);
  const [mains, setMains] = useState(true);
  const [alarm, setAlarm] = useState(true);
  const [burglarAlarm, setBurglarAlarm] = useState(true);
  const [motionDoor, setMotionAlarm] = useState(true);

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Monitoring - Device D001
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardHeader title="Site Name" />
              <Typography variant="h4" sx={{ ml: 3, p: 1 }}>
                Vizag 0021
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardHeader title="Live Packet Time" />
              <Typography variant="h4" sx={{ ml: 3, p: 1 }}>
                {new Date().toLocaleString()}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardHeader title="Retailer Name" />
              <Typography variant="h4" sx={{ ml: 3, p: 1 }}>
                Bhavani Vines
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h6">Device Details:</Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardHeader title="Person" />
              <Stack paddingRight={'15px'} direction={'row'} justifyContent="space-between" alignItems="center">
                <Typography
                  color={person ? theme.palette.success.dark : theme.palette.error.main}
                  variant="h4"
                  sx={{ ml: 3, p: 1 }}
                >
                  {person ? `Normal` : 'Disabled'}
                </Typography>
                <Switch checked={person} onChange={() => setPerson((v) => !v)} />
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardHeader title="Shutter" />
              <Stack paddingRight={'15px'} direction={'row'} justifyContent="space-between" alignItems="center">
                <Typography
                  color={shutter ? theme.palette.success.dark : theme.palette.error.main}
                  variant="h4"
                  sx={{ ml: 3, p: 1 }}
                >
                  {shutter ? `Closed` : 'Opened'}
                </Typography>
                <Switch checked={shutter} onChange={() => setShutter((v) => !v)} />
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardHeader title="Fire" />
              <Stack paddingRight={'15px'} direction={'row'} justifyContent="space-between" alignItems="center">
                <Typography
                  color={fire ? theme.palette.success.dark : theme.palette.error.main}
                  variant="h4"
                  sx={{ ml: 3, p: 1 }}
                >
                  {fire ? `On` : 'Off'}
                </Typography>
                <Switch checked={fire} onChange={() => setFire((v) => !v)} />
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardHeader title="Hooter" />
              <Stack paddingRight={'15px'} direction={'row'} justifyContent="space-between" alignItems="center">
                <Typography
                  color={hooter ? theme.palette.success.dark : theme.palette.error.main}
                  variant="h4"
                  sx={{ ml: 3, p: 1 }}
                >
                  {hooter ? `On` : 'Off'}
                </Typography>
                <Switch checked={hooter} onChange={() => setHooter((v) => !v)} />
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardHeader title="Mains" />
              <Stack paddingRight={'15px'} direction={'row'} justifyContent="space-between" alignItems="center">
                <Typography
                  color={mains ? theme.palette.success.dark : theme.palette.error.main}
                  variant="h4"
                  sx={{ ml: 3, p: 1 }}
                >
                  {mains ? `On` : 'Off'}
                </Typography>
                <Switch checked={mains} onChange={() => setMains((v) => !v)} />
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardHeader title="Alarm" />
              <Stack paddingRight={'15px'} direction={'row'} justifyContent="space-between" alignItems="center">
                <Typography
                  color={alarm ? theme.palette.success.dark : theme.palette.error.main}
                  variant="h4"
                  sx={{ ml: 3, p: 1 }}
                >
                  {alarm ? `On` : 'Off'}
                </Typography>
                <Switch checked={alarm} onChange={() => setAlarm((v) => !v)} />
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardHeader title="Burglar Alarm" />
              <Stack paddingRight={'15px'} direction={'row'} justifyContent="space-between" alignItems="center">
                <Typography
                  color={burglarAlarm ? theme.palette.success.dark : theme.palette.error.main}
                  variant="h4"
                  sx={{ ml: 3, p: 1 }}
                >
                  {burglarAlarm ? `On` : 'Off'}
                </Typography>
                <Switch checked={burglarAlarm} onChange={() => setBurglarAlarm((v) => !v)} />
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardHeader title="Motion Door" />
              <Stack paddingRight={'15px'} direction={'row'} justifyContent="space-between" alignItems="center">
                <Typography
                  color={motionDoor ? theme.palette.success.dark : theme.palette.error.main}
                  variant="h4"
                  sx={{ ml: 3, p: 1 }}
                >
                  {motionDoor ? `On` : 'Off'}
                </Typography>
                <Switch checked={motionDoor} onChange={() => setMotionAlarm((v) => !v)} />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
