import { Link } from 'react-router-dom';
import { Card } from '../../shared/ui/Card';

export function HomeScreen() {
  return (
    <Card
      title="Welcome to Foundry"
      description="Start and manage local-first browser extension projects."
    >
      <p>Create a new project, compose selectors, configure permissions, and export safely.</p>
      <div className="row">
        <Link className="button" to="/setup">
          Start Project Setup
        </Link>
      </div>
    </Card>
  );
}
