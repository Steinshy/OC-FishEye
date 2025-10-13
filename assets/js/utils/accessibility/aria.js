export const aria = {
  updateAttributes(element, attributes) {
    if (!element) return;
    Object.entries(attributes).forEach(([attribute, value]) => {
      value != null ? element.setAttribute(attribute, value) : element.removeAttribute(attribute);
    });
  },

  setExpanded(element, expanded) {
    aria.updateAttributes(element, { 'aria-expanded': expanded });
  },

  setHidden(element, hidden) {
    aria.updateAttributes(element, { 'aria-hidden': hidden });
  },

  setSelected(options, selected) {
    options.forEach(option => aria.updateAttributes(option, { 'aria-selected': option === selected }));
  },

  setActiveDescendant(container, active) {
    aria.updateAttributes(container, { 'aria-activedescendant': active?.id || null });
  },

  setDisabled(element, disabled) {
    if (!element) return;
    element.disabled = disabled;
    aria.updateAttributes(element, { 'aria-disabled': disabled });
  },

  setLive(element, value = 'polite') {
    aria.updateAttributes(element, { 'aria-live': value });
  },

  setLabel(element, label) {
    aria.updateAttributes(element, { 'aria-label': label });
  },

  setDescribedBy(element, id) {
    aria.updateAttributes(element, { 'aria-describedby': id });
  },

  setRole(element, role) {
    aria.updateAttributes(element, { role });
  },

  setTabindex(element, value) {
    if (!element) return;
    value === null ? element.removeAttribute('tabindex') : element.setAttribute('tabindex', String(value));
  },

  makeInteractive(element, { role = 'button', label, tabindex = 0 } = {}) {
    if (!element) return;
    aria.setRole(element, role);
    aria.setTabindex(element, tabindex);
    if (label) aria.setLabel(element, label);
  },

  toggleVisibility(element, visible, className = 'show') {
    if (!element) return;
    element.classList.toggle(className, visible);
    aria.setHidden(element, !visible);
  },

  // Getters
  isSelected(element) {
    return element?.getAttribute('aria-selected') === 'true';
  },

  isExpanded(element) {
    return element?.getAttribute('aria-expanded') === 'true';
  },

  isDisabled(element) {
    return element?.hasAttribute('disabled');
  },
};
