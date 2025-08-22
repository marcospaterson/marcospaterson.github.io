// Copy button functionality for code blocks
document.addEventListener('DOMContentLoaded', function() {
  console.log('Code copy script loaded');
  
  // Remove any existing copy buttons to prevent duplicates
  const existingButtons = document.querySelectorAll('.copy-code-btn');
  console.log('Found existing buttons:', existingButtons.length);
  existingButtons.forEach(btn => btn.remove());
  
  // Find all code blocks with the correct Jekyll structure
  const codeBlocks = document.querySelectorAll('.highlighter-rouge');
  console.log('Found code blocks:', codeBlocks.length);
  
  codeBlocks.forEach(function(container) {
    const highlightDiv = container.querySelector('.highlight');
    if (!highlightDiv) return;
    
    // Make the highlight div relative for positioning
    highlightDiv.style.position = 'relative';
    
    // Create copy button
    const button = document.createElement('button');
    button.className = 'copy-code-btn';
    button.type = 'button';
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      Copy
    `;
    
    // Style the button
    Object.assign(button.style, {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'rgba(45, 45, 45, 0.95)',
      color: '#d4d4d4',
      border: '1px solid #555',
      borderRadius: '6px',
      padding: '6px 10px',
      fontSize: '12px',
      fontFamily: 'monospace',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      opacity: '0',
      transition: 'opacity 0.2s ease',
      zIndex: '50',
      lineHeight: '1'
    });
    
    // Show/hide on hover
    highlightDiv.addEventListener('mouseenter', () => button.style.opacity = '1');
    highlightDiv.addEventListener('mouseleave', () => {
      if (!button.classList.contains('copied')) {
        button.style.opacity = '0';
      }
    });
    
    // Copy functionality
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Get code content from Rouge structure
      const rougeCodeCell = highlightDiv.querySelector('td.rouge-code pre');
      let codeText = '';
      
      if (rougeCodeCell) {
        codeText = rougeCodeCell.textContent || rougeCodeCell.innerText;
      } else {
        // Fallback for simpler structures
        const preElement = highlightDiv.querySelector('pre');
        if (preElement) {
          codeText = preElement.textContent || preElement.innerText;
        }
      }
      
      // Clean the text
      codeText = codeText.trim();
      
      // Copy to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(codeText).then(() => {
          showSuccess(button);
        }).catch(() => {
          fallbackCopy(codeText, button);
        });
      } else {
        fallbackCopy(codeText, button);
      }
    });
    
    highlightDiv.appendChild(button);
  });
  
  function showSuccess(button) {
    button.classList.add('copied');
    button.style.background = 'rgba(76, 175, 80, 0.95)';
    button.style.opacity = '1';
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20,6 9,17 4,12"></polyline>
      </svg>
      Copied!
    `;
    
    setTimeout(() => {
      button.classList.remove('copied');
      button.style.background = 'rgba(45, 45, 45, 0.95)';
      button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        Copy
      `;
      button.style.opacity = '0';
    }, 2000);
  }
  
  function fallbackCopy(text, button) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      showSuccess(button);
    } catch (err) {
      console.error('Copy failed:', err);
    } finally {
      document.body.removeChild(textarea);
    }
  }
});
