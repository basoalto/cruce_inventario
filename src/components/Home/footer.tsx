import Link from "next/link";
import { Linkedin, Twitter, Facebook, Mail, Phone } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Políticas</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/politica-privacidad" className="hover:underline">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos-servicio" className="hover:underline">
                  Términos de Servicio
                </Link>
              </li>
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

export default Footer;
