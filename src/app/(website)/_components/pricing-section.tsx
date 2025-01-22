'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

const plans = [
  {
    name: 'Free',
    price: { monthly: 0},
    features: [
      { name: 'Single workspace', included: true },
      { name: '720p video quality', included: true },
      { name: 'Basic video sharing', included: true },
      { name: 'AI-powered transcripts', included: false },
      { name: 'Automatic video title generation', included: false },
      {name: 'Invite user in workspace', included: false},
    ],
  },
  {
    name: 'Pro',
    price: { monthly: 99 },
    features: [
      { name: 'Unlimited workspaces', included: true },
      { name: '1080p video quality', included: true },
      { name: 'Advanced sharing options', included: true },
      { name: 'AI-powered transcripts', included: true },
      { name: 'Automatic video title generation', included: true },
      {name: 'Invite user in workspace', included: true}
    ],
  },
]

export default function PricingSection() {

  return (
    <section className="py-20 bg-gray-900" id="pricing">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Choose Your Plan</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className="bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.name === 'Pro' && (
                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
              )}
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold">
                  {plan.price.monthly}
                </span>
                <span className="text-gray-400 ml-2">
                  /month
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + featureIndex * 0.05 }}
                  >
                    {feature.included ? (
                      <Check className="text-green-500 mr-2 flex-shrink-0" />
                    ) : (
                      <X className="text-red-500 mr-2 flex-shrink-0" />
                    )}
                    <span className={feature.included ? 'text-gray-200' : 'text-gray-400'}>
                      {feature.name}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <Button className="w-full" variant={plan.name === 'Pro' ? 'default' : 'outline'}>
                {plan.name === 'Free' ? 'Get Started' : 'Upgrade to Pro'}
              </Button>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-gray-400 mt-8">
          All plans come with a 14-day money-back guarantee. No questions asked.
        </p>
      </div>
    </section>
  )
}