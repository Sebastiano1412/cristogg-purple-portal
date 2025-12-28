import { useEffect, useRef } from 'react';

interface SpoilerRendererProps {
  content: string;
}

const SpoilerRenderer = ({ content }: SpoilerRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Convert spoiler divs to interactive details/summary
    const spoilers = containerRef.current.querySelectorAll('[data-spoiler]');
    spoilers.forEach((spoiler) => {
      const title = spoiler.getAttribute('data-title') || 'Spoiler';
      const innerContent = spoiler.innerHTML;

      const details = document.createElement('details');
      details.className = 'spoiler-block';

      const summary = document.createElement('summary');
      summary.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary shrink-0"><polyline points="9 18 15 12 9 6"></polyline></svg><span>${title}</span>`;

      const contentDiv = document.createElement('div');
      contentDiv.innerHTML = innerContent;

      details.appendChild(summary);
      details.appendChild(contentDiv);

      spoiler.replaceWith(details);
    });

    // Add click handler to toggle chevron
    const allDetails = containerRef.current.querySelectorAll('details.spoiler-block');
    allDetails.forEach((detail) => {
      detail.addEventListener('toggle', () => {
        const svg = detail.querySelector('summary svg');
        if (svg) {
          if ((detail as HTMLDetailsElement).open) {
            svg.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
          } else {
            svg.innerHTML = '<polyline points="9 18 15 12 9 6"></polyline>';
          }
        }
      });
    });
  }, [content]);

  return (
    <div
      ref={containerRef}
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default SpoilerRenderer;
