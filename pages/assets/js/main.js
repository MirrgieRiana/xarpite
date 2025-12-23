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
  function resetButtonAfterDelay(button, delay, cssClass) {
    setTimeout(() => {
      button.textContent = COPY_BUTTON_TEXT.DEFAULT;
      if (cssClass) {
        button.classList.remove(cssClass);
      }
    }, delay);
  }

  /**
   * Copies text to clipboard using modern API
   */
  function copyWithClipboardAPI(text, button) {
    return navigator.clipboard.writeText(text)
      .then(() => {
        setButtonState(button, COPY_BUTTON_TEXT.SUCCESS, 'copied');
        resetButtonAfterDelay(button, FEEDBACK_DISPLAY_DURATION, 'copied');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        setButtonState(button, COPY_BUTTON_TEXT.FAILURE);
        resetButtonAfterDelay(button, FEEDBACK_DISPLAY_DURATION, null);
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
      const cssClass = successful ? 'copied' : null;
      setButtonState(
        button, 
        successful ? COPY_BUTTON_TEXT.SUCCESS : COPY_BUTTON_TEXT.FAILURE,
        cssClass
      );
      resetButtonAfterDelay(button, FEEDBACK_DISPLAY_DURATION, cssClass);
    } catch (err) {
      console.error('Failed to copy:', err);
      setButtonState(button, COPY_BUTTON_TEXT.FAILURE);
      resetButtonAfterDelay(button, FEEDBACK_DISPLAY_DURATION, null);
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
    
    preElement.parentElement.insertBefore(wrapper, preElement);
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

  // Allow lowercase alphanumerics and Japanese scripts (hiragana, katakana, kanji)
  const SLUG_ALLOWED_CHARS_PATTERN = /[^a-z0-9ぁ-んァ-ヶ一-龠-]/g;

  /**
   * Generates a stable ID for a heading if it does not already have one
   */
  function ensureHeadingId(heading, existingIds) {
    if (heading.id) {
      return heading.id;
    }

    const slug = heading.textContent
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(SLUG_ALLOWED_CHARS_PATTERN, '');

    let candidate = slug || 'section';
    let counter = 1;
    while (existingIds.has(candidate)) {
      candidate = `${slug || 'section'}-${counter++}`;
    }

    heading.id = candidate;
    existingIds.add(candidate);
    return heading.id;
  }

  /**
   * Builds a table of contents based on headings in the document content
   */
  function buildTableOfContents() {
    const tocList = document.querySelector('.doc-content #markdown-toc');
    if (!tocList) {
      return;
    }

    const headings = Array.from(
      document.querySelectorAll('.doc-content h1, .doc-content h2, .doc-content h3')
    )
      // Exclude headings inside TOC containers to avoid self-referencing
      .filter(heading => !heading.closest('.table-of-contents'));

    const tocWrapper = tocList.closest('.table-of-contents');

    if (headings.length === 0) {
      if (tocWrapper) {
        tocWrapper.style.display = 'none';
      }
      tocList.innerHTML = '';
      return;
    }

    if (tocWrapper) {
      tocWrapper.style.display = '';
    }

    const existingIds = new Set(
      Array.from(document.querySelectorAll('[id]')).map(element => element.id)
    );

    tocList.innerHTML = '';
    const listStack = [tocList];
    let currentLevel = null;

    headings.forEach(heading => {
      const level = parseInt(heading.tagName.substring(1), 10);
      const headingId = ensureHeadingId(heading, existingIds);

      if (currentLevel === null) {
        currentLevel = level;
      } else {
        // Adjust nesting depth to match the current heading level
        while (level > currentLevel) {
          const lastList = listStack[listStack.length - 1];
          const lastItem = lastList.lastElementChild;
          if (!lastItem) {
            break;
          }
          const nestedList = document.createElement('ul');
          lastItem.appendChild(nestedList);
          listStack.push(nestedList);
          currentLevel++;
        }

        while (level < currentLevel && listStack.length > 1) {
          listStack.pop();
          currentLevel--;
        }
      }

      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${headingId}`;
      link.textContent = heading.textContent;
      listItem.appendChild(link);
      listStack[listStack.length - 1].appendChild(listItem);
    });
  }

  /**
   * Initializes all page functionality
   */
  function init() {
    highlightCurrentNav();
    buildTableOfContents();
    addCopyButtonsToCodeBlocks();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
