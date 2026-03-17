import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaHeart, FaCode, FaWhatsapp } from 'react-icons/fa';
import { navLinks, socialLinks, personalInfo } from '../../data';

const iconComponents: { [key: string]: React.ComponentType<{ className?: string }> } = {
  FaGithub,
  FaLinkedin,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-500 text-white">
      {/* Wave SVG */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="#212121"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center shadow-glow-red">
                <FaCode className="text-white text-2xl" />
              </div>
              <span className="font-heading font-bold text-2xl">
                Ilyas
                <span className="text-primary-500">.</span>
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-light-400 max-w-md mb-6"
            >
              {personalInfo.bio.substring(0, 150)}...
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex gap-4"
            >
              {socialLinks.map((link) => {
                const IconComponent = iconComponents[link.icon];
                return (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-dark-300 flex items-center justify-center text-light-400 hover:bg-primary-500 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {IconComponent && <IconComponent className="text-lg" />}
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading font-bold text-lg mb-4"
            >
              Quick Links
            </motion.h3>
            <ul className="space-y-2">
              {navLinks.slice(0, 5).map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-light-400 hover:text-primary-500 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-primary-500 rounded-full" />
                    {link.title}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading font-bold text-lg mb-4"
            >
              Contact
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              <p className="text-light-400">
                <span className="text-primary-500">Email:</span>
                <br />
                {personalInfo.email}
              </p>
              {personalInfo.phone && (
                <a
                  href="https://wa.me/918080611513"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-light-400 hover:text-green-400 transition-colors"
                >
                  <FaWhatsapp className="text-green-500 text-lg" />
                  <span>{personalInfo.phone}</span>
                </a>
              )}
              {personalInfo.location && (
                <p className="text-light-400">
                  <span className="text-primary-500">Location:</span>
                  <br />
                  {personalInfo.location}
                </p>
              )}
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-dark-300 text-center"
        >
          <p className="text-light-400 flex items-center justify-center gap-2 flex-wrap">
            © {currentYear} {personalInfo.name}. Built with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <FaHeart className="text-primary-500" />
            </motion.span>
            and passion for great code
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
