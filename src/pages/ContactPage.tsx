import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="pt-16">
      <section className="relative py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-30" 
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/6740756/pexels-photo-6740756.jpeg?auto=compress&cs=tinysrgb&w=1600')",
            filter: "brightness(0.6)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-neutral-950 z-0"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-neutral-300 mb-8">
              Have questions about our custom boxing gloves? Our team is here to help.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-neutral-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-neutral-800 rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                {submitSuccess ? (
                  <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mb-6">
                    <p className="text-green-400 font-medium">
                      Your message has been sent successfully! We'll get back to you soon.
                    </p>
                  </div>
                ) : null}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-neutral-700 rounded-lg border border-neutral-600 p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-neutral-700 rounded-lg border border-neutral-600 p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-neutral-700 rounded-lg border border-neutral-600 p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Order Inquiry</option>
                      <option value="custom">Custom Design Question</option>
                      <option value="shipping">Shipping Information</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full bg-neutral-700 rounded-lg border border-neutral-600 p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn btn-primary inline-flex items-center gap-2 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
            
            <div>
              <div className="bg-neutral-800 rounded-xl p-6 md:p-8 h-full">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-neutral-700 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Our Location</h3>
                      <address className="text-neutral-400 not-italic">
                        123 Boxing Lane<br />
                        Fightville, CA 90210<br />
                        United States
                      </address>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-neutral-700 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone Number</h3>
                      <p className="text-neutral-400">
                        <a href="tel:+18005559876" className="hover:text-red-500 transition-colors">
                          +1 (800) 555-9876
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-neutral-700 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Address</h3>
                      <p className="text-neutral-400">
                        <a href="mailto:info@knockoutgloves.com" className="hover:text-red-500 transition-colors">
                          info@knockoutgloves.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="font-semibold mb-3">Business Hours</h3>
                  <ul className="space-y-2 text-neutral-400">
                    <li className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday:</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-neutral-950">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-neutral-400 max-w-3xl mx-auto">
              Find quick answers to common questions about our custom boxing gloves.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-neutral-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">How long does it take to receive my custom gloves?</h3>
              <p className="text-neutral-400">
                Custom gloves typically take 2-3 weeks to manufacture and ship. Rush orders may be available for an additional fee.
              </p>
            </div>
            
            <div className="bg-neutral-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">What if I'm not satisfied with my custom gloves?</h3>
              <p className="text-neutral-400">
                We offer a 30-day satisfaction guarantee. If you're not happy with your purchase, contact us to arrange a return or replacement.
              </p>
            </div>
            
            <div className="bg-neutral-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Can I change my order after it's been placed?</h3>
              <p className="text-neutral-400">
                Changes can be made within 24 hours of placing your order. After that, production begins and changes cannot be accommodated.
              </p>
            </div>
            
            <div className="bg-neutral-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Do you ship internationally?</h3>
              <p className="text-neutral-400">
                Yes, we ship worldwide. International shipping rates and delivery times vary by country. Customs fees may apply.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;