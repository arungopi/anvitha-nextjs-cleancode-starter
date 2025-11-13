import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  LinearProgress 
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Dashboard = () => {
  // Sample data for a Data Center Operations Platform
  const stats = {
    // Infrastructure and Health Metrics
    totalServers: 480, // Total number of servers monitored
    serversOnline: 455, // Servers currently reported as Online (replaces totalTasks)
    serversOffline: 25, // Servers currently offline (replaces pendingTasks)
    
    // Alerting and Incident Management Metrics
    totalAlerts: 120, // Total alerts generated in a timeframe
    criticalAlerts: 15, // Number of high-priority critical alerts
    resolvedAlerts: 95, // Alerts that have been resolved
    
    // Resource Utilization Metrics
    avgRackPower: 60, // Average Rack Power Utilization in percent
    pueScore: 1.45, // Latest PUE (Power Usage Effectiveness) score
  };

  // Calculations for progress bars
  const serverUptimePercent = (stats.serversOnline / stats.totalServers) * 100;
  const alertResolutionPercent = (stats.resolvedAlerts / stats.totalAlerts) * 100;

  // Helper to render a stat card - unchanged structure, added a default unit
  const StatCard = ({ label, value, unit = '' } : {label : string, value : number | string, unit? : string}) => (
    <Card sx={{ width: 220, minWidth: 200, display: 'flex', flexDirection: 'column' }}> 
      <CardContent>
        <Typography variant="subtitle1" color="text.secondary">{label}</Typography>
        <Typography variant="h4" sx={{ mt: 1 }}>
          {value}
          {unit && <Typography component="span" variant="h6" color="text.secondary" sx={{ ml: 0.5 }}>{unit}</Typography>}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header 
      <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
        <DashboardIcon sx={{ mr: 1 }} /> Data Center Operations Dashboard ⚙️
      </Typography>
      */}

      {/* Top-level Infrastructure and Alert stats row */}
      <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #eee', pb: 0.5 }}>
        Infrastructure & Health Summary
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <StatCard label="Total Servers" value={stats.totalServers} />
        <StatCard label="Servers Offline" value={stats.serversOffline} />
        <StatCard label="Critical Alerts (24h)" value={stats.criticalAlerts} />
        <StatCard label="Resolved Alerts (24h)" value={stats.resolvedAlerts} />
      </Box>

      {/* Resource Utilization row */}
      <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #eee', pb: 0.5, mt: 2 }}>
        Efficiency & Utilization
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <StatCard label="Average Rack Power" value={stats.avgRackPower} unit="%" />
        <StatCard label="Latest PUE Score" value={stats.pueScore.toFixed(2)} /> 
        {/* We can use the 'serversOnline' count here as a metric */}
        <StatCard label="Servers Online" value={stats.serversOnline} />
        <StatCard label="Total Alerts (24h)" value={stats.totalAlerts} />
      </Box>

      {/* Progress bars (now focused on operational status) */}
      <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #eee', pb: 0.5, mt: 2 }}>
        Performance Indicators
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, flexWrap: 'wrap' }}>
        <Card sx={{ flex: '1 1 45%' }}> {/* Use flex to allow cards to stretch */}
          <CardContent>
            <Typography variant="subtitle1">Server Uptime Status</Typography>
            <LinearProgress
              variant="determinate"
              value={serverUptimePercent}
              color={serverUptimePercent > 95 ? 'success' : 'warning'}
              sx={{ height: 10, borderRadius: 5, mt: 1, mb: 1 }}
            />
            <Typography variant="body2">
              {serverUptimePercent.toFixed(1)}% ({stats.serversOnline} of {stats.totalServers} Online)
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: '1 1 45%' }}>
          <CardContent>
            <Typography variant="subtitle1">Alert Resolution Rate (Past 24H)</Typography>
            <LinearProgress
              variant="determinate"
              value={alertResolutionPercent}
              color={alertResolutionPercent > 80 ? 'success' : 'error'}
              sx={{ height: 10, borderRadius: 5, mt: 1, mb: 1 }}
            />
            <Typography variant="body2">
              {alertResolutionPercent.toFixed(1)}% ({stats.resolvedAlerts} of {stats.totalAlerts} Resolved)
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
