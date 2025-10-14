// ARIA attribute management utilities

export const aria = {
  // Update multiple ARIA attributes on element
  updateAttributes(element, attributes) {
    if (!element) return;
    Object.entries(attributes).forEach(([attribute, value]) => {
      value != null ? element.setAttribute(attribute, value) : element.removeAttribute(attribute);
    });
  },

  // Set aria-expanded attribute
  setExpanded(element, expanded) {
    aria.updateAttributes(element, { 'aria-expanded': expanded });
  },

  // Set aria-hidden attribute
  setHidden(element, hidden) {
    aria.updateAttributes(element, { 'aria-hidden': hidden });
  },

  // Set aria-selected on multiple options
  setSelected(options, selected) {
    options.forEach(option => aria.updateAttributes(option, { 'aria-selected': option === selected }));
  },

  // Set aria-activedescendant attribute
  setActiveDescendant(container, active) {
    aria.updateAttributes(container, { 'aria-activedescendant': active?.id || null });
  },

  // Set disabled state with ARIA
  setDisabled(element, disabled) {
    if (!element) return;
    element.disabled = disabled;
    aria.updateAttributes(element, { 'aria-disabled': disabled });
  },

  // Set aria-live region
  setLive(element, value = 'polite') {
    aria.updateAttributes(element, { 'aria-live': value });
  },

  // Set aria-label attribute
  setLabel(element, label) {
    aria.updateAttributes(element, { 'aria-label': label });
  },

  // Set aria-describedby attribute
  setDescribedBy(element, id) {
    aria.updateAttributes(element, { 'aria-describedby': id });
  },

  // Set role attribute
  setRole(element, role) {
    aria.updateAttributes(element, { role });
  },

  // Set tabindex attribute
  setTabindex(element, value) {
    if (!element) return;
    value === null ? element.removeAttribute('tabindex') : element.setAttribute('tabindex', String(value));
  },

  // Make element keyboard accessible
  makeInteractive(element, { role = 'button', label, tabindex = 0 } = {}) {
    if (!element) return;
    aria.setRole(element, role);
    aria.setTabindex(element, tabindex);
    if (label) aria.setLabel(element, label);
  },

  // Toggle element visibility with ARIA
  toggleVisibility(element, visible, className = 'show') {
    if (!element) return;
    element.classList.toggle(className, visible);
    aria.setHidden(element, !visible);
  },

  // Check if element is selected
  isSelected(element) {
    return element?.getAttribute('aria-selected') === 'true';
  },

  // Check if element is expanded
  isExpanded(element) {
    return element?.getAttribute('aria-expanded') === 'true';
  },

  // Check if element is disabled
  isDisabled(element) {
    return element?.hasAttribute('disabled');
  },
};
