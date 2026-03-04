import { useState } from 'react';
import { Card } from '../../shared/ui/Card';
import { SelectorPickerModal } from './SelectorPickerModal';

export function BuilderScreen() {
  const [showSelectorPicker, setShowSelectorPicker] = useState(false);

  return (
    <>
      <Card title="Builder" description="Compose extraction and automation steps.">
        <div className="row">
          <button onClick={() => setShowSelectorPicker(true)}>Open Selector Picker</button>
          <button>Add Action</button>
          <button>Run Dry Test</button>
        </div>
        <ol>
          <li>Navigate to target page</li>
          <li>Pick selectors for key elements</li>
          <li>Transform data in local workflow</li>
        </ol>
      </Card>

      <SelectorPickerModal open={showSelectorPicker} onClose={() => setShowSelectorPicker(false)} />
    </>
  );
}
