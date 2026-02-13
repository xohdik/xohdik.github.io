import React from 'react'
import { motion } from 'framer-motion'
import Publications from '../components/Publications'

const pt = { initial:{opacity:0,y:30}, animate:{opacity:1,y:0,transition:{duration:0.6,ease:[0.22,1,0.36,1]}}, exit:{opacity:0,y:-20,transition:{duration:0.3}} }

export default function PublicationsPage() {
  return (
    <motion.div {...pt} className="page-wrapper">
      <Publications />
    </motion.div>
  )
}
