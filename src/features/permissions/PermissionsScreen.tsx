import { Card } from '../../shared/ui/Card';

export function PermissionsScreen() {
  return (
    <Card title="Permissions Panel" description="Review least-privilege capabilities.">
      <label><input type="checkbox" defaultChecked /> storage</label>
      <label><input type="checkbox" defaultChecked /> activeTab</label>
      <label><input type="checkbox" /> scripting</label>
      <label><input type="checkbox" /> notifications</label>
      <p className="muted">Tip: keep optional permissions disabled until a feature needs them.</p>
    </Card>
  );
}
