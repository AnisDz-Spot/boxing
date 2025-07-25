import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Users2, Clock, Target, TrendingUp } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-30" 
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/4761792/pexels-photo-4761792.jpeg?auto=compress&cs=tinysrgb&w=1600')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-neutral-950 z-0"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-neutral-300 mb-8">
              Founded by fighters, for fighters. We're dedicated to creating the highest quality custom boxing gloves that perform as good as they look.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-neutral-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-neutral-300 mb-4">
                At Knockout Custom Gloves, we believe that what you wear in the ring should be as unique as your fighting style. Our mission is to empower fighters with premium quality, customizable gear that enhances performance while expressing individuality.
              </p>
              <p className="text-neutral-300">
                We combine cutting-edge technology with traditional craftsmanship to create boxing gloves that stand up to the most demanding training and competition scenarios while looking absolutely stunning.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-neutral-800 p-6 rounded-xl"
              >
                <Target className="h-8 w-8 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Precision</h3>
                <p className="text-sm text-neutral-400">Every glove built with meticulous attention to detail.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-neutral-800 p-6 rounded-xl"
              >
                <Shield className="h-8 w-8 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Protection</h3>
                <p className="text-sm text-neutral-400">Engineered to safely absorb impact while maximizing power.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-neutral-800 p-6 rounded-xl"
              >
                <TrendingUp className="h-8 w-8 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Performance</h3>
                <p className="text-sm text-neutral-400">Designed with fighter feedback to enhance capabilities.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-neutral-800 p-6 rounded-xl"
              >
                <Users2 className="h-8 w-8 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Community</h3>
                <p className="text-sm text-neutral-400">Supporting fighters at every level of the sport.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-16 bg-neutral-950">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Craftsmanship</h2>
            <p className="text-neutral-400 max-w-3xl mx-auto">
              Each pair of Knockout gloves is meticulously crafted by skilled artisans with decades of experience in combat sports equipment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-900 rounded-xl overflow-hidden">
              <div className="h-48 bg-neutral-800"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Material Selection</h3>
                <p className="text-neutral-400">
                  We source only the finest materials, from premium genuine leather to advanced synthetic blends, ensuring durability and comfort.
                </p>
              </div>
            </div>

            <div className="bg-neutral-900 rounded-xl overflow-hidden">
              <div className="h-48 bg-neutral-800"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Construction</h3>
                <p className="text-neutral-400">
                  Multi-layered padding systems are engineered to provide optimal protection while maintaining perfect weight balance.
                </p>
              </div>
            </div>

            <div className="bg-neutral-900 rounded-xl overflow-hidden">
              <div className="h-48 bg-neutral-800"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Quality Testing</h3>
                <p className="text-neutral-400">
                  Every pair undergoes rigorous testing by professional fighters to ensure they meet our exacting standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-neutral-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-neutral-400 max-w-3xl mx-auto">
              Founded by fighters and innovators with a passion for the sport and a vision for better equipment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-800 rounded-xl p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-neutral-700 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-1">Alex Rodriguez</h3>
              <p className="text-red-500 mb-3">Founder & CEO</p>
              <p className="text-neutral-400 text-sm">
                Former pro boxer with 15 years of experience and a mission to revolutionize boxing equipment.
              </p>
            </div>

            <div className="bg-neutral-800 rounded-xl p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-neutral-700 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-1">Sarah Chen</h3>
              <p className="text-red-500 mb-3">Head of Design</p>
              <p className="text-neutral-400 text-sm">
                Industrial designer with expertise in performance equipment and a focus on ergonomics.
              </p>
            </div>

            <div className="bg-neutral-800 rounded-xl p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-neutral-700 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-1">Marcus Johnson</h3>
              <p className="text-red-500 mb-3">Production Manager</p>
              <p className="text-neutral-400 text-sm">
                With 20+ years in manufacturing sports equipment, Marcus ensures every glove meets our high standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-neutral-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-neutral-800 p-6 rounded-xl"
                >
                  <Award className="h-8 w-8 text-red-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Excellence</h3>
                  <p className="text-sm text-neutral-400">We never compromise on quality or performance.</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-neutral-800 p-6 rounded-xl"
                >
                  <Users2 className="h-8 w-8 text-red-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Community</h3>
                  <p className="text-sm text-neutral-400">Supporting athletes and gyms at all levels.</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-neutral-800 p-6 rounded-xl"
                >
                  <Clock className="h-8 w-8 text-red-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Durability</h3>
                  <p className="text-sm text-neutral-400">Built to withstand the demands of serious training.</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-neutral-800 p-6 rounded-xl"
                >
                  <Shield className="h-8 w-8 text-red-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Safety</h3>
                  <p className="text-sm text-neutral-400">Prioritizing protection in every design decision.</p>
                </motion.div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">Our Values</h2>
              <p className="text-neutral-300 mb-4">
                At Knockout, we're guided by a set of core values that inform everything we do. From product design to customer service, these principles ensure we deliver the best possible experience to fighters at every level.
              </p>
              <p className="text-neutral-300">
                We believe in creating equipment that doesn't just look good but performs exceptionally and lasts through countless training sessions. Our commitment to excellence extends beyond our products to the community we serve.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;