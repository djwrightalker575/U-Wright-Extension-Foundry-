import { Card } from '../../shared/ui/Card';

export function ExportScreen() {
  return (
    <Card title="Export" description="Generate extension build artifacts.">
      <p>Ready to package your extension for local installation.</p>
      <ul>
        <li>Manifest v3 validation: Passed</li>
        <li>Permission audit: Passed</li>
        <li>Asset bundle: 298 KB</li>
      </ul>
      <button>Export ZIP</button>
    </Card>
  );
}
