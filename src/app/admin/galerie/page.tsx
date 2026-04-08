'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trash2, Upload } from 'lucide-react'

type GallerySlot = { id: string; src: string; alt: string }

const initialImages: GallerySlot[] = [
  { id: 'logo-1', src: '/images/logo.png', alt: 'El Medina — logo' },
]

export default function AdminGalleryPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<GallerySlot[]>(initialImages)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    // Placeholder: real upload would POST to server
    e.target.value = ''
  }

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="font-heading text-3xl md:text-4xl text-cream">Galerie</h1>
        <p className="text-beige-dark mt-2 max-w-2xl">
          Încărcarea și salvarea imaginilor vor funcționa după conectarea la backend. Poți previzualiza
          structura și ordinea elementelor.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4 }}
        className="relative glass-surface rounded-2xl border-2 border-dashed border-gold/25 px-6 py-14 text-center cursor-pointer hover:border-gold/40 transition-colors group"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Zonă încărcare imagini"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={handleFileChange}
        />
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold/10 text-gold mb-4 group-hover:bg-gold/15 transition-colors">
          <Upload className="w-7 h-7" />
        </div>
        <p className="text-cream font-medium text-lg">Încarcă imagini</p>
        <p className="text-beige-dark text-sm mt-2">PNG, JPG sau WEBP — trage fișierele aici sau apasă</p>
      </motion.div>

      <p className="text-sm text-beige-dark flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold/60" />
        Poți reordona imaginile prin tragere și plasare după ce backend-ul este activ.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            className="glass-card rounded-xl overflow-hidden group relative aspect-square"
          >
            <Image src={img.src} alt={img.alt} fill className="object-contain p-4 bg-dark-surface/50" />
            <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeImage(img.id)
                }}
                className="p-3 rounded-xl bg-red-500/90 text-white hover:bg-red-500 transition-colors shadow-lg"
                aria-label="Șterge imaginea"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
