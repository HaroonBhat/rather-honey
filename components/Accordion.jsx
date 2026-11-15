'use client';

import { useState } from 'react';
import { PlusIcon } from './Icons';

export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `accordion-panel-${index}`;
        const buttonId = `accordion-button-${index}`;
        return (
          <div className="accordion__item" key={item.title}>
            <h3>
              <button
                type="button"
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                id={buttonId}
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                {item.title}
                <PlusIcon size={17} />
              </button>
            </h3>
            <div
              className="accordion__panel"
              data-open={isOpen}
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
            >
              <div className="accordion__inner">
                <div className="accordion__content">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
