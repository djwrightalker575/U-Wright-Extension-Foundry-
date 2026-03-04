type SelectorPickerModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SelectorPickerModal({ open, onClose }: SelectorPickerModalProps) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h3>Selector Picker</h3>
        <p>Choose how Foundry identifies page elements during extraction.</p>
        <ul>
          <li>CSS Selector</li>
          <li>Text Match</li>
          <li>Attribute Selector</li>
          <li>XPath</li>
        </ul>
        <button onClick={onClose}>Done</button>
      </div>
    </div>
  );
}
