import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { BuilderScreen } from '../features/builder/BuilderScreen';
import { ExportScreen } from '../features/export/ExportScreen';
import { HomeScreen } from '../features/projects/HomeScreen';
import { ProjectSetupScreen } from '../features/projects/ProjectSetupScreen';
import { PermissionsScreen } from '../features/permissions/PermissionsScreen';

export function App() {
  return (
    <div className="app-shell">
      <header className="top-bar">
        <h1>U-Wright Extension Foundry</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/setup">Project Setup</Link>
          <Link to="/builder">Builder</Link>
          <Link to="/permissions">Permissions</Link>
          <Link to="/export">Export</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/setup" element={<ProjectSetupScreen />} />
          <Route path="/builder" element={<BuilderScreen />} />
          <Route path="/permissions" element={<PermissionsScreen />} />
          <Route path="/export" element={<ExportScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
