import Link from "next/link";
import { Linkedin, Twitter, Facebook, Mail, Phone } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Políticas</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Política de Privacidad</a></li>
              <li><a href="#" className="hover:underline">Términos de Servicio</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400"><Linkedin /></a>
              <a href="#" className="hover:text-blue-400"><Twitter /></a>
              <a href="#" className="hover:text-blue-400"><Facebook /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center"><Mail className="mr-2" /> contacto@crucedeinventario.com</li>
              <li className="flex items-center"><Phone className="mr-2" /> +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 Cruce de Inventario. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export default Footer;
