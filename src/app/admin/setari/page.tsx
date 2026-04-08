'use client'

import { motion } from 'framer-motion'
import { businessInfo } from '@/data/business'
import { seoConfig } from '@/data/seo'

const inputReadonly =
  'w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-cream focus:border-gold outline-none transition-colors read-only:opacity-90'

const textareaReadonly =
  'w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-cream focus:border-gold outline-none transition-colors resize-y min-h-[100px] read-only:opacity-90'

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="font-heading text-3xl md:text-4xl text-cream">Setări</h1>
        <p className="text-beige-dark mt-2">
          Datele afișate provin din fișierele statice ale proiectului. Modificările vor putea fi salvate în
          baza de date.
        </p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4 }}
        className="glass-card rounded-xl p-6 md:p-8 space-y-5"
      >
        <h2 className="font-heading text-xl text-gold">Informații restaurant</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Denumire" value={businessInfo.name} />
          <Field label="Subtitlu" value={businessInfo.subtitle} />
          <div className="md:col-span-2">
            <Field label="Adresă" value={businessInfo.address} />
          </div>
          <Field label="Telefon" value={businessInfo.phone} />
          <Field label="WhatsApp" value={businessInfo.whatsapp} />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="glass-card rounded-xl p-6 md:p-8 space-y-5"
      >
        <h2 className="font-heading text-xl text-gold">Program</h2>
        <div className="overflow-x-auto rounded-xl border border-dark-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-dark-surface border-b border-dark-border text-left text-beige-dark">
                <th className="px-4 py-3 font-medium">Zi</th>
                <th className="px-4 py-3 font-medium">Interval</th>
              </tr>
            </thead>
            <tbody>
              {businessInfo.openingHours.map((row) => (
                <tr key={row.day} className="border-b border-dark-border last:border-0">
                  <td className="px-4 py-3 text-cream">{row.day}</td>
                  <td className="px-4 py-3 text-beige-dark">{row.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.4 }}
        className="glass-card rounded-xl p-6 md:p-8 space-y-5"
      >
        <h2 className="font-heading text-xl text-gold">Rețele sociale</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-beige-dark mb-2">Instagram</label>
            <input
              readOnly
              className={inputReadonly}
              value={businessInfo.instagram ?? ''}
              placeholder="—"
            />
          </div>
          <div>
            <label className="block text-sm text-beige-dark mb-2">Facebook</label>
            <input
              readOnly
              className={inputReadonly}
              value={businessInfo.facebook ?? ''}
              placeholder="—"
            />
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14, duration: 0.4 }}
        className="glass-card rounded-xl p-6 md:p-8 space-y-5"
      >
        <h2 className="font-heading text-xl text-gold">SEO</h2>
        <div>
          <label className="block text-sm text-beige-dark mb-2">Titlu meta</label>
          <input readOnly className={inputReadonly} value={seoConfig.title} />
        </div>
        <div>
          <label className="block text-sm text-beige-dark mb-2">Descriere meta</label>
          <textarea readOnly rows={4} className={textareaReadonly} value={seoConfig.description} />
        </div>
        <div>
          <label className="block text-sm text-beige-dark mb-2">Cuvinte cheie</label>
          <input
            readOnly
            className={inputReadonly}
            value={seoConfig.keywords.join(', ')}
          />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.4 }}
        className="glass-card rounded-xl p-6 md:p-8 space-y-6"
      >
        <h2 className="font-heading text-xl text-gold">Temă</h2>
        <div>
          <label className="block text-sm text-beige-dark mb-3">Culoare accent principală</label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              defaultValue="#C9A84C"
              disabled
              className="h-12 w-20 rounded-xl border border-dark-border bg-dark-surface cursor-not-allowed opacity-70"
            />
            <span className="text-sm text-beige-dark">Selector vizual — activ după integrare</span>
          </div>
        </div>
        <div>
          <label htmlFor="dark-intensity" className="block text-sm text-beige-dark mb-3">
            Intensitate mod întunecat
          </label>
          <input
            id="dark-intensity"
            type="range"
            min={0}
            max={100}
            defaultValue={85}
            disabled
            className="w-full max-w-md accent-gold opacity-60 cursor-not-allowed"
          />
          <p className="text-xs text-beige-dark mt-2">Glisor demonstrativ — fără efect până la backend.</p>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.35 }}
        className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2"
      >
        <button
          type="button"
          disabled
          className="px-8 py-3.5 rounded-xl bg-gold text-dark font-medium opacity-50 cursor-not-allowed"
        >
          Salvează modificările
        </button>
        <p className="text-sm text-beige-dark">
          Setările vor fi salvate după conectarea la baza de date.
        </p>
      </motion.div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-sm text-beige-dark mb-2">{label}</label>
      <input readOnly className={inputReadonly} value={value} />
    </div>
  )
}
