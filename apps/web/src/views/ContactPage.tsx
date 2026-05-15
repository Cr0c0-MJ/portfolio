'use client';
import { motion } from 'motion/react';
import { Mail, Video, Phone, MapPin, Download } from 'lucide-react';

export function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      label: 'By Email',
      value: 'croco@example.com',
      action: 'Send Email',
      link: 'mailto:croco@example.com',
      color: 'text-amber-500',
    },
    {
      icon: Video,
      label: 'Virtual Meeting',
      value: 'Google Meet',
      action: 'Schedule a Call',
      link: '#',
      color: 'text-amber-500',
    },
    {
      icon: Phone,
      label: 'By Phone or WhatsApp',
      value: '(+82) 10 1234 5678',
      action: 'Send Message',
      link: 'tel:+821012345678',
      color: 'text-amber-500',
    },
    {
      icon: MapPin,
      label: 'Physical Meeting',
      value: 'Seoul, South Korea',
      action: 'View on Map',
      link: '#',
      color: 'text-amber-500',
    },
  ];

  return (
    <div className="relative z-10 px-8 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-emerald-400 mb-4">Contact</h1>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <span>HOME</span>
            <span>/</span>
            <span className="text-emerald-400">CONTACT</span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-300 mb-16 max-w-3xl mx-auto"
        >
          Have a question or want to discuss something? I&apos;d love to hear from you and see how I can
          help. Whether it&apos;s about a project, collaboration, or just a friendly chat.
        </motion.p>

        {/* How To Connect Section */}
        <div className="relative">
          {/* Download Contact Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute right-0 top-0 flex flex-col items-end gap-2"
          >
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span>Download Contact</span>
            </button>
            <button className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              View as JSON
            </button>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-white mb-2">How To Connect</h2>
            <p className="text-gray-400 text-sm">Let&apos;s start a conversation one day.</p>
          </motion.div>

          {/* Contact Methods Grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.label}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="group relative bg-[#1a1f2e] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left side - Icon and Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`${method.color} mt-1`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-400 text-sm mb-1">{method.label}</p>
                        <p className="text-white mb-0">{method.value}</p>
                      </div>
                    </div>

                    {/* Right side - Action Button */}
                    <a
                      href={method.link}
                      className="px-4 py-2 bg-white/5 hover:bg-emerald-500/10 text-gray-300 hover:text-emerald-400 rounded-lg transition-all duration-300 border border-white/10 hover:border-emerald-500/50 whitespace-nowrap text-sm"
                    >
                      {method.action}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-sm">
            Usually respond within 24 hours. Looking forward to connecting with you!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
