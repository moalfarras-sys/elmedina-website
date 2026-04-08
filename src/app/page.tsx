import { Hero } from '@/components/home/Hero'
import { IntroSection } from '@/components/home/IntroSection'
import { FeaturedCategories } from '@/components/home/FeaturedCategories'
import { RecommendedDishes } from '@/components/home/RecommendedDishes'
import { ShishaSection } from '@/components/home/ShishaSection'
import { MenuPreview } from '@/components/home/MenuPreview'
import { GalleryPreview } from '@/components/home/GalleryPreview'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { LocationPreview } from '@/components/home/LocationPreview'

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <FeaturedCategories />
      <RecommendedDishes />
      <ShishaSection />
      <MenuPreview />
      <GalleryPreview />
      <TestimonialsSection />
      <LocationPreview />
    </>
  )
}
