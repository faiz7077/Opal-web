import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'
import VideoShowcase from './_components/video-showcase'
import { FeatureSection } from './_components/feature-section'
import PricingSection from './_components/pricing-section'
import LandingPageNavBar from './_components/navbar'

import LampDemo from '@/components/ui/lamp'
import { Cover } from '@/components/ui/cover'


export default function Home() {
  // Define the products array
  const products = [
    { title: 'Product 1', link: '/product-1', thumbnail: '/images/product-1.jpg' },
    { title: 'Product 2', link: '/product-2', thumbnail: '/images/product-2.jpg' },
    // Add more products as needed
  ];

  return (
    <div className="min-h-screen  dark:bg-neutral-950 text-white">
      <div><LandingPageNavBar /></div>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <Cover>
              <h1 className="text-5xl">
              Record, Share, Collaborate
              </h1>
            </Cover>
          <p className="text-xl mb-8">
            
            Opal is your all-in-one solution for video recording and sharing, designed for seamless collaboration.
          </p>
          <Button size="lg" className="mr-4">
            Start for Free
            <ArrowRight className="ml-2" />
          </Button>
          <Button size="lg" variant="outline">
            Watch Demo
          </Button>
        </section>

        <VideoShowcase />
        {/* <div><HeroParallax products={products} /></div> */}
        
        <section className="container mx-auto px-4 py-20  dark:bg-neutral-950">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <LampDemo/> 
            Why Choose Opal?
            </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              'Web & Desktop Recording',
              'Workspace Collaboration',
              'Folder Organization',
              'Secure Video Sharing',
              'View Notifications',
              'AI-Powered Features',
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        <FeatureSection />

        <PricingSection/>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-gray-400">
        <p>&copy; 2024 Opal. All rights reserved.</p>
      </footer>
    </div>
  )
}