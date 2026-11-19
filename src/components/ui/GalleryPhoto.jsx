import { useState } from 'react'
import GalleryScene from './GalleryScene'

/**
 * Capa fotográfica con respaldo ilustrado. La escena vectorial se pinta
 * siempre debajo: si la foto real todavía no existe, el componente sigue
 * mostrando una imagen documental coherente.
 */
export default function GalleryPhoto({ photo, className = '', imageClassName = '' }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`h-full w-full overflow-hidden bg-sage/30 ${className}`}>
      <GalleryScene scene={photo.sceneKey} label={photo.alt} />

      {!failed && (
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover ${imageClassName}`}
        />
      )}
    </div>
  )
}
