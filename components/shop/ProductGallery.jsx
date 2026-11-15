'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images, name, badge }) {
  const [active, setActive] = useState(0);

  return (
    <div className="pdp__gallery">
      <div className="pdp__main">
        {badge && (
          <span className={`pdp__badge pill ${badge === 'New' ? 'pill--gold' : 'pill--dark'}`}>
            {badge}
          </span>
        )}
        <Image
          key={images[active].src}
          src={images[active].src}
          alt={images[active].alt}
          fill
          priority
          sizes="(max-width: 979px) 92vw, 48vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="pdp__thumbs" role="group" aria-label="Product images">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className="thumb"
            aria-current={index === active}
            aria-label={`Show image ${index + 1} of ${images.length} for ${name}`}
            onClick={() => setActive(index)}
          >
            <Image src={image.src} alt="" fill sizes="120px" style={{ objectFit: 'cover' }} />
          </button>
        ))}
      </div>
    </div>
  );
}
