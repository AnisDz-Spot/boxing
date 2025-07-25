import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/4754144/pexels-photo-4754144.jpeg')",
            filter: "contrast(1.2) brightness(0.8)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-0" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Design Your <span className="text-gold">Perfect</span> Boxing Gloves
            </h1>
            <p className="text-xl mb-8 text-neutral-300">
              Create custom boxing gloves tailored to your style and performance needs with our interactive 3D customizer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/customize" 
                className="btn btn-primary inline-flex items-center gap-2"
              >
                Start Designing <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/about" className="btn btn-outline">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-navy section-with-ropes">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Create Your Dream Boxing Gloves</h2>
            <p className="text-neutral-400 max-w-3xl mx-auto">
              Our 3D customization tool lets you personalize every detail, ensuring your gloves are as unique as your fighting style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-charcoal/50 rounded-xl p-8 flex flex-col items-center text-center backdrop-blur-sm"
            >
              <div className="bg-gold/20 p-4 rounded-full mb-6">
                <RefreshCw className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time 3D Preview</h3>
              <p className="text-neutral-400">
                Watch your design come to life with our interactive 3D model that updates in real-time.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-charcoal/50 rounded-xl p-8 flex flex-col items-center text-center backdrop-blur-sm"
            >
              <div className="bg-gold/20 p-4 rounded-full mb-6">
                <Award className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Materials</h3>
              <p className="text-neutral-400">
                Choose from premium leather, synthetic options, or our advanced performance materials.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-charcoal/50 rounded-xl p-8 flex flex-col items-center text-center backdrop-blur-sm"
            >
              <div className="bg-gold/20 p-4 rounded-full mb-6">
                <ShieldCheck className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Quality</h3>
              <p className="text-neutral-400">
                Every custom glove undergoes rigorous testing to ensure professional-grade performance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-neutral-950">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-neutral-400 max-w-3xl mx-auto">
              Creating your perfect boxing gloves is easy with our simple three-step process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-neutral-800 rounded-xl p-8 h-full">
                <div className="absolute -top-4 -left-4 bg-gold rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold text-navy">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3 mt-4">Design Your Gloves</h3>
                <p className="text-neutral-400">
                  Choose colors, materials, patterns and add custom text to create your unique design.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-neutral-800 rounded-xl p-8 h-full">
                <div className="absolute -top-4 -left-4 bg-gold rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold text-navy">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3 mt-4">Review In 3D</h3>
                <p className="text-neutral-400">
                  Examine your creation from every angle with our interactive 3D preview.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-neutral-800 rounded-xl p-8 h-full">
                <div className="absolute -top-4 -left-4 bg-gold rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold text-navy">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3 mt-4">Confirm & Order</h3>
                <p className="text-neutral-400">
                  Place your order and our artisans will handcraft your custom gloves to specification.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link 
              to="/customize" 
              className="btn btn-primary inline-flex items-center gap-2"
            >
              Start Designing Now <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-navy">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-neutral-400 max-w-3xl mx-auto">
              Hear from fighters who have already experienced our custom gloves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-charcoal/50 rounded-xl p-8 backdrop-blur-sm"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center font-bold text-xl text-navy mr-4">
                  JM
                </div>
                <div>
                  <h4 className="font-semibold">James Miller</h4>
                  <p className="text-neutral-400 text-sm">Professional Boxer</p>
                </div>
              </div>
              <p className="text-neutral-300">
                "These custom gloves have completely elevated my training. The fit is perfect, and I love how they match my personal style."
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-charcoal/50 rounded-xl p-8 backdrop-blur-sm"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center font-bold text-xl text-navy mr-4">
                  SR
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Rodriguez</h4>
                  <p className="text-neutral-400 text-sm">MMA Fighter</p>
                </div>
              </div>
              <p className="text-neutral-300">
                "The 3D customizer was so easy to use, and what I saw is exactly what I got. The quality exceeds even my high expectations."
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-charcoal/50 rounded-xl p-8 backdrop-blur-sm"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center font-bold text-xl text-navy mr-4">
                  DT
                </div>
                <div>
                  <h4 className="font-semibold">David Thompson</h4>
                  <p className="text-neutral-400 text-sm">Boxing Coach</p>
                </div>
              </div>
              <p className="text-neutral-300">
                "I ordered custom gloves for my entire team. The customization options let us show our gym's identity, and the durability is outstanding."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-tr from-navy to-charcoal">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Design Your Perfect Gloves?</h2>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Express your style and elevate your performance with custom boxing gloves designed by you.
          </p>
          <Link 
            to="/customize" 
            className="btn btn-primary inline-flex items-center gap-2 text-lg px-8 py-3"
          >
            Start Creating <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;