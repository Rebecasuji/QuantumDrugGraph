import { Link } from "wouter";
import { Twitter, Github, Linkedin } from "lucide-react";

const footerLinks = [
  { name: "About", href: "/about" },
  { name: "Documentation", href: "#" },
  { name: "API", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Privacy", href: "#" },
  { name: "Terms", href: "#" },
  { name: "Contact", href: "#" },
];

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          {footerLinks.map((link) => (
            <div key={link.name} className="px-5 py-2">
              <Link href={link.href}>
                <a className="text-base text-gray-500 hover:text-gray-900">
                  {link.name}
                </a>
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          {socialLinks.map((social) => (
            <a key={social.name} href={social.href} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">{social.name}</span>
              <social.icon className="h-6 w-6" />
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2023 QDrug AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
