import { useState } from 'react';
import { sensorData, SensorData } from '@/data/mockData';
import {
  Droplets,
  Thermometer,
  CloudRain,
  Waves,
  Cog,
  FlaskConical,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
  Leaf,
  Zap,
  Shield,
  Droplet,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Droplets,
  Thermometer,
  CloudRain,
  Waves,
  Cog,
  FlaskConical,
  Leaf,
  Zap,
  Shield,
  Droplet,
};

const SensorDetails = () => {
  const [sensors, setSensors] = useState<SensorData[]>(sensorData);
  const [selectedSensor, setSelectedSensor] = useState<SensorData>(sensors[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const Icon = iconMap[selectedSensor.icon] || Droplets;

  const getStatusBg = () => {
    switch (selectedSensor.status) {
      case 'good':
        return 'bg-success/15';
      case 'warning':
        return 'bg-warning/15';
      case 'critical':
        return 'bg-danger/15';
      default:
        return 'bg-muted';
    }
  };

  const getStatusText = () => {
    switch (selectedSensor.status) {
      case 'good':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-danger';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTrend = () => {
    if (!selectedSensor.history || selectedSensor.history.length < 2) return 'stable';
    const last = selectedSensor.history[selectedSensor.history.length - 1];
    const prev = selectedSensor.history[selectedSensor.history.length - 2];
    if (last > prev) return 'up';
    if (last < prev) return 'down';
    return 'stable';
  };

  const getDisplayValue = () => {
    if (selectedSensor.id === 'motor-status' || selectedSensor.id === 'motor-status-2') {
      return selectedSensor.value === 1 ? 'ON' : 'OFF';
    }
    if (selectedSensor.id === 'valve-1' || selectedSensor.id === 'valve-2') {
      return selectedSensor.value === 1 ? 'OPEN' : 'CLOSED';
    }
    if (selectedSensor.id === 'water-level') {
      if (selectedSensor.value >= 70) return 'Full';
      if (selectedSensor.value >= 40) return 'Medium';
      return 'Low';
    }
    return `${selectedSensor.value}${selectedSensor.unit}`;
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="section-title flex items-center gap-3">
            <Activity className="h-8 w-8 text-primary" />
            Sensor Details
          </h1>
          <p className="text-muted-foreground mt-1">
            Detailed view of all agricultural parameters
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="btn-primary self-start sm:self-auto"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sensor Selection */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold text-foreground mb-4">Select Sensor</h3>
            <div className="space-y-2">
              {sensors.map((sensor) => {
                const SensorIcon = iconMap[sensor.icon] || Droplets;
                const isSelected = selectedSensor.id === sensor.id;
                return (
                  <button
                    key={sensor.id}
                    onClick={() => setSelectedSensor(sensor)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                      isSelected
                        ? 'bg-primary/10 border border-primary/30'
                        : 'hover:bg-muted border border-transparent'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        isSelected ? 'bg-primary/20' : 'bg-muted'
                      }`}
                    >
                      <SensorIcon
                        className={`h-5 w-5 ${
                          isSelected ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      />
                    </div>
                    <div className="text-left">
                      <p
                        className={`font-medium ${
                          isSelected ? 'text-primary' : 'text-foreground'
                        }`}
                      >
                        {sensor.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {sensor.id === 'motor-status' || sensor.id === 'motor-status-2'
                          ? sensor.value === 1
                            ? 'ON'
                            : 'OFF'
                          : sensor.id === 'valve-1' || sensor.id === 'valve-2'
                          ? sensor.value === 1
                            ? 'OPEN'
                            : 'CLOSED'
                          : `${sensor.value}${sensor.unit}`}
                      </p>
                    </div>
                    <div
                      className={`ml-auto h-2.5 w-2.5 rounded-full ${
                        sensor.status === 'good'
                          ? 'bg-success'
                          : sensor.status === 'warning'
                          ? 'bg-warning'
                          : 'bg-danger'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sensor Detail View */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Stats Card */}
          <div className={`rounded-xl p-6 ${getStatusBg()} border border-border`}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-card`}
                >
                  <Icon className={`h-8 w-8 ${getStatusText()}`} />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    {selectedSensor.name}
                  </h2>
                  <p className="text-muted-foreground">{selectedSensor.description}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize ${getStatusBg()} ${getStatusText()}`}
              >
                {selectedSensor.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-card rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Current Value</p>
                <p className={`font-display text-3xl font-bold ${getStatusText()}`}>
                  {getDisplayValue()}
                </p>
              </div>
              <div className="bg-card rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Trend</p>
                <div className="flex items-center gap-2">
                  {getTrend() === 'up' ? (
                    <TrendingUp className="h-6 w-6 text-success" />
                  ) : getTrend() === 'down' ? (
                    <TrendingDown className="h-6 w-6 text-danger" />
                  ) : (
                    <Minus className="h-6 w-6 text-muted-foreground" />
                  )}
                  <span className="font-semibold capitalize">{getTrend()}</span>
                </div>
              </div>
              {selectedSensor.max && (
                <div className="bg-card rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Range</p>
                  <p className="font-semibold text-foreground">
                    {selectedSensor.min} - {selectedSensor.max}
                    {selectedSensor.unit}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Graph Placeholder */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Historical Data</h3>
            <div className="graph-placeholder h-64 flex items-center justify-center">
              <div className="text-center">
                <Activity className="h-12 w-12 text-primary/30 mx-auto mb-3" />
                <p className="text-muted-foreground">Graph visualization placeholder</p>
                <p className="text-sm text-muted-foreground/70">
                  Connect to backend for real-time charts
                </p>
              </div>
            </div>
            {/* Mini bar chart representation */}
            {selectedSensor.history && (
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-3">Recent readings</p>
                <div className="flex items-end gap-2 h-20">
                  {selectedSensor.history.map((value, index) => {
                    const maxVal = selectedSensor.max || Math.max(...selectedSensor.history!);
                    const height = (value / maxVal) * 100;
                    return (
                      <div
                        key={index}
                        className={`flex-1 rounded-t-md transition-all ${getStatusBg()}`}
                        style={{ height: `${height}%` }}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-card rounded-xl border border-border p-5">
              <h4 className="font-semibold text-foreground mb-3">Thresholds</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Optimal Range</span>
                  <span className="text-success font-medium">60% - 80%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Warning Level</span>
                  <span className="text-warning font-medium">40% - 60%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Critical Level</span>
                  <span className="text-danger font-medium">&lt; 40%</span>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-5">
              <h4 className="font-semibold text-foreground mb-3">Recommendations</h4>
              <p className="text-sm text-muted-foreground">
                {selectedSensor.status === 'good'
                  ? 'All parameters are within optimal range. Continue current practices.'
                  : selectedSensor.status === 'warning'
                  ? 'Some parameters need attention. Consider adjusting irrigation schedule.'
                  : 'Immediate action required. Check sensor and take corrective measures.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorDetails;
