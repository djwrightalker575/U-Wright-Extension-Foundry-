import { useState } from 'react';
import { Card } from '../../shared/ui/Card';

export function ProjectSetupScreen() {
  const [name, setName] = useState('My Extension');

  return (
    <Card title="Project Setup" description="Define metadata and extension targets.">
      <label>
        Project Name
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Extension Type
        <select defaultValue="popup">
          <option value="popup">Popup</option>
          <option value="sidebar">Sidebar</option>
          <option value="content-script">Content Script</option>
        </select>
      </label>
      <fieldset>
        <legend>Target Browsers</legend>
        <label><input type="checkbox" defaultChecked /> Chrome</label>
        <label><input type="checkbox" defaultChecked /> Firefox</label>
        <label><input type="checkbox" /> Edge</label>
      </fieldset>
    </Card>
  );
}
