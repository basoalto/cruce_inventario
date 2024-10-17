import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image"; // Import the Image component
import { motion } from "framer-motion";


import { AlertTriangle, Database, FileSearch } from 'lucide-react'


import { Brain, ClipboardCheck, BarChart2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

import { Check } from 'lucide-react'


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import Hero from '../../components/Hero'
import ProblemDescription from '../../components/ProblemDescription'
import SolutionPresentation from '../../components/SolutionPresentation'
import MainBenefits from '../../components/MainBenefits'
import ClientLogos from '../../components/ClientLogos'
import {FAQ} from '../../components/FAQ'
import SecondaryCTA from '../../components/SecondaryCTA'


export default function HomeComponent() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ProblemDescription />
      <SolutionPresentation />
      <MainBenefits />
      <ClientLogos />
      <FAQ/>
      <SecondaryCTA />
      {/* <Footer /> */}
    </div>
  )
}
