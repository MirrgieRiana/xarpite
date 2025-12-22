// Main site JavaScript - handles navigation highlighting and code copy functionality
(function() {
  'use strict';

  // Constants
  const COPY_BUTTON_TEXT = {
    DEFAULT: 'Copy',
    SUCCESS: 'Copied!',
    FAILURE: 'Failed'
  };
  
  const FEEDBACK_DISPLAY_DURATION = 2000; // milliseconds

  /**
   * Normalizes a URL path by removing trailing slashes
   */
  function normalizePath(path) {
    return path.replace(/\/$/, '');
  }

  /**
   * Checks if two paths match, accounting for .html extension variations
   */
  function pathsMatch(currentPath, linkPath) {
    const normalizedCurrent = normalizePath(currentPath);
    const normalizedLink = normalizePath(linkPath);
    
    return normalizedCurrent === normalizedLink || 
           normalizedCurrent === normalizedLink + '.html' || 
           normalizedCurrent.replace('.html', '') === normalizedLink;
  }

  /**
   * Highlights the current page in the navigation menu
   */
  function highlightCurrentNav() {
    const currentPath = normalizePath(window.location.pathname);
    const navLinks = document.querySelectorAll('.doc-nav a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && pathsMatch(currentPath, href)) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Sets button state with text and optional CSS class
   */
  function setButtonState(button, text, cssClass) {
    button.textContent = text;
    if (cssClass) {
      button.classList.add(cssClass);
    }
  }

  /**
   * Resets button to default state after a delay
   */
  function resetButtonAfterDelay(button, delay) {
    setTimeout(() => {
      button.textContent = COPY_BUTTON_TEXT.DEFAULT;
      button.classList.remove('copied');
    }, delay);
  }

  /**
   * Copies text to clipboard using modern API
   */
  function copyWithClipboardAPI(text, button) {
    return navigator.clipboard.writeText(text)
      .then(() => {
        setButtonState(button, COPY_BUTTON_TEXT.SUCCESS, 'copied');
        resetButtonAfterDelay(button, FEEDBACK_DISPLAY_DURATION);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        setButtonState(button, COPY_BUTTON_TEXT.FAILURE);
        resetButtonAfterDelay(button, FEEDBACK_DISPLAY_DURATION);
      });
  }

  /**
   * Copies text to clipboard using legacy execCommand (fallback)
   */
  function copyWithExecCommand(text, button) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      const successful = document.execCommand('copy');
      setButtonState(
        button, 
        successful ? COPY_BUTTON_TEXT.SUCCESS : COPY_BUTTON_TEXT.FAILURE,
        successful ? 'copied' : null
      );
      resetButtonAfterDelay(button, FEEDBACK_DISPLAY_DURATION);
    } catch (err) {
      console.error('Failed to copy:', err);
      setButtonState(button, COPY_BUTTON_TEXT.FAILURE);
      resetButtonAfterDelay(button, FEEDBACK_DISPLAY_DURATION);
    } finally {
      document.body.removeChild(textarea);
    }
  }

  /**
   * Determines if the current context is secure (HTTPS or localhost)
   */
  function isSecureContext() {
    return window.isSecureContext;
  }

  /**
   * Handles copying text to clipboard with appropriate fallback
   */
  function copyToClipboard(text, button) {
    if (navigator.clipboard && isSecureContext()) {
      copyWithClipboardAPI(text, button);
    } else {
      copyWithExecCommand(text, button);
    }
  }

  /**
   * Creates and returns a copy button element
   */
  function createCopyButton() {
    const button = document.createElement('button');
    button.className = 'copy-code-button';
    button.textContent = COPY_BUTTON_TEXT.DEFAULT;
    button.setAttribute('aria-label', 'Copy code');
    return button;
  }

  /**
   * Wraps a code block with a wrapper div and adds a copy button
   */
  function wrapCodeBlock(preElement) {
    // Skip if already wrapped or if element has no parent
    if (!preElement.parentElement || 
        preElement.parentElement.classList.contains('code-block-wrapper')) {
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    
    const copyButton = createCopyButton();
    
    copyButton.addEventListener('click', () => {
      const code = preElement.querySelector('code') || preElement;
      const textToCopy = code.textContent;
      copyToClipboard(textToCopy, copyButton);
    });
    
    preElement.parentNode.insertBefore(wrapper, preElement);
    wrapper.appendChild(preElement);
    wrapper.appendChild(copyButton);
  }

  /**
   * Adds copy buttons to all code blocks on the page
   */
  function addCopyButtonsToCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.doc-content pre');
    codeBlocks.forEach(wrapCodeBlock);
  }

  /**
   * Initializes all page functionality
   */
  function init() {
    highlightCurrentNav();
    addCopyButtonsToCodeBlocks();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
