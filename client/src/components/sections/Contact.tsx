import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaPaperPlane, FaCheck, FaSpinner } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../../data';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const iconComponents: { [key: string]: React.ComponentType<{ className?: string }> } = {
  FaGithub, FaLinkedin,
};

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const result = await response.json();
        setErrorMsg(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMsg('Unable to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: 'primary',
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      value: personalInfo.phone,
      href: 'https://wa.me/918080611513',
      color: 'secondary',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: personalInfo.location,
      href: '#',
      color: 'accent',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-32 bg-light-200 relative"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500/5 rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="block w-fit mx-auto px-4 py-2 bg-primary-500/10 text-primary-500 rounded-full font-medium text-sm mb-4">
            Send a Message
          </span>
          <h2 className="section-title">
            Let's Connect
          </h2>
          <p className="text-dark-100 mt-6 max-w-2xl mx-auto">
            Have a project in mind or looking for a technical partner?
            Drop me a message and let's build something great together!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card">
              <h3 className="text-2xl font-heading font-bold text-dark-500 mb-6">
                Get in Touch
              </h3>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-card transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      info.color === 'primary' ? 'bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-white' :
                      info.color === 'secondary' ? 'bg-secondary-500/10 text-secondary-600 group-hover:bg-secondary-500 group-hover:text-dark-500' :
                      'bg-accent-500/10 text-accent-500 group-hover:bg-accent-500 group-hover:text-white'
                    }`}>
                      <info.icon className="text-xl" />
                    </div>
                    <div>
                      <div className="text-sm text-dark-100">{info.label}</div>
                      <div className="font-medium text-dark-500">{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h4 className="font-heading font-bold text-dark-500 mb-4">
                  Follow Me
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((link) => {
                    const IconComponent = iconComponents[link.icon];
                    return (
                      <motion.a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {IconComponent && <IconComponent className="text-xl" />}
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Availability Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card text-center border-2 border-primary-500/20"
            >
              <div className="font-heading font-bold text-2xl text-primary-500 mb-2">Available for Hire</div>
              <div className="font-heading font-medium text-lg text-dark-500">
                Ready to join your team and deliver results
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="glass-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-dark-500 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="John Doe"
                    className={`input-field ${errors.name ? 'border-primary-500' : ''}`}
                  />
                  {errors.name && (
                    <p className="text-primary-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-dark-500 font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="john@example.com"
                    className={`input-field ${errors.email ? 'border-primary-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-primary-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="mt-6">
                <label className="block text-dark-500 font-medium mb-2">
                  Subject
                </label>
                <input
                  {...register('subject')}
                  type="text"
                  placeholder="Project Collaboration"
                  className={`input-field ${errors.subject ? 'border-primary-500' : ''}`}
                />
                {errors.subject && (
                  <p className="text-primary-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              {/* Message */}
              <div className="mt-6">
                <label className="block text-dark-500 font-medium mb-2">
                  Message
                </label>
                <textarea
                  {...register('message')}
                  rows={5}
                  placeholder="Tell me about your project..."
                  className={`input-field resize-none ${errors.message ? 'border-primary-500' : ''}`}
                />
                {errors.message && (
                  <p className="text-primary-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Error Message */}
              {errorMsg && (
                <p className="mt-4 text-primary-500 text-sm text-center">{errorMsg}</p>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`mt-8 w-full btn-primary flex items-center justify-center gap-2 ${
                  isSubmitted ? 'bg-green-500 hover:bg-green-500' : ''
                }`}
                whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <FaCheck />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
