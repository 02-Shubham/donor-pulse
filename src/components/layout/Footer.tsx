
import { Link } from "react-router-dom";
import { Heart, DropletIcon, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200/50 pt-12 pb-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and description */}
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-3">
            <DropletIcon className="h-7 w-7" />
            <span>LifeLink</span>
          </Link>
          <p className="text-gray-600 text-sm mt-4 mb-6">
            Connecting blood donors with recipients in need, saving lives one donation at a time.
          </p>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </button>
            <button className="text-gray-600 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </button>
            <button className="text-gray-600 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-1">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-600 hover:text-primary text-sm transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-gray-600 hover:text-primary text-sm transition-colors">
                Register as Donor
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-gray-600 hover:text-primary text-sm transition-colors">
                Login
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-gray-600 hover:text-primary text-sm transition-colors">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="md:col-span-1">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
            Resources
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-600 hover:text-primary text-sm transition-colors">
                Blood Donation FAQ
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-primary text-sm transition-colors">
                Blood Types Guide
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-primary text-sm transition-colors">
                Eligibility Requirements
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-primary text-sm transition-colors">
                Donation Process
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-1">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
            Contact Us
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <span className="text-gray-600 text-sm">contact@lifelink.com</span>
            </li>
            <li className="flex items-start space-x-3">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <span className="text-gray-600 text-sm">+1 (800) LIFE-LINK</span>
            </li>
            <li className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <span className="text-gray-600 text-sm">
                123 Health Avenue, <br />
                Medical District, CA 90001
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-xs">
          © {new Date().getFullYear()} LifeLink. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-gray-500 hover:text-gray-700 text-xs">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700 text-xs">
            Terms of Service
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700 text-xs">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
