import React from 'react';
import { Users, Info, Rocket, Github, Linkedin, Mail } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const AboutUs = () => {
  const teamMembers = [
    { name: 'Varad Pandit', role: 'Team Member' },
    { name: 'Amar Kale', role: 'Team Member' },
    { name: 'Shivam Shelke', role: 'Team Member' },
    { name: 'Jayraj Pawar', role: 'Team Member' },
    { name: 'Prachi Gaikwad', role: 'Team Member' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
          <Info className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            About Us
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Meet the team behind Smart Investment Planner
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Team 404 BNF
                </h2>
                <p className="text-blue-500 font-medium">Innovating the future of finance</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-6">
              Welcome to the Smart Investment Planner! We are a passionate team of developers 
              dedicated to creating tools that make investment planning intelligent, easy to understand, 
              and highly effective. Our mission is to empower individuals to make informed financial decisions.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-black/20 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                <Users className="w-5 h-5 text-purple-500" />
                <span className="font-medium">5 Core Members</span>
              </div>
            </div>
          </GlassCard>

          {/* Team Members Grid */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-500" /> 
              Our Team Members
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member, idx) => (
                <GlassCard key={idx} className="p-5 flex flex-col items-center text-center transform transition duration-300 hover:scale-[1.02] hover:shadow-xl group">
                  <div className="w-20 h-20 mb-4 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-full flex items-center justify-center border-2 border-indigo-500 border-dashed group-hover:border-solid transition-all">
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                    {member.name}
                  </h4>
                  <p className="text-sm text-indigo-500 font-medium mb-4">{member.role}</p>
                  <div className="flex items-center justify-center gap-3">
                    <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                    <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 border-none sm:sticky sm:top-24">
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <p className="text-indigo-100 mb-6 text-sm">
              We'd love to hear from you! If you have any feedback or want to collaborate, drop us a message.
            </p>
            <div className="space-y-4">
              <a href="mailto:contact@team404bnf.com" className="flex items-center gap-3 text-white bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                <Mail className="w-5 h-5" />
                <span className="font-medium">Get in Touch</span>
              </a>
              <div className="pt-4 border-t border-white/20">
                <p className="text-indigo-200 text-xs text-center">
                  Designed & Developed by <br/><strong className="text-white text-sm">Team 404 BNF</strong>
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
